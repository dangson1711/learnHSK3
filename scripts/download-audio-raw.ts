import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { VOCABULARY_DATA, HSK_1_WORDS_LIST, HSK_2_WORDS_LIST, HSK_3_WORDS_LIST, TOPICS_DATA, get1000HskWords, getVocabularyDetail } from '../src/data/vocabulary.js';
import { RADICALS_DATA } from '../src/data/radicals.js';

// Get current directory in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_AUDIO_DIR = path.join(__dirname, '..', 'public', 'audio');

// Mapping of abstract/rare stroke-only radicals to common homophones
const RADICAL_PRONUNCIATION_MAP: Record<string, string> = {
  "彳": "赤", // chì
  "辶": "绰", // chuò
  "疒": "讷", // nè
  "艹": "草", // cǎo
  "阝": "阜", // fù
  "宀": "棉", // mián
  "犭": "犬", // quǎn
  "纟": "丝", // sī
  "囗": "围", // wéi
  "饣": "食", // shí
  "忄": "心", // xīn
  "氵": "水", // shuǐ
  "灬": "火", // huǒ
  "攵": "攴", // pū
  "亻": "人", // rén
};

// Làm sạch text để API đọc được
function cleanTextForTTS(text: string): string {
  if (!text) return '';
  const base = text.split('(')[0].split('（')[0].split('/')[0].trim();
  return RADICAL_PRONUNCIATION_MAP[base] || base;
}

