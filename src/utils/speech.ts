/**
 * Robust Speech Synthesis Utility for Hanzi Story
 * Solves iOS Safari, Mobile Chrome, and hybrid WebViews (Zalo, Facebook, Messenger)
 * combines native Web Speech API and premium Youdao/Google Cloud audio fallback engines.
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

// Global references
let hasUnlockedSpeech = false;
let activeFallbackAudio: HTMLAudioElement | null = null;

/**
 * Detects if the current browser environment is an in-app WebView
 * (such as Facebook custom WebView, Zalo WebView, Telegram, iOS WKWebView with restrictions)
 */
export const isMobileWebView = (): boolean => {
  if (typeof window === 'undefined') return false;
  const ua = navigator.userAgent || navigator.vendor || (window as any).opera || '';
  const isZalo = /zalo/i.test(ua);
  const isFb = /fban|fbav/i.test(ua);
  const isMessenger = /messenger/i.test(ua);
  const isInstagram = /instagram/i.test(ua);
  const isWebView = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(ua) || /wv/i.test(ua);
  return isZalo || isFb || isMessenger || isInstagram || isWebView;
};

/**
 * Perform a tiny, silent speech synthesis to unlock the iOS device sound channel.
 * Must be executed within a direct user interaction event (touchend, click, etc.).
 */
export const unlockMobileSpeech = () => {
  if (typeof window === 'undefined') return;

  // Unlock speechSynthesis
  if (window.speechSynthesis && !hasUnlockedSpeech) {
    try {
      const unlockUtterance = new SpeechSynthesisUtterance('');
      unlockUtterance.volume = 0;
      window.speechSynthesis.speak(unlockUtterance);
      hasUnlockedSpeech = true;
      console.log('Mobile Speech Synthesis unlocked successfully.');
    } catch (err) {
      console.warn('Failed to unlock mobile speech:', err);
    }
  }

  // Unlock HTML5 Audio context on iOS too
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContext) {
      const ctx = new AudioContext();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
    }
  } catch (_) {}
};

// Initialize listeners to auto-unlock on first tap if possible
if (typeof window !== 'undefined') {
  const triggerUnlock = () => {
    unlockMobileSpeech();
    document.removeEventListener('click', triggerUnlock);
    document.removeEventListener('touchstart', triggerUnlock);
  };
  document.addEventListener('click', triggerUnlock, { passive: true });
  document.addEventListener('touchstart', triggerUnlock, { passive: true });
}

/**
 * Find the optimal native voice matching the Chinese Mandarin language pattern
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
 * Fallback to premium cloud tts engine (Youdao & Google)
 * Works flawlessly inside Zalo, Facebook, Messenger and restricted mobile WebViews!
 */
export const playCloudTTS = (text: string): Promise<boolean> => {
  return new Promise((resolve) => {
    try {
      if (activeFallbackAudio) {
        activeFallbackAudio.pause();
        activeFallbackAudio = null;
      }

      // Clean text: strip pinyin or meaning elements inside parentheses
      let cleanText = text.split('(')[0].trim();
      if (RADICAL_PRONUNCIATION_MAP[cleanText]) {
        cleanText = RADICAL_PRONUNCIATION_MAP[cleanText];
      }

      // 1. Try Youdao Audio TTS (Mandarin type 2)
      const youdaoUrl = `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(cleanText)}&type=2`;
      const audio = new Audio(youdaoUrl);
      activeFallbackAudio = audio;

      // Set timeout fallback in case of slow loads
      const timeoutId = setTimeout(() => {
        resolve(false);
      }, 3500);

      audio.oncanplaythrough = () => {
        // Safe play
        audio.play().then(() => {
          clearTimeout(timeoutId);
          resolve(true);
        }).catch(err => {
          console.warn('Youdao play failed, trying Google Translate backup...', err);
          
          // 2. Backup to Google Translate TTS
          const googleUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(cleanText)}&tl=zh-cn&client=tw-ob`;
          const backupAudio = new Audio(googleUrl);
          activeFallbackAudio = backupAudio;

          backupAudio.play().then(() => {
            clearTimeout(timeoutId);
            resolve(true);
          }).catch(e => {
            clearTimeout(timeoutId);
            console.error('All cloud fallback audio sources failed to play.', e);
            resolve(false);
          });
        });
      };

      audio.onerror = () => {
        clearTimeout(timeoutId);
        // Instant retry google translate as backup
        const googleUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(cleanText)}&tl=zh-cn&client=tw-ob`;
        const backupAudio = new Audio(googleUrl);
        activeFallbackAudio = backupAudio;
        backupAudio.play().then(() => resolve(true)).catch(() => resolve(false));
      };

    } catch (err) {
      console.error('Cloud TTS error:', err);
      resolve(false);
    }
  });
};

/**
 * Robust text speaker for Chinese language
 * Handles audio resume, text sanitization, mobile unlocking, and voice mapping.
 * Automatically handles Zalo/Facebook WebViews and blocks with seamless fallback.
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

  // Trigger sound-channel unlocking
  unlockMobileSpeech();

  // Clean the text to avoid spelling/expression remnants
  let cleanText = text.split('(')[0].trim();
  if (RADICAL_PRONUNCIATION_MAP[cleanText]) {
    cleanText = RADICAL_PRONUNCIATION_MAP[cleanText];
  }

  // FORCE CLOUD AUDIO ENG FOR IN-APP WEBVIEWS (Facebook, Zalo, Messenger, built-in WebViews)
  // because speechSynthesis is either completely stripped, blocked or voice-less in those custom client apps.
  if (isMobileWebView()) {
    console.log('Detected Mobile WebView (Zalo/Facebook/etc). Using robust Cloud TTS Engine...');
    playCloudTTS(cleanText);
    return;
  }

  // Desktop or standard mobile browsers (Chrome, Safari, Firefox)
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    console.log('speechSynthesis not available. Using robust Cloud TTS Engine...');
    playCloudTTS(cleanText);
    return;
  }

  try {
    // Cancel any active speech synthesis cue
    window.speechSynthesis.cancel();

    // Ensure state is un-paused
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'zh-CN';
    utterance.rate = 0.85; // Optimal speed for foreign learners to practice tones
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    // Resolve voices list
    const voices = window.speechSynthesis.getVoices();
    const matchedVoice = getBestChineseVoice(voices);
    
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    } else {
      window.speechSynthesis.onvoiceschanged = () => {
        const liveVoices = window.speechSynthesis.getVoices();
        const liveMatched = getBestChineseVoice(liveVoices);
        if (liveMatched) {
          utterance.voice = liveMatched;
        }
      };
    }

    let isSpeakingSuccessful = false;

    // If text fails to speak using the native Speech API within 350ms, play standard HTML5 fallback immediately!
    const fallbackTimer = setTimeout(() => {
      if (!isSpeakingSuccessful) {
        console.warn('Native speechSynthesis is unresponsive or silent. Launching robust Cloud TTS Fallback...');
        playCloudTTS(cleanText);
      }
    }, 400);

    utterance.onstart = () => {
      isSpeakingSuccessful = true;
      clearTimeout(fallbackTimer);
    };

    utterance.onerror = (e) => {
      clearTimeout(fallbackTimer);
      console.warn('Native SpeechSynthesis error, falling back to Cloud TTS...', e);
      playCloudTTS(cleanText);
    };

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.error('Failed to speak via native SpeechSynthesis, using Cloud TTS fallback...', err);
    playCloudTTS(cleanText);
  }
};
