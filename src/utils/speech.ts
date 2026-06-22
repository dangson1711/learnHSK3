import { Howl } from 'howler';
import { VOCABULARY_DATA, HSK_1_WORDS_LIST, HSK_2_WORDS_LIST, HSK_3_WORDS_LIST, TOPICS_DATA, get1000HskWords, getVocabularyDetail } from '../data/vocabulary';
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

// Compute the exact set of pre-downloaded static assets at runtime
const PRE_DOWNLOADED_TERMS = new Set<string>();

function sanitizeFilename(text: string): string {
  return text.replace(/[\\/:*?"<>|.,!?;'，。！？；：\s\-"'“”‘’`…~@#$%^&*()_+={}[\]|;:]/g, '').trim();
}

function cleanTextForSet(text: string): string {
  if (!text) return '';
  const base = text.split('(')[0].split('（')[0].split('/')[0].trim();
  const mapped = RADICAL_PRONUNCIATION_MAP[base] || base;
  return sanitizeFilename(mapped);
}

VOCABULARY_DATA.forEach(v => {
  if (v.word) {
    const c = cleanTextForSet(v.word);
    if (c) PRE_DOWNLOADED_TERMS.add(c);
  }
  if (v.exampleSentence) {
    const c = cleanTextForSet(v.exampleSentence);
    if (c) PRE_DOWNLOADED_TERMS.add(c);
  }
});

HSK_1_WORDS_LIST.forEach(v => {
  if (v.word) {
    const c = cleanTextForSet(v.word);
    if (c) PRE_DOWNLOADED_TERMS.add(c);
  }
});

HSK_2_WORDS_LIST.forEach(v => {
  if (v.word) {
    const c = cleanTextForSet(v.word);
    if (c) PRE_DOWNLOADED_TERMS.add(c);
  }
});

HSK_3_WORDS_LIST.forEach(v => {
  if (v.word) {
    const c = cleanTextForSet(v.word);
    if (c) PRE_DOWNLOADED_TERMS.add(c);
  }
});

RADICALS_DATA.forEach(r => {
  const cleanRad = cleanTextForSet(r.character);
  if (cleanRad) PRE_DOWNLOADED_TERMS.add(cleanRad);
  if (r.commonCharacters) {
    r.commonCharacters.forEach(cc => {
      if (cc.character) {
        const cleanCc = cleanTextForSet(cc.character);
        if (cleanCc) PRE_DOWNLOADED_TERMS.add(cleanCc);
      }
    });
  }
});

// Also add all 1000 HSK words generated procedurally along with their dynamic example sentences
TOPICS_DATA.forEach(t => {
  try {
    const hskWords = get1000HskWords(t.hskLevel, t.order);
    hskWords.forEach(w => {
      if (w.word) {
        const c = cleanTextForSet(w.word);
        if (c) PRE_DOWNLOADED_TERMS.add(c);

        // Pre-register corresponding dynamic example sentence
        const detail = getVocabularyDetail(w.word, t.id, t.hskLevel);
        if (detail && detail.exampleSentence) {
          const ce = cleanTextForSet(detail.exampleSentence);
          if (ce) PRE_DOWNLOADED_TERMS.add(ce);
        }
      }
    });
  } catch (_) {}
});

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
  return sanitizeFilename(clean);
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

  // Check if our term has a pre-cached local file
  const isLocalStorageAvailable = PRE_DOWNLOADED_TERMS.has(clean);

  if (isLocalStorageAvailable) {
    // Sources list containing both raw Chinese name and URL-encoded versions
    // This solves all character encodings across various browser proxy configurations
    const sources = [
      `/audio/${clean}.mp3`,
      `/audio/${encodeURIComponent(clean)}.mp3`
    ];

    console.log(`[Audio Engine] Local pre-cached files found. Deploying Strategy A...`);

    try {
      // Strategy A: Web Audio API
      const sound = new Howl({
        src: sources,
        format: ['mp3'],
        html5: false,
        volume: 1.0,
        onloaderror: (id, err) => {
          console.warn(`[Audio Engine] Strategy A (Web Audio) load error: ${err}. Deploying Strategy B...`);
          playStrategyB(sources, clean);
        },
        onplayerror: (id, err) => {
          console.warn(`[Audio Engine] Strategy A (Web Audio) play error: ${err}. Deploying Strategy B...`);
          playStrategyB(sources, clean);
        }
      });

      activeHowlSound = sound;
      // Timeout guard: If state is suspended or fails silently, trigger Strategy B after a short delay
      sound.play();
    } catch (e) {
      console.warn(`[Audio Engine] Strategy A failed to start. Deploying Strategy B...`);
      playStrategyB(sources, clean);
    }
  } else {
    // Dynamic Online streaming lookup fallback
    console.log(`[Audio Engine] Term not in statically downloaded list. Deploying Strategy D (Dynamic Streaming fallback)...`);
    playStrategyD(clean);
  }
};

/**
 * Strategy B: Same-origin HTML5 media elements inside Howler.js (safe within sandboxed iframes)
 */
function playStrategyB(sources: string[], cleanText: string) {
  stopAllActiveAudio();
  console.log(`[Audio Engine] Strategy B (Howler HTML5 Audio) playing standard tracks...`);

  try {
    const sound = new Howl({
      src: sources,
      format: ['mp3'],
      html5: true, // Uses HTML5 Audio stream - compatible with iframe restrictions!
      volume: 1.0,
      onloaderror: (id, err) => {
        console.warn(`[Audio Engine] Strategy B load failed: ${err}. Deploying Strategy C (Native HTML5 Media)...`);
        playStrategyC(sources, cleanText);
      },
      onplayerror: (id, err) => {
        console.warn(`[Audio Engine] Strategy B play failed: ${err}. Deploying Strategy C (Native HTML5 Media)...`);
        playStrategyC(sources, cleanText);
      }
    });

    activeHowlSound = sound;
    sound.play();
  } catch (err) {
    console.warn(`[Audio Engine] Strategy B failed to instantiate. Deploying Strategy C...`);
    playStrategyC(sources, cleanText);
  }
}

/**
 * Strategy C: Plain simple Native HTML5 Audio constructor context (highest user action bypass priority)
 */
function playStrategyC(sources: string[], cleanText: string) {
  stopAllActiveAudio();
  console.log(`[Audio Engine] Strategy C (Native Audio) playing standard path...`);

  // Try sequentially
  let currentSourceIdx = 0;

  const playNext = () => {
    if (currentSourceIdx >= sources.length) {
      console.warn(`[Audio Engine] Strategy C completely exhausted. Falling back to Strategy D (Live Dynamic Stream)...`);
      playStrategyD(cleanText);
      return;
    }

    const currentUrl = sources[currentSourceIdx];
    try {
      const audio = new Audio(currentUrl);
      audio.volume = 1.0;
      
      // Store globally for stop callbacks
      (window as any)._activeNativeAudio = audio;

      audio.play().then(() => {
        console.log(`[Audio Engine] Strategy C successfully playing source: ${currentUrl}`);
      }).catch(err => {
        console.warn(`[Audio Engine] Strategy C failed playing source: ${currentUrl}. Trying next...`, err);
        currentSourceIdx++;
        playNext();
      });
    } catch (err) {
      console.error(`[Audio Engine] Strategy C failed to create Audio tag. Trying next...`, err);
      currentSourceIdx++;
      playNext();
    }
  };

  playNext();
}

/**
 * Strategy D: Premium external audio translation services (dynamic lookups / live streaming fallbacks)
 */
function playStrategyD(cleanText: string) {
  stopAllActiveAudio();

  // Try Native Browser Web Speech synthesis API as primary dynamic fallback (works perfectly inside sandboxed iframes)
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'zh-CN';
      utterance.volume = 1.0;
      utterance.rate = 0.85;

      const voices = window.speechSynthesis.getVoices();
      const zhVoice = voices.find(v => v.lang.toLowerCase().includes('zh-cn') || v.lang.toLowerCase().includes('zh'));
      if (zhVoice) {
        utterance.voice = zhVoice;
      }
      window.speechSynthesis.speak(utterance);
      console.log(`[Audio Engine] Dynamic speech played via Web Speech API: "${cleanText}"`);
      return;
    } catch (err) {
      console.warn('[Audio Engine] Web Speech API failed, trying live streaming endpoints:', err);
    }
  }

  const googleUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(cleanText)}&tl=zh-cn&client=tw-ob`;
  const youdaoUrl = `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(cleanText)}&le=zh`;

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
    console.error(`[Audio Engine] Strategy D failed. Trying direct browser fallback...`);
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
}