// Lọc ký tự cấm để làm tên file an toàn
function sanitizeFilename(text: string): string {
  return text.replace(/[\\/:*?"<>|.,!?;'，。！？；：\s\-"'“”‘’`…~@#$%^&*()_+={}[\]|;:]/g, '').trim();
}

/**
 * Download a file from Google Translate TTS as primary (high fidelity, complete tones)
 * and Youdao as secondary backup.
 */
async function downloadFile(originalText: string, destPath: string): Promise<boolean> {
  const queryText = cleanTextForTTS(originalText);
  if (!queryText) return false;

  // Primary: Google Translate TTS (superior trailing decay, natural third tone dip and rise)
  const googleUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(queryText)}&tl=zh-cn&client=tw-ob`;
  
  try {
    const response = await fetch(googleUrl);
    if (!response.ok) {
      throw new Error(`Google HTTP ${response.status}`);
    }
    const buffer = await response.arrayBuffer();
    if (buffer.byteLength === 0) {
      throw new Error('Empty Google audio buffer');
    }
    fs.writeFileSync(destPath, Buffer.from(buffer));
    return true;
  } catch (error: any) {
    // Backup Fallback: Youdao
    const youdaoUrl = `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(queryText)}&le=zh`;
    try {
      const yResponse = await fetch(youdaoUrl);
      if (!yResponse.ok) {
        throw new Error(`Youdao HTTP ${yResponse.status}`);
      }
      const buffer = await yResponse.arrayBuffer();
      if (buffer.byteLength === 0) {
        throw new Error('Empty Youdao audio buffer');
      }
      fs.writeFileSync(destPath, Buffer.from(buffer));
      return true;
    } catch (gErr: any) {
      console.error(`  [LỖI] Không thể tải: "${originalText}" (truy vấn "${queryText}"):`, gErr.message);
      return false;
    }
  }
}

/**
 * Non-blocking concurrent execution queue control
 */
async function runWithPool<T>(list: T[], limit: number, worker: (item: T, idx: number) => Promise<any>) {
  let index = 0;
  const promises: Promise<any>[] = [];

  const executeNext = async (): Promise<any> => {
    if (index >= list.length) return;
    const currentIdx = index++;
    const item = list[currentIdx];
    await worker(item, currentIdx);
    return executeNext();
  };

  for (let i = 0; i < Math.min(limit, list.length); i++) {
    promises.push(executeNext());
  }

  await Promise.all(promises);
}

async function main() {
  console.log('--- Đang khởi động tiến trình đồng bộ âm thanh chất lượng cao (Google TTS) ---');
  
  if (!fs.existsSync(PUBLIC_AUDIO_DIR)) {
    fs.mkdirSync(PUBLIC_AUDIO_DIR, { recursive: true });
  }

  const textsToDownload = new Set<string>();

  const addText = (text: string) => {
    if (!text) return;
    const trimmed = text.trim();
    textsToDownload.add(trimmed);
    const mapped = cleanTextForTTS(trimmed);
    if (mapped && mapped !== trimmed) {
      textsToDownload.add(mapped.trim());
    }
  };

  // Gom dữ liệu từ tất cả các danh mục
  VOCABULARY_DATA.forEach(v => {
    addText(v.word);
    addText(v.exampleSentence);
  });
  HSK_1_WORDS_LIST.forEach(v => addText(v.word));
  HSK_2_WORDS_LIST.forEach(v => addText(v.word));
  HSK_3_WORDS_LIST.forEach(v => addText(v.word));
  
  RADICALS_DATA.forEach(r => {
    addText(r.character);
    if (r.commonCharacters) {
      r.commonCharacters.forEach(cc => addText(cc.character));
    }
  });

  TOPICS_DATA.forEach(t => {
    try {
      get1000HskWords(t.hskLevel, t.order).forEach(w => {
        addText(w.word);
        const detail = getVocabularyDetail(w.word, t.id, t.hskLevel);
        if (detail && detail.exampleSentence) {
          addText(detail.exampleSentence);
        }
      });
    } catch (_) {}
  });

  const list = Array.from(textsToDownload).filter(Boolean);
  console.log(`Đã nạp ${list.length} khóa từ vựng độc lập.\n`);

  let successCount = 0;
  let skipCount = 0;
  let failCount = 0;

  // We want to force-replace any old small Youdao files to resolve the short tone cutoff behavior
  // Google Translate files are larger, typically > 3000 bytes. Let's overwrite files that are too small or replace all.
  // Overwriting files < 5000 bytes is a great filter because almost all new Google TTS files are >= 6000 bytes.
  // Set strictly to true to upgrade every file with Google's high-fidelity TTS (resolves cuts/clippings)
  const FORCE_REPLACE = false;

  await runWithPool(list, 10, async (text, i) => {
    const safeFilename = sanitizeFilename(text);
    if (!safeFilename) {
      failCount++;
      return;
    }

    const filePath = path.join(PUBLIC_AUDIO_DIR, `${safeFilename}.mp3`);

    if (!FORCE_REPLACE && fs.existsSync(filePath)) {
      const size = fs.statSync(filePath).size;
      // Google files are mostly >= 5000 bytes. If a file is smaller, it's highly likely an old truncated Youdao file.
      if (size >= 5000) {
        skipCount++;
        if (skipCount % 100 === 0) {
          console.log(`[ĐỒNG BỘ] Đã lướt qua ${skipCount} file có sẵn chất lượng cao...`);
        }
        return;
      } else {
        try {
          fs.unlinkSync(filePath);
        } catch (_) {}
      }
    }

    const ok = await downloadFile(text, filePath);
    if (ok) {
      successCount++;
      if (successCount % 20 === 0) {
        console.log(`[TẢI MỚI] Đã tải thành công ${successCount} file chất lượng cao... (Đang xử lý "${text}")`);
      }
    } else {
      failCount++;
    }
  });

  console.log(`\n=== KẾT QUẢ ĐỒNG BỘ HOÀN TẤT ===`);
  console.log(`- Tổng số target: ${list.length}`);
  console.log(`- Tải mới/Nâng cấp thành công: ${successCount}`);
  console.log(`- Đã có sẵn chất lượng cao (Bỏ qua): ${skipCount}`);
  console.log(`- Lỗi/Thất bại: ${failCount}`);
  console.log(`========================\n`);
}

main().catch(err => {
  console.error('Fatal crash:', err);
});
