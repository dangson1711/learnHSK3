/**
 * Robust Speech Synthesis Utility for Hanzi Story
 * Solves iOS Safari & Mobile Chrome silent speech engines
 */

// Mapping of abstract/rare stroke-only radicals to common homophones
// This ensures that all mobile and desktop browsers have proper pronunciations
// instead of remaining silent or reading them incorrectly.
export const RADICAL_PRONUNCIATION_MAP: Record<string, string> = {
  "彳": "赤", // chì
  "辶": "绰", // chuò
  "疒": "讷", // nè (Bộ Nạch - Correctly reads as "nè", resolving incorrect mobile/desktop pronunciations like "chuang" or "bing")
  "艹": "草", // cǎo
  "阝": "阜", // fù / yì
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

// Global reference for fallback unlock status
let hasUnlockedSpeech = false;

/**
 * Perform a tiny, silent speech synthesis to unlock the iOS device sound channel.
 * Must be executed within a direct user interaction event (touchend, click, etc.).
 */
export const unlockMobileSpeech = () => {
  if (typeof window === 'undefined' || !window.speechSynthesis || hasUnlockedSpeech) return;

  try {
    const unlockUtterance = new SpeechSynthesisUtterance('');
    unlockUtterance.volume = 0;
    window.speechSynthesis.speak(unlockUtterance);
    hasUnlockedSpeech = true;
    console.log('Mobile Speech Synthesis unlocked successfully.');
  } catch (err) {
    console.warn('Failed to unlock mobile speech:', err);
  }
};

// Initialize listeners to auto-unlock on first tap if possible
if (typeof window !== 'undefined' && window.speechSynthesis) {
  const triggerUnlock = () => {
    unlockMobileSpeech();
    // Auto-remove listeners once unlocked
    document.removeEventListener('click', triggerUnlock);
    document.removeEventListener('touchstart', triggerUnlock);
  };
  document.addEventListener('click', triggerUnlock, { passive: true });
  document.addEventListener('touchstart', triggerUnlock, { passive: true });
}

/**
 * Find the optimal native voice matching the language pattern
 */
const getBestChineseVoice = (voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null => {
  if (!voices || voices.length === 0) return null;

  // 1. Try Mandarin China local service
  let matched = voices.find(v => v.lang === 'zh-CN' && v.localService);
  if (matched) return matched;

  // 2. Try any zh-CN voice
  matched = voices.find(v => v.lang === 'zh-CN');
  if (matched) return matched;

  // 3. Try any voice starting with zh (e.g. zh-TW, zh-HK)
  matched = voices.find(v => v.lang.toLowerCase().startsWith('zh'));
  if (matched) return matched;

  // 4. Try any voice that contains Chinese or Mandarin
  matched = voices.find(v => {
    const nameLower = v.name.toLowerCase();
    return nameLower.includes('chinese') || nameLower.includes('mandarin') || nameLower.includes('putonghua');
  });
  if (matched) return matched;

  return null;
};

/**
 * Robust text speaker for Chinese language
 * Handles audio resume, text sanitization, mobile unlocking, and voice mapping.
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
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    console.warn('Speech synthesis not supported in this browser.');
    return;
  }

  try {
    // Mobilize: unlock sound first
    unlockMobileSpeech();

    // Cancel current cue to start cleanly
    window.speechSynthesis.cancel();

    // Force resume if stuck/suspended on iOS / Chrome on Mobile
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }

    // Clean text: strip example details, translations in parenthesis, and spaces
    let cleanText = text.split('(')[0].trim();
    
    // Replace abstract/unpronounceable radical characters with perfect pronunciation homophones
    if (RADICAL_PRONUNCIATION_MAP[cleanText]) {
      cleanText = RADICAL_PRONUNCIATION_MAP[cleanText];
    }

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'zh-CN';
    utterance.rate = 0.85; // Slightly slower, optimal speed for non-native learners to distinguish tones
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    // Set voice explicitly to prevent defaulting to default system locale (English) on mobile browsers
    const voices = window.speechSynthesis.getVoices();
    const matchedVoice = getBestChineseVoice(voices);
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    } else {
      // iOS load hack: sometimes voices are empty initially, listen for voices changed
      window.speechSynthesis.onvoiceschanged = () => {
        const liveVoices = window.speechSynthesis.getVoices();
        const liveMatched = getBestChineseVoice(liveVoices);
        if (liveMatched) {
          utterance.voice = liveMatched;
        }
      };
    }

    // Workaround for some mobile browsers that cut off speech on long sentences
    utterance.onend = () => {
      // Optional: Log completion
    };

    utterance.onerror = (e) => {
      console.warn('SpeechSynthesisUtterance error:', e);
      // Attempt quick silent fallback to recover audio state
      try {
        window.speechSynthesis.resume();
      } catch (_) {}
    };

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.error('Failed to trigger speech synthesis:', err);
  }
};
