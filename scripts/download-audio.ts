import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { VOCABULARY_DATA } from '../src/data/vocabulary.js';
import { RADICALS_DATA } from '../src/data/radicals.js';

// Get current directory in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_AUDIO_DIR = path.join(__dirname, '..', 'public', 'audio');

// Mapping of abstract/rare stroke-only radicals to common homophones
// Bộ từ điển Mapping Toàn diện: Chuyển đổi bộ thủ thành chữ Hán đồng âm 
// Giúp API Text-to-Speech (Youdao/Google) đọc chính xác 100% không bị sót file
const RADICAL_PRONUNCIATION_MAP: Record<string, string> = {
  // --- NHÓM 1: CÁC BỘ BIẾN THỂ TRONG ẢNH MỚI NHẤT (BẮT BUỘC MAP) ---
  "犭": "犬", // quǎn (Bộ Khuyển)
  "衤": "衣", // yī (Bộ Y - Quần áo)
  "纟": "丝", // sī (Bộ Mịch - Sợi tơ)
  "囗": "围", // wéi (Bộ Vi)
  "刂": "刀", // dāo (Bộ Đao đứng)

  // --- NHÓM 2: CÁC BỘ ĐỘC LẬP TRONG ẢNH (Bọc lót để hệ thống siêu cứng cáp) ---
  "马": "马", // mǎ (Bộ Mã)
  "鸟": "鸟", // niǎo (Bộ Điểu)
  "鱼": "鱼", // yú (Bộ Ngư)
  "虫": "虫", // chóng (Bộ Trùng)
  "牛": "牛", "牜": "牛", // niú (Bộ Ngưu)
  "贝": "贝", // bèi (Bộ Bối)
  "力": "力", // lì (Bộ Lực)
  "车": "车", // chē (Bộ Xa)
  "舟": "舟", // zhōu (Bộ Chu)
  "弓": "弓", // gōng (Bộ Cung)

  // --- NHÓM 3: CÁC BỘ BIẾN THỂ TỪ GIAO DIỆN CŨ CỦA BẠN ---
  "亻": "人", // rén (Bộ Nhân)
  "氵": "水", // shuǐ (Bộ Thủy)
  "灬": "火", // huǒ (Bộ Hỏa)
  "忄": "心", // xīn (Bộ Tâm)
  "讠": "言", // yán (Bộ Ngôn)
  "钅": "金", // jīn (Bộ Kim)
  "饣": "食", // shí (Bộ Thực)
  "冫": "冰", // bīng (Bộ Băng)
  "彳": "赤", // chì (Bộ Xích)
  "辶": "绰", // chuò (Bộ Sước)
  "疒": "讷", // nè (Bộ Nạch)
  "艹": "草", // cǎo (Bộ Thảo)
  "阝": "阜", // fù (Bộ Phụ)
  "宀": "棉", // mián (Bộ Miên)
  
  // --- NHÓM 4: CÁC BỘ PHỔ BIẾN KHÁC (Đề phòng data HSK 2, 3 có chứa) ---
  "扌": "手", // shǒu (Bộ Thủ)
  "⻊": "足", // zú (Bộ Túc)
  "冖": "密", // mì (Bộ Mịch)
  "攵": "攴", // pū (Bộ Phộc)
  "廴": "引", // yǐn (Bộ Dẫn)
  "彡": "衫", // shān (Bộ Sam)
  "彐": "计", // jì (Bộ Ký)
  "殳": "书", // shū (Bộ Thù)
};

// Clean text helper
function cleanTextForTTS(text: string): string {
  let clean = text.split('(')[0].split('（')[0].split('/')[0].trim();
  if (RADICAL_PRONUNCIATION_MAP[clean]) {
    clean = RADICAL_PRONUNCIATION_MAP[clean];
  }
  return clean;
}

