import React, { useState, useEffect, useMemo } from 'react';
import { Vocabulary, SrsItem } from '../types';
import { StrokeOrderVisualizer } from './StrokeOrderVisualizer';
import { calculateSrs } from '../lib/srs';
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
  BookMarked,
  Sparkles,
  Smile,
  Frown,
  Meh,
  Brain,
  Timer,
  Calendar,
  Layers3,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

interface VocabularyReviewProps {
  learnedWordIds: string[];
  allVocabularies: Vocabulary[];
  onToggleWordLearned?: (wordId: string) => void;
  srsVocabulary?: Record<string, SrsItem>;
  onUpdateSrs: (word: string, grade: 1 | 2 | 3 | 4) => void;
}

export function VocabularyReview({ 
  learnedWordIds, 
  allVocabularies, 
  onToggleWordLearned,
  srsVocabulary = {},
  onUpdateSrs
}: VocabularyReviewProps) {
  
  // Speak Chinese pronunciation helper using Web Speech API
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

  const todayStr = new Date().toISOString().split('T')[0];

  // Default seed words in case user has no learned words yet
  const fallbackSeeds = useMemo(() => {
    return allVocabularies.slice(0, 20);
  }, [allVocabularies]);

  // Combine learned words and fallback seeds
  const reviewPool = useMemo(() => {
    const learnedSet = new Set(learnedWordIds);
    const combined = allVocabularies.filter(v => learnedSet.has(v.id) || learnedSet.has(v.word));
    
    // If empty or very small, blend in seed words to make it immediately usable so the user can test the SRS
    if (combined.length < 5) {
      const addedWords = new Set(combined.map(c => c.word));
      fallbackSeeds.forEach(seed => {
        if (!addedWords.has(seed.word) && addedWords.size < 15) {
          combined.push(seed);
          addedWords.add(seed.word);
        }
      });
    }
    return combined;
  }, [learnedWordIds, allVocabularies, fallbackSeeds]);

  // Distribute vocabularies based on SRS Spaced Repetition status
  const srsBinnedVocabularies = useMemo(() => {
    const due: Vocabulary[] = [];
    const learning: Vocabulary[] = [];
    const scheduled: Vocabulary[] = [];

    reviewPool.forEach(vocab => {
      const srsInfo = srsVocabulary[vocab.word];
      if (!srsInfo) {
        // Words without SRS data are ready to learn
        due.push(vocab);
      } else {
        const isDue = srsInfo.nextReviewDate <= todayStr;
        if (isDue) {
          due.push(vocab);
        } else {
          scheduled.push(vocab);
        }
      }
    });

    return { due, scheduled, all: reviewPool };
  }, [reviewPool, srsVocabulary, todayStr]);

  const [activeTab, setActiveTab] = useState<'due' | 'scheduled' | 'all'>('due');
  const activeList = srsBinnedVocabularies[activeTab];

  // Review states
  const [sessionMode, setSessionMode] = useState<'list' | 'flashcard' | 'quiz'>('list');
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  // Quiz state
  const [quizQuestions, setQuizQuestions] = useState<{
    word: Vocabulary;
    options: string[];
    correctIndex: number;
  }[]>([]);
  const [quizCurrentIdx, setQuizCurrentIdx] = useState(0);
  const [selectedAnswerIdx, setSelectedAnswerIdx] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  // Reset states on mode transition
  useEffect(() => {
    setFlashcardIndex(0);
    setIsCardFlipped(false);
  }, [activeTab, sessionMode]);

  // Construct SRS MCQ Quiz from Due or All lists
  const generateQuiz = () => {
    const sourcePool = activeList.length > 0 ? activeList : srsBinnedVocabularies.all;
    if (sourcePool.length === 0) return;
    
    const shuffle = <T,>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);
    
    const questions = sourcePool.map(item => {
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
    const correctGoal = quizQuestions[quizCurrentIdx].correctIndex;
    const isCorrect = idx === correctGoal;
    
    if (isCorrect) {
      setQuizScore(prev => prev + 1);
      // Automatically register a correct answer in SRS as memory grade 3 (Good)
      onUpdateSrs(quizQuestions[quizCurrentIdx].word.word, 3);
    } else {
      // Register incorrect answer as memory grade 1 (Again / Forget)
      onUpdateSrs(quizQuestions[quizCurrentIdx].word.word, 1);
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

  // Human descriptive text helper for next review dates
  const getSrsStatusText = (word: string) => {
    const srsInfo = srsVocabulary[word];
    if (!srsInfo) return { label: 'Từ Mới (New)', style: 'bg-indigo-50 text-indigo-700 border-indigo-100' };
    
    if (srsInfo.nextReviewDate <= todayStr) {
      return { label: 'Cần ôn ngay 🚨', style: 'bg-rose-50 text-rose-700 border-rose-100 animate-pulse' };
    }
    
    // Calculate days remaining
    const nextR = new Date(srsInfo.nextReviewDate);
    const today = new Date(todayStr);
    const diff = Math.ceil((nextR.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    return { 
      label: `Hẹn ôn sau ${diff} ngày nữa 🗓️`, 
      style: 'bg-emerald-50 text-emerald-700 border-emerald-100' 
    };
  };

  return (
    <div className="bg-slate-50/50 rounded-3xl border border-slate-200/60 p-5 md:p-6 space-y-6 text-left">
      
      {/* Visual Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200/50">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-100 text-indigo-700 rounded-xl">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-800 font-sans tracking-tight">Ôn Tập Lặp Lại Ngắt Quãng</h2>
              <p className="text-xs text-slate-500 font-medium font-sans">Thuật toán bộ nhớ SM-2 tối ưu hóa giúp bạn học ít hơn, nhớ lâu hơn 10 lần!</p>
            </div>
          </div>
        </div>

        {sessionMode === 'list' && (
          <div className="flex bg-slate-200/60 p-1 rounded-2xl border border-slate-200/40 shrink-0 self-start md:self-auto">
            <button
              onClick={() => setActiveTab('due')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'due'
                  ? 'bg-white text-rose-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              <Timer className="w-3.5 h-3.5" />
              Đến hẹn ({srsBinnedVocabularies.due.length})
            </button>
            <button
              onClick={() => setActiveTab('scheduled')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'scheduled'
                  ? 'bg-white text-emerald-650 text-emerald-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              Chờ giãn cách ({srsBinnedVocabularies.scheduled.length})
            </button>
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              <Layers3 className="w-3.5 h-3.5" />
              Tổng ({srsBinnedVocabularies.all.length})
            </button>
          </div>
        )}
      </div>

      {/* --- 1. DEFAULT INDEX LIST --- */}
      {sessionMode === 'list' && (
        <div className="space-y-6">
          {/* Quick Actions Panel */}
          {activeList.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <button
                onClick={() => setSessionMode('flashcard')}
                className="p-4 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl flex items-center justify-between shadow-md hover:shadow-lg transition-all active:scale-[0.98] text-left cursor-pointer"
              >
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-blue-200 uppercase tracking-widest block">Giao diện Phản xạ</span>
                  <h4 className="text-sm font-extrabold mt-1">Luyện Trí Nhớ Flashcard</h4>
                  <p className="text-[11px] text-blue-100/95 leading-normal mt-1">
                    Đánh giá khách quan mức độ ghi nhớ để thuật toán xếp lịch ôn tập tối ưu ngày gặp lại.
                  </p>
                </div>
                <div className="w-11 h-11 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 ml-3 shadow-inner">
                  <BookMarked className="w-5 h-5" />
                </div>
              </button>

              <button
                onClick={generateQuiz}
                className="p-4 bg-gradient-to-br from-emerald-500 to-teal-650 bg-teal-600 text-white rounded-2xl flex items-center justify-between shadow-md hover:shadow-lg transition-all active:scale-[0.98] text-left cursor-pointer"
              >
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-emerald-100 uppercase tracking-widest block">Giao diện Thử thách</span>
                  <h4 className="text-sm font-extrabold mt-1">Trắc Nghiệm Hán Tự</h4>
                  <p className="text-[11px] text-emerald-500/10 text-emerald-100/95 leading-normal mt-1">
                    Trò chơi kiểm chứng nhận diện ý nghĩa. Đúng thăng cấp, sai tự động đưa lại danh sách ôn tủ.
                  </p>
                </div>
                <div className="w-11 h-11 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 ml-3 shadow-inner">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
              </button>
            </div>
          )}

          {activeList.length === 0 ? (
            <div className="text-center py-14 bg-white rounded-2xl border border-slate-200/50 flex flex-col items-center">
              <Smile className="w-14 h-14 text-indigo-300 animate-bounce mb-3" />
              <h3 className="text-base font-extrabold text-slate-700">Tuyệt vời! Không còn từ cần ôn tập.</h3>
              <p className="text-xs text-slate-400 max-w-sm mt-1 leading-relaxed">
                {activeTab === 'due' 
                  ? 'Hôm nay bạn đã ôn tập đầy đủ tất cả các từ đến hạn ngắt quãng rồi đó! Hãy tăng tốc học thêm từ mới ở Lộ trình HSK.' 
                  : 'Chưa có từ nào xếp lịch chờ dãn ngày ôn tập! Hãy bắt đầu ôn tập/thực hành thẻ Flashcard trước.'}
              </p>
              {activeTab === 'due' && srsBinnedVocabularies.all.length > 0 && (
                <button
                  onClick={() => setActiveTab('all')}
                  className="mt-4 px-4 py-2 bg-indigo-50 border border-indigo-100 text-indigo-700 hover:bg-indigo-100 text-xs font-bold rounded-xl transition-all"
                >
                  Duyệt Xem Tất Cả Chờ Giãn
                </button>
              )}
            </div>
          ) : (
            /* Vocabulary SRS grid lists */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeList.map((vocab, idx) => {
                const srsStatus = getSrsStatusText(vocab.word);
                const isLearned = learnedWordIds.includes(vocab.id) || learnedWordIds.includes(vocab.word);
                return (
                  <div 
                    key={vocab.id || idx}
                    className="bg-white p-4.5 rounded-2xl border border-slate-200/60 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                  >
                    <div>
                      {/* Top status */}
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${srsStatus.style}`}>
                          {srsStatus.label}
                        </span>
                        
                        <button 
                          onClick={(e) => speakChinese(vocab.word, e)}
                          className="p-1.5 bg-slate-50 hover:bg-slate-100 active:bg-slate-250 text-slate-500 rounded-full transition-colors flex items-center justify-center cursor-pointer"
                          title="Phát âm tiếng Trung"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Hanzi central display */}
                      <div className="text-center py-2.5 space-y-1">
                        <span className="text-4xl font-serif font-black text-slate-800 block tracking-tight">
                          {vocab.word}
                        </span>
                        <span className="text-xs font-extrabold text-blue-600 font-mono tracking-wider uppercase block">
                          {vocab.pinyin}
                        </span>
                        <h4 className="text-xs font-bold text-slate-800 leading-normal font-sans pt-1">
                          {vocab.meaning}
                        </h4>
                      </div>

                      {/* Display SRS technical metadata like ease and repetition intervals */}
                      {srsVocabulary[vocab.word] && (
                        <div className="px-3 py-2 bg-slate-50 border border-slate-150 rounded-xl flex items-center justify-between text-[10px] font-semibold text-slate-500 font-mono">
                          <span>Lặp: {srsVocabulary[vocab.word].repetitions} lần</span>
                          <span>Hệ số E: {srsVocabulary[vocab.word].easeFactor}x</span>
                          <span className="text-[9px] uppercase font-bold text-slate-400">Cách: {srsVocabulary[vocab.word].interval}d</span>
                        </div>
                      )}
                    </div>

                    {/* Bottom buttons panel */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">HSK {vocab.hskLevel}</span>
                      
                      <div className="flex items-center space-x-2">
                        {onToggleWordLearned && isLearned && (
                          <button
                            onClick={() => onToggleWordLearned(vocab.id)}
                            className="px-2.5 py-1.5 border border-slate-150 rounded-lg text-[10px] text-slate-400 hover:text-red-500 hover:bg-red-50 hover:border-red-100 transition-all font-bold"
                            title="Xóa đánh dấu đã học"
                          >
                            Bỏ thuộc
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* --- 2. FLASHCARD MODE IN SRS --- */}
      {sessionMode === 'flashcard' && activeList.length > 0 && (
        <div className="space-y-6 max-w-xl mx-auto">
          {/* Header controls */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSessionMode('list')}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1 py-1 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> Về Danh Sách
            </button>
            <span className="text-xs font-mono font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
              Từ ôn tập: {flashcardIndex + 1} / {activeList.length}
            </span>
          </div>

          <div className="space-y-4">
            {/* Interactive Flashcard widget */}
            <div 
              onClick={() => setIsCardFlipped(!isCardFlipped)}
              className={`w-full min-h-[220px] bg-white rounded-3xl border-2 p-6 flex flex-col items-center justify-center text-center cursor-pointer relative shadow-sm transition-all duration-300 select-none ${
                isCardFlipped 
                  ? 'border-indigo-150 bg-slate-50/10' 
                  : 'border-slate-200 hover:shadow-md'
              }`}
            >
              <div className="absolute top-2.5 right-4 text-[9px] font-bold text-indigo-400 uppercase tracking-widest px-2 py-0.5 bg-indigo-50 rounded-full">
                Nhấp để lật thẻ xem nghĩa
              </div>

              {!isCardFlipped ? (
                <div className="space-y-3">
                  <span className="text-2xl select-none leading-none opacity-40">🎴</span>
                  <h2 className="text-7xl font-serif font-black text-slate-800 tracking-tight">
                    {activeList[flashcardIndex].word}
                  </h2>
                  <span className="text-xs font-bold text-slate-400 italic block pt-1">Nhấp lật thẻ để đánh giá độ thuộc nhằm xếp lịch</span>
                </div>
              ) : (
                <div className="space-y-4 w-full">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest block font-mono">Phiên âm & Nghĩa Việt</span>
                    <h3 className="text-2xl font-black text-slate-900 font-sans leading-tight">
                      {activeList[flashcardIndex].meaning}
                    </h3>
                    <span className="text-lg font-bold text-indigo-600 font-mono tracking-wider uppercase">
                      / {activeList[flashcardIndex].pinyin} /
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-2xl text-left border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">Câu chuyện liên tưởng:</span>
                    <p className="text-xs text-slate-600 leading-relaxed font-sans font-medium mt-1">
                      {activeList[flashcardIndex].story}
                    </p>
                  </div>

                  {activeList[flashcardIndex].exampleSentence && (
                    <div className="p-3 bg-blue-50/40 rounded-2xl text-left border border-blue-100/30">
                      <span className="text-[9px] font-bold text-blue-400 tracking-wider uppercase block">Ví dụ thực tế:</span>
                      <p className="text-xs font-serif font-bold text-slate-800 mt-1">{activeList[flashcardIndex].exampleSentence}</p>
                      <p className="text-[10px] text-indigo-650 text-indigo-500 font-mono">{activeList[flashcardIndex].examplePinyin}</p>
                      <p className="text-[11px] text-slate-500 italic mt-0.5">Nghĩa Việt: {activeList[flashcardIndex].exampleMeaning}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* If card is flipped, show spacing rating selectors! */}
            {isCardFlipped && (
              <div className="p-4 bg-slate-100/50 border border-slate-200 rounded-3xl space-y-3.5 text-center">
                <span className="text-xs font-extrabold text-slate-600 uppercase tracking-wider block flex items-center justify-center gap-1">
                  <Brain className="w-3.5 h-3.5 text-indigo-600" />
                  Bạn tự chấm nhớ từ này ở mức nào?
                </span>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onUpdateSrs(activeList[flashcardIndex].word, 1);
                      setIsCardFlipped(false);
                      if (flashcardIndex === activeList.length - 1) {
                        setSessionMode('list');
                      } else {
                        setFlashcardIndex(prev => prev + 1);
                      }
                    }}
                    className="p-2.5 bg-red-100/60 hover:bg-red-100 border border-red-200 text-red-700 font-bold rounded-xl text-xs flex flex-col items-center gap-0.5 transition-all text-center cursor-pointer active:scale-95"
                  >
                    <span className="text-[10px] uppercase font-mono tracking-wider opacity-60">Again</span>
                    <span>Quên / Rất Khó</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onUpdateSrs(activeList[flashcardIndex].word, 2);
                      setIsCardFlipped(false);
                      if (flashcardIndex === activeList.length - 1) {
                        setSessionMode('list');
                      } else {
                        setFlashcardIndex(prev => prev + 1);
                      }
                    }}
                    className="p-2.5 bg-amber-100/70 hover:bg-amber-100 border border-amber-200 text-amber-700 font-bold rounded-xl text-xs flex flex-col items-center gap-0.5 transition-all text-center cursor-pointer active:scale-95"
                  >
                    <span className="text-[10px] uppercase font-mono tracking-wider opacity-60">Hard</span>
                    <span>Khó khăn</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onUpdateSrs(activeList[flashcardIndex].word, 3);
                      setIsCardFlipped(false);
                      if (flashcardIndex === activeList.length - 1) {
                        setSessionMode('list');
                      } else {
                        setFlashcardIndex(prev => prev + 1);
                      }
                    }}
                    className="p-2.5 bg-blue-100/60 hover:bg-blue-100 border border-blue-200 text-blue-700 font-bold rounded-xl text-xs flex flex-col items-center gap-0.5 transition-all text-center cursor-pointer active:scale-95"
                  >
                    <span className="text-[10px] uppercase font-mono tracking-wider opacity-60">Good</span>
                    <span>Nhớ tốt</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onUpdateSrs(activeList[flashcardIndex].word, 4);
                      setIsCardFlipped(false);
                      if (flashcardIndex === activeList.length - 1) {
                        setSessionMode('list');
                      } else {
                        setFlashcardIndex(prev => prev + 1);
                      }
                    }}
                    className="p-2.5 bg-emerald-100/80 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 font-bold rounded-xl text-xs flex flex-col items-center gap-0.5 transition-all text-center cursor-pointer active:scale-95"
                  >
                    <span className="text-[10px] uppercase font-mono tracking-wider opacity-60">Easy</span>
                    <span>Khắc Sâu</span>
                  </button>
                </div>
              </div>
            )}

            {/* Grid writer for flipped */}
            {isCardFlipped && (
              <div className="bg-white border border-slate-200/65 p-4 rounded-3xl shadow-xs space-y-3">
                <span className="text-xs font-bold text-slate-500 flex items-center gap-1 mb-1">
                  ✍️ Tập Viết Đúng Thứ Tự Các Nét Vẽ Ô Kẻ Mễ
                </span>
                <StrokeOrderVisualizer text={activeList[flashcardIndex].word} />
              </div>
            )}

            {/* Controls panel */}
            <div className="flex gap-3 justify-center pt-2">
              <button
                disabled={flashcardIndex === 0}
                onClick={() => {
                  setFlashcardIndex(prev => prev - 1);
                  setIsCardFlipped(false);
                }}
                className="px-5 py-2.5 border border-slate-200 text-slate-600 bg-white hover:bg-slate-50 rounded-xl text-xs font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" /> Lùi
              </button>

              <button
                onClick={() => speakChinese(activeList[flashcardIndex].word)}
                className="px-4.5 py-2.5 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 rounded-xl text-slate-600 font-bold text-xs cursor-pointer"
              >
                🔊 Nghe Chuẩn
              </button>

              <button
                disabled={flashcardIndex === activeList.length - 1}
                onClick={() => {
                  setFlashcardIndex(prev => prev + 1);
                  setIsCardFlipped(false);
                }}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
              >
                Kế tiếp <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- 3. MCQ QUIZ GAME --- */}
      {sessionMode === 'quiz' && quizQuestions.length > 0 && (
        <div className="max-w-md mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSessionMode('list')}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1 py-1 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> Thoát Trắc Nghiệm
            </button>
            {!isQuizCompleted && (
              <span className="text-xs font-mono font-bold text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                Câu hỏi: {quizCurrentIdx + 1} / {quizQuestions.length}
              </span>
            )}
          </div>

          {!isQuizCompleted ? (
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6 text-center">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Nhận diện mặt chữ</span>
                
                <div className="text-7xl font-serif font-black text-slate-800 tracking-tight flex items-center justify-center gap-2.5 my-3">
                  {quizQuestions[quizCurrentIdx].word.word}
                  <button
                    onClick={() => speakChinese(quizQuestions[quizCurrentIdx].word.word)}
                    className="p-1.5 bg-slate-50 hover:bg-slate-100 text-slate-500 rounded-full cursor-pointer flex items-center justify-center"
                    title="Nghe chuẩn phát âm"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                
                <span className="text-base font-bold text-indigo-600 font-mono tracking-wider block uppercase">
                  / {quizQuestions[quizCurrentIdx].word.pinyin} /
                </span>
              </div>

              {/* Distractor option buttons */}
              <div className="space-y-2 pt-2">
                {quizQuestions[quizCurrentIdx].options.map((opt, oIdx) => {
                  const isSelected = selectedAnswerIdx === oIdx;
                  const isCorrect = oIdx === quizQuestions[quizCurrentIdx].correctIndex;
                  
                  let optStyle = 'border-slate-200 hover:bg-slate-50 text-slate-700';
                  if (selectedAnswerIdx !== null) {
                    if (isCorrect) {
                      optStyle = 'border-emerald-300 bg-emerald-50 text-emerald-800 font-semibold';
                    } else if (isSelected) {
                      optStyle = 'border-red-300 bg-red-50 text-red-700 font-semibold';
                    } else {
                      optStyle = 'border-slate-100 text-slate-400 opacity-50';
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
                        <span className="text-emerald-700 text-xs font-bold">✓ Đúng</span>
                      )}
                      {selectedAnswerIdx !== null && isSelected && !isCorrect && (
                        <span className="text-red-700 text-xs font-bold">✗ Sai (Sẽ ôn lại sớm)</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Next Question buttons */}
              {selectedAnswerIdx !== null && (
                <button
                  onClick={handleNextQuizQuestion}
                  className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-xs font-bold shadow-md cursor-pointer transition-all active:scale-95 flex items-center justify-center gap-1.5"
                >
                  {quizCurrentIdx === quizQuestions.length - 1 ? 'Hoàn thành bài test' : 'Câu tiếp theo'}
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          ) : (
            /* Finished quiz */
            <div className="bg-white p-6 rounded-3xl border border-slate-200 text-center space-y-6">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl font-extrabold animate-bounce">
                ✓
              </div>
              <div className="space-y-1.5">
                <h3 className="text-xl font-black text-slate-900 leading-none">Hoàn Thành Trắc Nghiệm!</h3>
                <p className="text-xs text-slate-400 font-medium px-4 leading-normal">
                  Bạn đã kiểm chứng mức độ thuộc của của từ vựng lặp lại ngắt quãng. Tiến trình bộ nhớ đã được lưu!
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 inline-block w-full">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Điểm số khả quan</span>
                <span className="text-3xl font-bold font-mono text-indigo-600 block mt-1.5">
                  {quizScore} / {quizQuestions.length} câu đắc địa
                </span>
              </div>

              <div className="flex gap-2.5">
                <button
                  onClick={generateQuiz}
                  className="flex-1 py-3 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-2xl text-xs font-bold transition-all active:scale-95 select-none cursor-pointer flex items-center justify-center gap-1"
                >
                  <RotateCcw className="w-4 h-4" /> Làm lại test
                </button>
                <button
                  onClick={() => setSessionMode('list')}
                  className="flex-1 py-3 bg-indigo-650 bg-indigo-600 hover:bg-slate-700 text-white rounded-2xl text-xs font-bold transition-all active:scale-95 select-none cursor-pointer"
                >
                  Xong
                </button>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
