import { SrsItem } from '../types';

/**
 * Calculates SRS scheduler values based on SM-2 algorithm.
 * quality (0 to 5):
 * 5: "Rất dễ" (Perfect response)
 * 4: "Bình thường" (Correct response after a hesitation)
 * 2: "Khó khăn" (Incorrect response; where the correct one seemed easy to recall)
 * 1: "Quên sạch" (Incorrect response; the correct one remembered)
 * We map 4 levels in UI:
 * 1: Quên sạch (Again) -> quality 1
 * 2: Khó (Hard)       -> quality 2
 * 3: Nhớ tốt (Good)   -> quality 4
 * 4: Rất dễ (Easy)     -> quality 5
 */
export function calculateSrs(
  word: string,
  grade: 1 | 2 | 3 | 4,
  currentSrs?: SrsItem
): SrsItem {
  const nowStr = new Date().toISOString().split('T')[0];
  
  // Default values if first time
  let easeFactor = currentSrs?.easeFactor ?? 2.5;
  let repetitions = currentSrs?.repetitions ?? 0;
  let interval = currentSrs?.interval ?? 0;

  // Map grade to quality (0-5)
  let quality: number;
  if (grade === 1) quality = 1; // Forget
  else if (grade === 2) quality = 2; // Hard
  else if (grade === 3) quality = 4; // Good
  else quality = 5; // Easy

  // SM-2 Algorithm
  if (quality >= 3) {
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    repetitions += 1;
  } else {
    repetitions = 0;
    interval = 1;
  }

  // EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
  easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (easeFactor < 1.3) {
    easeFactor = 1.3;
  }

  // Calculate next review date
  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + interval);
  const nextReviewDate = nextDate.toISOString().split('T')[0];

  return {
    word,
    interval,
    easeFactor: parseFloat(easeFactor.toFixed(2)),
    repetitions,
    nextReviewDate,
    lastReviewDate: nowStr
  };
}

/**
 * Filter words that are due or new for SRS review.
 * Word is due if nextReviewDate is <= today.
 */
export function isWordDueForSrs(item: SrsItem): boolean {
  const today = new Date().toISOString().split('T')[0];
  return item.nextReviewDate <= today;
}