// Lọc bỏ các ký tự đặc biệt khiến OS (Windows/Mac) từ chối lưu file
function sanitizeFilename(text: string): string {
  return text.replace(/[\\/:*?"<>|.,!?;'，。！？；：]/g, '').trim();
}

// Function to delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function downloadFile(text: string, destPath: string): Promise<boolean> {
  const clean = cleanTextForTTS(text);
  if (!clean) return false;

  const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(clean)}&tl=zh-cn&client=tw-ob`;
  
  const fakeHeaders = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'audio/mpeg, audio/mp3, audio/wav, audio/*;q=0.9',
    'Accept-Encoding': 'gzip, deflate, br'
  };

  try {
    const response = await fetch(url, { headers: fakeHeaders });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('audio')) {
      throw new Error(`Google chặn, trả về ${contentType}`);
    }

    const buffer = await response.arrayBuffer();
    if (buffer.byteLength < 3000) throw new Error("File tải về bị lỗi (Dung lượng quá nhỏ < 3KB).");

    fs.writeFileSync(destPath, Buffer.from(buffer));
    return true;
  } catch (error: any) {
    console.error(`  [LỖI] "${text}": ${error.message}`);
    return false;
  }
}

async function main() {
  console.log('--- Đang khởi động hệ thống tải Audio (Bản chống Block) ---');
  
  // Ensure target folder exists
  if (!fs.existsSync(PUBLIC_AUDIO_DIR)) {
    fs.mkdirSync(PUBLIC_AUDIO_DIR, { recursive: true });
    console.log(`Đã tạo thư mục: ${PUBLIC_AUDIO_DIR}`);
  }

  // Gather all unique texts we need to download
  const textsToDownload = new Set<string>();

  // 1. Static Vocabularies & Pronunciations
  VOCABULARY_DATA.forEach(v => {
    if (v.word) textsToDownload.add(v.word);
    if (v.exampleSentence) textsToDownload.add(v.exampleSentence);
  });

  // 2. Radicals & Common Characters
  RADICALS_DATA.forEach(r => {
    const cleanRad = r.character.split('/')[0].trim();
    if (cleanRad) textsToDownload.add(cleanRad);
    
    if (r.commonCharacters) {
      r.commonCharacters.forEach(cc => {
        if (cc.character) textsToDownload.add(cc.character);
      });
    }
  });

  console.log(`Quét được ${textsToDownload.size} từ vựng/câu cần xử lý.`);

  let successCount = 0;
  let skipCount = 0;
  let failCount = 0;

  const list = Array.from(textsToDownload);
  for (let i = 0; i < list.length; i++) {
    const text = list[i];
    
    // Sử dụng tên thuần chữ Hán thay vì Encode %E4... để hệ thống không bị loạn
    const safeName = sanitizeFilename(text);
    if (!safeName) continue;

    const filePath = path.join(PUBLIC_AUDIO_DIR, `${safeName}.mp3`);

   // CẢM BIẾN DUNG LƯỢNG: Kiểm tra file rác
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      // Chỉ bỏ qua nếu file nặng hơn 3000 byte
      if (stats.size > 3000) { 
        skipCount++;
        continue;
      } else {
        fs.unlinkSync(filePath); 
        console.log(`[!] Đã xóa file rác (dưới 3KB): ${safeName}.mp3`);
      }
    }

    process.stdout.write(`[${i + 1}/${list.length}] Đang tải "${text}"... `);
    const ok = await downloadFile(text, filePath);
    if (ok) {
      console.log('✅ Xong');
      successCount++;
    } else {
      console.log('❌ Bỏ qua');
      failCount++;
    }

    // Delay 500ms để đảm bảo an toàn, không bị chẩn đoán là DDos
    await delay(500);
  }

  console.log(`\n=== TỔNG KẾT AUDIO ===`);
  console.log(`- Tổng số target: ${list.length}`);
  console.log(`- Tải mới thành công: ${successCount}`);
  console.log(`- Đã có sẵn (Bỏ qua): ${skipCount}`);
  console.log(`- Thất bại: ${failCount}`);
  console.log(`=======================\n`);
}

main().catch(err => {
  console.error('Lỗi hệ thống tải Audio:', err);
});
