import React, { useState, useEffect, useMemo } from 'react';
import { Vocabulary } from '../types';
import { StrokeOrderVisualizer } from './StrokeOrderVisualizer';
import { 
  Award, 
  HelpCircle, 
  BookOpen, 
  Layers, 
  Play, 
  RotateCcw, 
  Volume2, 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  HelpCircle as QuestionIcon,
  BookMarked,
  Sparkles,
  Smile,
  Frown,
  Meh
} from 'lucide-react';

interface VocabularyReviewProps {
  learnedWordIds: string[];
  allVocabularies: Vocabulary[];
  onToggleWordLearned?: (wordId: string) => void;
}

export function VocabularyReview({ learnedWordIds, allVocabularies, onToggleWordLearned }: VocabularyReviewProps) {
  // Load custom difficulties from localStorage, fallback to mapping HSK Levels
  const [customDifficulties, setCustomDifficulties] = useState<Record<string, 'easy' | 'medium' | 'hard'>>(() => {
    const saved = localStorage.getItem('hanzi_vocab_difficulties');
    return saved ? JSON.parse(saved) : {};
  });

  // Save difficulties when changed
  const updateDifficulty = (wordId: string, level: 'easy' | 'medium' | 'hard') => {
    const updated = { ...customDifficulties, [wordId]: level };
    setCustomDifficulties(updated);
    localStorage.setItem('hanzi_vocab_difficulties', JSON.stringify(updated));
  };

  // Speak Chinese pronunciation helper (standard browser speech synthesis)
  const speakChinese = (word: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'zh-CN';
      utterance.rate = 0.85; // slightly slower for clarity
      window.speechSynthesis.speak(utterance);
    }
  };

  // Default seed words in case user has no learned words yet
  const fallbackSeeds = useMemo(() => {
    return allVocabularies.slice(0, 30);
  }, [allVocabularies]);

  // Combine learned words and fallback seeds to always have words to practice
  const reviewPool = useMemo(() => {
    const learnedSet = new Set(learnedWordIds);
    const combined = allVocabularies.filter(v => learnedSet.has(v.id) || learnedSet.has(v.word));
    
    // If empty or very small, blend in seed words so review tab is immediately usable and fully populated!
    if (combined.length < 5) {
      const addedIds = new Set(combined.map(c => c.id));
      fallbackSeeds.forEach(seed => {
        if (!addedIds.has(seed.id) && addedIds.size < 12) {
          combined.push(seed);
          addedIds.add(seed.id);
        }
      });
    }
    return combined;
  }, [learnedWordIds, allVocabularies, fallbackSeeds]);

  // Distribute vocabularies into difficulty bins
  const binnedVocabularies = useMemo(() => {
    const easy: Vocabulary[] = [];
    const medium: Vocabulary[] = [];
    const hard: Vocabulary[] = [];

    reviewPool.forEach(v => {
      // Check custom designation, fallback to HSK level
      const dest = customDifficulties[v.id] || customDifficulties[v.word];
      if (dest) {
        if (dest === 'easy') easy.push(v);
        else if (dest === 'medium') medium.push(v);
        else if (dest === 'hard') hard.push(v);
      } else {
        // Fallback mapping: HSK1=easy, HSK2=medium, HSK3=hard
        if (v.hskLevel === 1) easy.push(v);
        else if (v.hskLevel === 2) medium.push(v);
        else hard.push(v);
      }
    });

    return { easy, medium, hard };
  }, [reviewPool, customDifficulties]);

  const [activeTab, setActiveTab] = useState<'easy' | 'medium' | 'hard'>('medium');
  const activeList = binnedVocabularies[activeTab];

  // Learning/Review session state
  const [sessionMode, setSessionMode] = useState<'list' | 'flashcard' | 'quiz'>('list');
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  // Quiz game state
  const [quizQuestions, setQuizQuestions] = useState<{
    word: Vocabulary;
    options: string[];
    correctIndex: number;
  }[]>([]);
  const [quizCurrentIdx, setQuizCurrentIdx] = useState(0);
  const [selectedAnswerIdx, setSelectedAnswerIdx] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  // Reset indices on list swap
  useEffect(() => {
    setFlashcardIndex(0);
    setIsCardFlipped(false);
  }, [activeTab, sessionMode]);

  // Construct MCQ Quiz Questions
  const generateQuiz = () => {
    if (activeList.length === 0) return;
    
    // Shuffle helper
    const shuffle = <T,>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);
    
    const questions = activeList.map(item => {
      // Find 3 incorrect meanings
      const incorrectList = allVocabularies
        .filter(v => v.word !== item.word)
        .map(v => v.meaning);
      const randomIncorrects = shuffle(incorrectList).slice(0, 3);
      
      const options = shuffle([...randomIncorrects, item.meaning]);
      const correctIndex = options.indexOf(item.meaning);

      return {
        word: item,
        options,
        correctIndex
      };
    });

    setQuizQuestions(shuffle(questions).slice(0, 8)); // Top 8 questions
    setQuizCurrentIdx(0);
    setSelectedAnswerIdx(null);
    setQuizScore(0);
    setIsQuizCompleted(false);
    setSessionMode('quiz');
  };

  const handleAnswerSubmit = (idx: number) => {
    if (selectedAnswerIdx !== null) return;
    setSelectedAnswerIdx(idx);
    const isCorrect = idx === quizQuestions[quizCurrentIdx].correctIndex;
    if (isCorrect) {
      setQuizScore(prev => prev + 1);
    }
  };

  const handleNextQuizQuestion = () => {
    if (quizCurrentIdx < quizQuestions.length - 1) {
      setQuizCurrentIdx(prev => prev + 1);
      setSelectedAnswerIdx(null);
    } else {
      setIsQuizCompleted(true);
    }
  };

  return (
    <div className="bg-slate-50/50 rounded-3xl border border-slate-200/60 p-5 md:p-6 space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/50">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-100 text-amber-700 rounded-xl">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-800 font-sans tracking-tight">Ôn Tập Cốt Vựng Thần Tốc</h2>
              <p className="text-xs text-slate-500 font-medium font-sans">Ôn luyện theo từng cấp độ từ vựng khó, trung bình, dễ để tối ưu học tập.</p>
            </div>
          </div>
        </div>
        
        {sessionMode === 'list' && (
          <div className="flex bg-slate-200/60 p-1 rounded-2xl border border-slate-300/30">
            <button
              onClick={() => setActiveTab('easy')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'easy'
                  ? 'bg-white text-emerald-600 shadow-sm font-medium'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              <Smile className="w-3.5 h-3.5" />
              Dễ ({binnedVocabularies.easy.length})
            </button>
            <button
              onClick={() => setActiveTab('medium')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'medium'
                  ? 'bg-white text-amber-600 shadow-sm font-medium'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              <Meh className="w-3.5 h-3.5" />
              Trung bình ({binnedVocabularies.medium.length})
            </button>
            <button
              onClick={() => setActiveTab('hard')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'hard'
                  ? 'bg-white text-rose-600 shadow-sm font-medium'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              <Frown className="w-3.5 h-3.5" />
              Khó ({binnedVocabularies.hard.length})
            </button>
          </div>
        )}
      </div>

      {/* --- 1. DEFAULT LIST VIEW --- */}
      {sessionMode === 'list' && (
        <div className="space-y-6">
          
          {/* Quick Practice Actions */}
          {activeList.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <button
                onClick={() => setSessionMode('flashcard')}
                className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl flex items-center justify-between shadow-sm cursor-pointer hover:shadow-md transition-all active:scale-[0.98]"
              >
                <div className="space-y-0.5 text-left">
                  <span className="text-xs font-bold text-blue-100 uppercase tracking-widest block font-sans">Review Mode</span>
                  <h4 className="text-sm font-black font-sans leading-none mt-1">Luyện Ký Ức Flashcard</h4>
                  <p className="text-[11px] text-blue-100/85 font-medium font-sans mt-1">Lật thẻ học nghĩa, pinyin và học cách đặt nét viết tay.</p>
                </div>
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                  <BookMarked className="w-5 h-5 text-white" />
                </div>
              </button>

              <button
                onClick={generateQuiz}
                className="p-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl flex items-center justify-between shadow-sm cursor-pointer hover:shadow-md transition-all active:scale-[0.98]"
              >
                <div className="space-y-0.5 text-left">
                  <span className="text-xs font-bold text-emerald-100 uppercase tracking-widest block font-sans">Self-Test</span>
                  <h4 className="text-sm font-black font-sans leading-none mt-1">Trắc Nghiệm Hán Tự</h4>
                  <p className="text-[11px] text-emerald-100/85 font-medium font-sans mt-1">Trò chơi trắc nghiệm chọn nghĩa Việt, nhận diện mặt chữ.</p>
                </div>
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
              </button>
            </div>
          )}

          {/* List of Words */}
          {activeList.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200/50 flex flex-col items-center">
              <Smile className="w-12 h-12 text-slate-350 animate-bounce mb-3" />
              <h3 className="text-base font-black text-slate-700">Trống trải quá!</h3>
              <p className="text-xs text-slate-400 max-w-xs mt-1">
                Lớp học này chưa có từ vựng nào! Hãy đánh dấu thêm nhiều từ để bắt đầu luyện tập ôn tập tại đây nhé.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeList.map((vocab, idx) => (
                <div 
                  key={vocab.id || idx}
                  className="bg-white p-4.5 rounded-2xl border border-slate-200/60 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between space-y-4"
                >
                  <div>
                    {/* Header: Level and Voice Pronounce */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-mono">
                        HSK {vocab.hskLevel}
                      </span>
                      <button 
                        onClick={(e) => speakChinese(vocab.word, e)}
                        className="p-1.5 bg-slate-50 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
                        title="Nghe phát âm chuẩn"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Word Character Display */}
                    <div className="text-center py-2 space-y-1">
                      <span className="text-4xl font-serif font-black text-slate-800 tracking-tight block">
                        {vocab.word}
                      </span>
                      <span className="text-xs font-semibold text-slate-400 font-mono tracking-wider uppercase block">
                        {vocab.pinyin}
                      </span>
                      <h4 className="text-xs font-black text-slate-900 mt-2 font-sans">
                        {vocab.meaning}
                      </h4>
                    </div>
                  </div>

                  {/* Footer: Toggle Difficulty & Remove Learned */}
                  <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Mức Độ Cực</span>
                      <div className="flex gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200/30">
                        <button
                          onClick={() => updateDifficulty(vocab.id, 'easy')}
                          title="Chuyển sang Dễ"
                          className={`w-6 h-6 flex items-center justify-center text-[10px] font-bold rounded-md transition-all ${
                            (customDifficulties[vocab.id] || (vocab.hskLevel === 1 ? 'easy' : '')) === 'easy'
                              ? 'bg-emerald-500 text-white font-medium shadow-xs'
                              : 'text-slate-400 hover:text-slate-600'
                          }`}
                        >
                          D
                        </button>
                        <button
                          onClick={() => updateDifficulty(vocab.id, 'medium')}
                          title="Chuyển sang Trung Bình"
                          className={`w-6 h-6 flex items-center justify-center text-[10px] font-bold rounded-md transition-all ${
                            (customDifficulties[vocab.id] || (vocab.hskLevel === 2 ? 'medium' : '')) === 'medium'
                              ? 'bg-amber-500 text-white font-medium shadow-xs'
                              : 'text-slate-400 hover:text-slate-600'
                          }`}
                        >
                          TB
                        </button>
                        <button
                          onClick={() => updateDifficulty(vocab.id, 'hard')}
                          title="Chuyển sang Khó"
                          className={`w-6 h-6 flex items-center justify-center text-[10px] font-bold rounded-md transition-all ${
                            (customDifficulties[vocab.id] || (vocab.hskLevel === 3 ? 'hard' : '')) === 'hard'
                              ? 'bg-rose-500 text-white font-medium shadow-xs'
                              : 'text-slate-400 hover:text-slate-600'
                          }`}
                        >
                          K
                        </button>
                      </div>
                    </div>

                    {/* Mark unlearned */}
                    <button
                      onClick={() => onToggleWordLearned?.(vocab.id)}
                      className="px-2.5 py-1.5 border border-slate-200 rounded-xl text-[10px] text-slate-400 hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-colors font-bold flex items-center gap-1 cursor-pointer"
                      title="Bỏ từ này"
                    >
                      Bỏ thuộc
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* --- 2. FLASHCARD MODE --- */}
      {sessionMode === 'flashcard' && activeList.length > 0 && (
        <div className="space-y-6 max-w-xl mx-auto">
          {/* Header Progress and Back button */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSessionMode('list')}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1 py-1"
            >
              <ChevronLeft className="w-4 h-4" /> Về Danh Sách
            </button>
            <span className="text-xs font-mono font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
              Thẻ Hán tự: {flashcardIndex + 1} / {activeList.length}
            </span>
          </div>

          {/* Interactive Flashcard with Smooth Roll/Flip */}
          <div className="space-y-4">
            <div 
              onClick={() => setIsCardFlipped(!isCardFlipped)}
              className={`w-full min-h-[220px] bg-white rounded-3xl border-2 p-6 flex flex-col items-center justify-center text-center cursor-pointer relative shadow-sm transition-all duration-300 transform select-none ${
                isCardFlipped 
                  ? 'border-indigo-100 bg-indigo-50/5' 
                  : 'border-slate-250 hover:shadow-md'
              }`}
            >
              <div className="absolute top-3 right-4.5 text-[9px] font-bold text-indigo-400 uppercase tracking-widest px-2 py-0.5 bg-indigo-50 rounded-full">
                Nhấp để lật mặt thẻ
              </div>

              {!isCardFlipped ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <span className="text-1.5xl select-none leading-none opacity-45">🎴</span>
                    <h2 className="text-7xl font-serif font-black text-slate-800 tracking-tight mt-3">
                      {activeList[flashcardIndex].word}
                    </h2>
                  </div>
                  <span className="text-xs font-bold text-slate-400 italic block">Lật thẻ xem ý nghĩa & cách viết</span>
                </div>
              ) : (
                <div className="space-y-3.5 w-full">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest block font-mono">Phiên âm & Nghĩa Việt</span>
                    <h3 className="text-2xl font-black text-slate-800 font-sans leading-none">
                      {activeList[flashcardIndex].meaning}
                    </h3>
                    <span className="text-lg font-bold text-indigo-600 font-mono tracking-wider uppercase">
                      / {activeList[flashcardIndex].pinyin} /
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-2xl text-left border border-slate-150/50">
                    <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">Câu chuyện ghi nhớ:</span>
                    <p className="text-xs text-slate-600 leading-relaxed font-sans font-medium mt-1">
                      {activeList[flashcardIndex].story}
                    </p>
                  </div>

                  {activeList[flashcardIndex].exampleSentence && (
                    <div className="p-3 bg-blue-50/40 rounded-2xl text-left border border-blue-100/30">
                      <span className="text-[10px] font-bold text-blue-400 tracking-wider uppercase block">Ví vụ hành văn:</span>
                      <p className="text-xs font-serif font-bold text-slate-800 mt-1">{activeList[flashcardIndex].exampleSentence}</p>
                      <p className="text-[10.5px] text-slate-400 font-mono leading-relaxed">{activeList[flashcardIndex].examplePinyin}</p>
                      <p className="text-xs text-slate-500 italic font-sans font-medium mt-0.5">{activeList[flashcardIndex].exampleMeaning}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* In-Card Writing Pad ("Ô kẻ mễ" visualizer integration) */}
            {isCardFlipped && (
              <div className="bg-white border border-slate-200/60 p-5 rounded-3xl shadow-xs space-y-3">
                <span className="text-xs font-bold text-slate-500 flex items-center gap-1 leading-none">
                  ✍️ Tập Viết & Thứ Tự Các Nét Vẽ Ô Kẻ Mễ
                </span>
                <StrokeOrderVisualizer text={activeList[flashcardIndex].word} />
              </div>
            )}

            {/* Navigation Card Triggers */}
            <div className="flex gap-3 justify-center pt-2">
              <button
                disabled={flashcardIndex === 0}
                onClick={() => {
                  setFlashcardIndex(prev => prev - 1);
                  setIsCardFlipped(false);
                }}
                className="px-5 py-2.5 border border-slate-200 text-slate-600 bg-white hover:bg-slate-50 rounded-xl text-xs font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" /> Trước
              </button>

              <button
                onClick={() => speakChinese(activeList[flashcardIndex].word)}
                className="px-4.5 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-600 font-bold text-xs"
              >
                🔊 Nghe Đọc
              </button>

              <button
                disabled={flashcardIndex === activeList.length - 1}
                onClick={() => {
                  setFlashcardIndex(prev => prev + 1);
                  setIsCardFlipped(false);
                }}
                className="px-5 py-2.5 bg-blue-650 hover:bg-blue-700 bg-blue-600 text-white rounded-xl text-xs font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
              >
                Kế Tiếp <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- 3. MCQ QUIZ MODE --- */}
      {sessionMode === 'quiz' && quizQuestions.length > 0 && (
        <div className="max-w-md mx-auto space-y-6">
          
          {/* Header Score and Back */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSessionMode('list')}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1 py-1"
            >
              <ChevronLeft className="w-4 h-4" /> Thoát Trắc Nghiệm
            </button>
            {!isQuizCompleted && (
              <span className="text-xs font-mono font-bold text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full">
                Câu hỏi: {quizCurrentIdx + 1} / {quizQuestions.length}
              </span>
            )}
          </div>

          {/* Active Quiz Card */}
          {!isQuizCompleted ? (
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              
              {/* Target Character display */}
              <div className="text-center space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-sans">
                  Nhận diện mặt chữ
                </span>
                <div className="text-7xl font-serif font-black text-slate-800 tracking-tight flex items-center justify-center gap-2.5 my-3">
                  {quizQuestions[quizCurrentIdx].word.word}
                  <button
                    onClick={() => speakChinese(quizQuestions[quizCurrentIdx].word.word)}
                    className="p-1.5 bg-slate-50 hover:bg-slate-100 rounded-full text-slate-500"
                    title="Nghe phát âm chuẩn"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-base font-bold text-slate-400 font-mono tracking-wider block uppercase leading-none">
                  / {quizQuestions[quizCurrentIdx].word.pinyin} /
                </span>
              </div>

              {/* Answer options */}
              <div className="space-y-2 pt-2">
                {quizQuestions[quizCurrentIdx].options.map((opt, oIdx) => {
                  const isSelected = selectedAnswerIdx === oIdx;
                  const isCorrect = oIdx === quizQuestions[quizCurrentIdx].correctIndex;
                  
                  let optStyle = 'border-slate-200 hover:bg-slate-50 text-slate-705';
                  if (selectedAnswerIdx !== null) {
                    if (isCorrect) {
                      optStyle = 'border-emerald-300 bg-emerald-500 text-emerald-800 font-semibold';
                    } else if (isSelected) {
                      optStyle = 'border-red-300 bg-red-50 text-red-700 font-semibold';
                    } else {
                      optStyle = 'border-slate-100 text-slate-350 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={oIdx}
                      disabled={selectedAnswerIdx !== null}
                      onClick={() => handleAnswerSubmit(oIdx)}
                      className={`w-full p-4 border-2 rounded-2xl text-xs font-bold transition-all text-left flex items-center justify-between cursor-pointer ${optStyle}`}
                    >
                      <span>{opt}</span>
                      {selectedAnswerIdx !== null && isCorrect && (
                        <span className="text-emerald-700 text-xs font-black">✓ Đúng</span>
                      )}
                      {selectedAnswerIdx !== null && isSelected && !isCorrect && (
                        <span className="text-red-700 text-xs font-black">✗ Sai</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Next Question Control */}
              {selectedAnswerIdx !== null && (
                <button
                  onClick={handleNextQuizQuestion}
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-bold shadow-md cursor-pointer transition-all active:scale-95 flex items-center justify-center gap-1.5"
                >
                  {quizCurrentIdx === quizQuestions.length - 1 ? 'Hoàn thành bài test' : 'Câu tiếp theo'}
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          ) : (
            /* Quiz Completed screen */
            <div className="bg-white p-6 rounded-3xl border border-slate-200 text-center space-y-6">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl font-extrabold animate-bounce">
                ✓
              </div>
              <div className="space-y-1.5">
                <h3 className="text-xl font-black text-slate-900 leading-none">Hoàn Thành Bài Kiểm Tra!</h3>
                <p className="text-xs text-slate-400 font-medium px-4 leading-normal">
                  Bạn đã xuất sắc hoàn thành trọn vẹn thử thách bài kiểm tra ở cấp độ <span className="font-bold text-slate-600">{activeTab === 'easy' ? 'Dễ' : activeTab === 'medium' ? 'Trung bình' : 'Khó'}</span>.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 inline-block w-full">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Điểm số đạt được</span>
                <span className="text-3xl font-bold font-mono text-indigo-600 block mt-1.5">
                  {quizScore} / {quizQuestions.length} câu chuẩn xác
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={generateQuiz}
                  className="flex-1 py-3 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-2xl text-xs font-bold transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" /> Làm lại test
                </button>
                <button
                  onClick={() => setSessionMode('list')}
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-bold transition-all active:scale-95 cursor-pointer"
                >
                  Về Trang Chủ
                </button>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
