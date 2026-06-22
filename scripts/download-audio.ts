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
// This ensures we download high quality pronunciations of phonetic equivalents
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

// Clean text helper
function cleanTextForTTS(text: string): string {
  let clean = text.split('(')[0].split('（')[0].split('/')[0].trim();
  if (RADICAL_PRONUNCIATION_MAP[clean]) {
    clean = RADICAL_PRONUNCIATION_MAP[clean];
  }
  return clean;
}

// Function to delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function downloadFile(text: string, destPath: string): Promise<boolean> {
  const clean = cleanTextForTTS(text);
  if (!clean) return false;

  // Utilize high-fidelity Youdao endpoint (type=2 is female Mandarin Mandarin speaker)
  const url = `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(clean)}&type=2`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const buffer = await response.arrayBuffer();
    fs.writeFileSync(destPath, Buffer.from(buffer));
    return true;
  } catch (error: any) {
    console.warn(`[WARN] Youdao failed for "${clean}", trying Google Translate TTS fallback... Error: ${error.message}`);
    // Google Translate TTS Backup
    const googleUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(clean)}&tl=zh-cn&client=tw-ob`;
    try {
      const response = await fetch(googleUrl);
      if (!response.ok) {
        throw new Error(`Google HTTP ${response.status}`);
      }
      const buffer = await response.arrayBuffer();
      fs.writeFileSync(destPath, Buffer.from(buffer));
      return true;
    } catch (gErr: any) {
      console.error(`[ERROR] Failed to download audio for "${text}" ("${clean}"):`, gErr.message);
      return false;
    }
  }
}

async function main() {
  console.log('--- Starting Mandarin Audio Asset Downloader ---');
  
  // Ensure target folder exists
  if (!fs.existsSync(PUBLIC_AUDIO_DIR)) {
    fs.mkdirSync(PUBLIC_AUDIO_DIR, { recursive: true });
    console.log(`Created directory: ${PUBLIC_AUDIO_DIR}`);
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
    
    // Common examples inside radical
    if (r.commonCharacters) {
      r.commonCharacters.forEach(cc => {
        if (cc.character) textsToDownload.add(cc.character);
      });
    }
  });

  console.log(`Discovered ${textsToDownload.size} unique Mandarin terms to download.`);

  let successCount = 0;
  let skipCount = 0;
  let failCount = 0;

  const list = Array.from(textsToDownload);
  for (let i = 0; i < list.length; i++) {
    const text = list[i];
    const safeFilename = encodeURIComponent(text) + '.mp3';
    const filePath = path.join(PUBLIC_AUDIO_DIR, safeFilename);

    if (fs.existsSync(filePath)) {
      skipCount++;
      continue;
    }

    console.log(`[${i + 1}/${list.length}] Downloading "${text}"...`);
    const ok = await downloadFile(text, filePath);
    if (ok) {
      successCount++;
    } else {
      failCount++;
    }

    // Delay slightly to bypass server rate limits (extremely important!)
    await delay(300);
  }

  console.log(`\n=== AUDIO SYNCHRONIZATION SUMMARY ===`);
  console.log(`- Total unique terms: ${list.length}`);
  console.log(`- Successfully downloaded: ${successCount}`);
  console.log(`- Already existed (skipped): ${skipCount}`);
  console.log(`- Failed downloads: ${failCount}`);
  console.log(`======================================\n`);
}

main().catch(err => {
  console.error('Fatal crash in audio downloader:', err);
});
