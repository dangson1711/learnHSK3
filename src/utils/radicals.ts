import { RADICALS_DATA } from "../data/radicals";
import { Radical } from "../types";

export const findRadicalByChar = (char: string): Radical | undefined => {
  if (!char || typeof char !== 'string') return undefined;
  
  const VARIANTS: Record<string, string> = {
    "亻": "人",
    "氵": "水",
    "忄": "心",
    "扌": "手",
    "灬": "火",
    "刂": "刀",
    "衤": "衣",
    "礻": "示",
    "犬": "犭",
    "网": "罒",
    "肉": "月",
    "攵": "攴",
    "阝": "阝",
    "艹": "艹",
    "纟": "纟",
    "宀": "宀",
    "雨": "雨",
    "走": "走",
    "辶": "辶",
    "彳": "彳"
  };

  // 1. Check exact matches first
  let found = RADICALS_DATA.find((r) => r.character === char);
  if (found) return found;

  // 2. Check known variants
  for (const [variant, base] of Object.entries(VARIANTS)) {
    if (char.includes(variant) || char === variant) {
      const match = RADICALS_DATA.find(r => r.character === base || r.character === variant);
      if (match) return match;
    }
  }

  // 3. Fallback to includes
  return RADICALS_DATA.find(
    (r) => char.includes(r.character) || r.character.includes(char)
  );
};
