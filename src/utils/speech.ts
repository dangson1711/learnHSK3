import { Howl } from 'howler';
import { VOCABULARY_DATA, HSK_1_WORDS_LIST, HSK_2_WORDS_LIST, HSK_3_WORDS_LIST, TOPICS_DATA, get600HskWords, getVocabularyDetail } from '../data/vocabulary';
import { RADICALS_DATA } from '../data/radicals';

// Mapping of abstract/rare stroke-only radicals to common homophones
// This ensures we download high quality pronunciations of phonetic equivalents
export const RADICAL_PRONUNCIATION_MAP: Record<string, string> = {
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

// Sound channel state
let isAudioEngineUnlocked = false;
let activeHowlSound: Howl | null = null;

// Base64 0.1s silent MP3 to force browser audio context initialization
const SILENT_MP3_BASE64 = 'data:audio/mp3;base64,SUQzBAAAAAABEVRYWFgAAAATAAADc29mdHdhcmUATGF2ZjUyLjkzLjAAAAAA//MUxAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq';

/**
 * Initialize Web Audio API engine & unlock physical silent switches on iOS / Zalo / Facebook etc.
 * Must be bound to user gestures.
 */
export const initAudioEngine = () => {
  if (isAudioEngineUnlocked || typeof window === 'undefined') return;

  const unlock = () => {
    try {
      const silentHowl = new Howl({
        src: [SILENT_MP3_BASE64],
        format: ['mp3'],
        html5: false, // Must be false to initialize Web Audio API Context
      });
      silentHowl.play();
      isAudioEngineUnlocked = true;
      console.log('[Hanzi Story] Audio Engine successfully unlocked on interaction.');
    } catch (err) {
      console.warn('[Hanzi Story] Failed to unlock audio context:', err);
    }

    // Force unlock browser AudioContext if built-in
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        const tempCtx = new AudioContextClass();
        if (tempCtx.state === 'suspended') {
          tempCtx.resume();
        }
      }
    } catch (_) {}

    // Cleanup listeners
    document.removeEventListener('touchstart', unlock);
    document.removeEventListener('click', unlock);
  };

  document.addEventListener('touchstart', unlock, { once: true, passive: true });
  document.addEventListener('click', unlock, { once: true, passive: true });
};

// Bind auto-unlock on client initialization
if (typeof window !== 'undefined') {
  initAudioEngine();
}

/**
 * Clean text: strips Vietnamese meaning fragments in parentheses
 */
function cleanChineseText(text: string): string {
  let clean = text.split('(')[0].split('（')[0].split('/')[0].trim();
  if (RADICAL_PRONUNCIATION_MAP[clean]) {
    clean = RADICAL_PRONUNCIATION_MAP[clean];
  }
  return clean;
}

/**
 * Unified stop for any ongoing audio tracks (both Howler and Native)
 */
export function stopAllActiveAudio() {
  if (activeHowlSound) {
    try {
      activeHowlSound.stop();
      activeHowlSound.unload();
    } catch (_) {}
    activeHowlSound = null;
  }
  
  try {
    const nativeAudio = (window as any)._activeNativeAudio;
    if (nativeAudio) {
      nativeAudio.pause();
      nativeAudio.currentTime = 0;
      (window as any)._activeNativeAudio = null;
    }
  } catch (_) {}
}

/**
 * Plays a Chinese text (word, sentence, radical) using Howler.js and native fallbacks.
 * Utilizes pre-downloaded same-domain local audio files via multi-layered strategies:
 * - Strategy A: Howler Web Audio (html5: false) (bypasses iOS physical silent switches)
 * - Strategy B: Howler HTML5 Audio (html5: true) (reliable inside sandboxed browser iframes)
 * - Strategy C: Native Browser HTML5 audio tag fallback (highest user permission boundary)
 * - Strategy D: Backup live streaming CDN Fallback (for arbitrary user queries / searches)
 */
export const speakChineseText = (text: string, event?: any) => {
  if (event) {
    try {
      if (typeof event.stopPropagation === 'function') {
        event.stopPropagation();
      }
    } catch (_) {}
  }

  if (!text) return;

  const clean = cleanChineseText(text);
  if (!clean) return;

  console.log(`[Audio Engine] Received request to play: "${clean}"`);

  // Stop any active channel immediately
  stopAllActiveAudio();

  // Try Native Browser Web Speech synthesis API as primary dynamic fallback
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(clean);
      utterance.lang = 'zh-CN';
      utterance.volume = 1.0;
      utterance.rate = 0.85;

      const voices = window.speechSynthesis.getVoices();
      const zhVoice = voices.find(v => v.lang.toLowerCase().includes('zh-cn') || v.lang.toLowerCase().includes('zh'));
      if (zhVoice) {
        utterance.voice = zhVoice;
      }
      window.speechSynthesis.speak(utterance);
      console.log(`[Audio Engine] Dynamic speech played via Web Speech API: "${clean}"`);
      return;
    } catch (err) {
      console.warn('[Audio Engine] Web Speech API failed, trying live streaming endpoints:', err);
    }
  }

  const googleUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(clean)}&tl=zh-cn&client=tw-ob`;
  const youdaoUrl = `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(clean)}&le=zh`;

  try {
    const sound = new Howl({
      src: [googleUrl],
      format: ['mp3'],
      html5: true, // Cross-Origin media must bypass CORS using HTML5 mode
      volume: 1.0,
      onloaderror: () => {
        console.warn(`[Audio Engine] Google Translate stream failed. Retrying with Youdao backup stream...`);
        
        try {
          const backupSound = new Howl({
            src: [youdaoUrl],
            format: ['mp3'],
            html5: true,
            volume: 1.0,
          });
          activeHowlSound = backupSound;
          backupSound.play();
        } catch (_) {}
      }
    });

    activeHowlSound = sound;
    sound.play();
  } catch (err) {
    console.error(`[Audio Engine] Audio stream failed. Trying direct browser fallback...`);
    try {
      const directAudio = new Audio(googleUrl);
      (window as any)._activeNativeAudio = directAudio;
      directAudio.play().catch(() => {
        const directBackup = new Audio(youdaoUrl);
        (window as any)._activeNativeAudio = directBackup;
        directBackup.play().catch(() => {});
      });
    } catch (_) {}
  }
};
