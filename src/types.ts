export interface CommonCharacter {
  character: string;
  pinyin: string;
  meaning: string;
}

export interface Radical {
  id: string;
  character: string; // E.g., "水 / 氵"
  pinyin: string; // E.g., "shuǐ"
  vietnameseName: string; // Tên Hán Việt
  meaning: string; // Nghĩa tiếng Việt
  story: string; // Câu chuyện liên tưởng
  commonCharacters: CommonCharacter[]; // Các chữ thường gặp chứa bộ thủ này
  category: 'nature' | 'human' | 'action' | 'object' | 'lifestyle'; // Nhóm bộ thủ
  usageExplanation: string; // Bộ này thường dùng trong các chữ có nghĩa như thế nào
  emojiIllustration?: string; // Icon emoji cho bộ thủ
}

export interface Topic {
  id: string;
  hskLevel: 1 | 2 | 3;
  title: string;
  vietnameseTitle: string;
  description: string;
  order: number;
}

export interface Vocabulary {
  id: string;
  topicId: string;
  hskLevel: 1 | 2 | 3;
  word: string; // Chữ Hán
  pinyin: string; // Phiên âm
  meaning: string; // Nghĩa tiếng Việt
  radicals: string[]; // Các bộ thủ cấu thành (ví dụ ["人", "木"])
  story: string; // Câu chuyện liên tưởng xâu chuỗi bộ thủ
  exampleSentence: string; // Câu ví dụ tiếng Trung
  examplePinyin: string; // Phiên âm câu ví dụ
  exampleMeaning: string; // Nghĩa câu ví dụ
}

export interface UserProgress {
  learnedRadicals: string[]; // Array of Radical IDs
  learnedVocabulary: string[]; // Array of Vocabulary IDs
  streak: number;
  lastLearnDate: string | null; // YYYY-MM-DD
}
