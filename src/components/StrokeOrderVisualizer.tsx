import React, { useEffect, useRef, useState } from 'react';
// @ts-ignore
import HanziWriter from 'hanzi-writer';
import { Play, RotateCcw, PenTool, CheckCircle, Info, RefreshCw } from 'lucide-react';

interface StrokeOrderVisualizerProps {
  text: string; // Either a radical (e.g. "心") or a vocabulary word (e.g. "学习")
  className?: string;
}

export function StrokeOrderVisualizer({ text, className = '' }: StrokeOrderVisualizerProps) {
  // Clean text from variants like "心 / 忄"
  const cleanFullText = text.split('/')[0].trim();
  const characters = Array.from(cleanFullText).filter(char => {
    // Basic filter to ensure it's a Chinese character
    const code = char.charCodeAt(0);
    return code >= 0x4e00 && code <= 0x9fff;
  });

  const [activeCharIndex, setActiveCharIndex] = useState(0);
  const activeChar = characters[activeCharIndex] || '';

  const containerRef = useRef<HTMLDivElement>(null);
  const writerRef = useRef<any>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  const [quizScore, setQuizScore] = useState<{ total: number; mistakes: number } | null>(null);
  const [isQuizMode, setIsQuizMode] = useState(false);
  const [quizMessage, setQuizMessage] = useState<string>('Bạn hãy viết các nét theo đúng thứ tự!');

  // Initialize Hanzi Writer when the active character changes
  useEffect(() => {
    if (!activeChar || !containerRef.current) return;

    // Reset states
    setIsPlaying(false);
    setHasError(false);
    setIsLoading(true);
    setQuizScore(null);
    setIsQuizMode(false);
    setQuizMessage('Hãy viết các nét theo đúng thứ tự!');

    // Clear previous elements inside container
    containerRef.current.innerHTML = '';

    try {
      const writer = HanziWriter.create(containerRef.current, activeChar, {
        width: 180,
        height: 180,
        padding: 10,
        showOutline: true,
        strokeColor: '#1e293b', // Deep charcoal slate-800
        outlineColor: '#f1f5f9', // Slate-100
        drawingColor: '#2563eb', // Blue-600 for drawing
        highlightColor: '#10b981', // Emerald-500 for matching strokes
        strokeAnimationSpeed: 1.2,
        delayBetweenStrokes: 150,
      });

      setIsLoading(false);
      // Play introduction animation
      writer.animateCharacter();

      writerRef.current = writer;
    } catch (e) {
      console.error('Failed to create HanziWriter:', e);
      setIsLoading(false);
      setHasError(true);
    }

    // Cleanup
    return () => {
      if (writerRef.current) {
        if (typeof writerRef.current.pauseAnimation === 'function') {
          writerRef.current.pauseAnimation();
        }
        if (typeof writerRef.current.cancelQuiz === 'function') {
          writerRef.current.cancelQuiz();
        }
        writerRef.current = null;
      }
    };
  }, [activeChar]);

  const handleAnimate = () => {
    if (!writerRef.current || isLoading || hasError) return;
    
    // Quit quiz mode if active
    if (isQuizMode) {
      setIsQuizMode(false);
      writerRef.current.cancelQuiz();
      setQuizScore(null);
    }

    setIsPlaying(true);
    writerRef.current.animateCharacter({
      onComplete: () => {
        setIsPlaying(false);
      }
    });
  };

  const handleReset = () => {
    if (!writerRef.current) return;
    if (typeof writerRef.current.pauseAnimation === 'function') {
      writerRef.current.pauseAnimation();
    }
    
    if (isQuizMode) {
      startQuiz();
    } else {
      setIsPlaying(false);
      writerRef.current.showCharacter();
    }
  };

  const startQuiz = () => {
    if (!writerRef.current) return;
    setIsQuizMode(true);
    setIsPlaying(false);
    setQuizScore(null);
    setQuizMessage('Hãy viết nét tiếp theo nào!');

    writerRef.current.quiz({
      onMistake: (strokeData: any) => {
        setQuizMessage(`Sai nét rồi! Hãy thử lại nét đó xem nào (Mistake #${strokeData.mistakesOnStroke + 1})`);
      },
      onCorrectStroke: (strokeData: any) => {
        setQuizMessage(`Chính xác! Nét thứ ${strokeData.strokeNum + 1}/${strokeData.totalStrokes}`);
      },
      onComplete: (summary: any) => {
        setQuizScore({
          total: summary.totalStrokes,
          mistakes: summary.mistakes
        });
        setQuizMessage('Tuyệt vời! Bạn đã hoàn thành bài tập viết này!');
      }
    });
  };

  if (characters.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 border border-dashed border-slate-200 rounded-xl bg-slate-50 text-slate-400 text-sm">
        <Info className="w-8 h-8 mb-2 text-slate-300" />
        Không có dữ liệu chữ Hán để tập viết
      </div>
    );
  }

  return (
    <div className={`p-4 bg-slate-50/60 rounded-2xl border border-slate-100/80 shadow-inner flex flex-col items-center ${className}`}>
      
      {/* Tab Selectors for Multiple Characters */}
      {characters.length > 1 && (
        <div className="flex gap-1.5 mb-3.5 bg-slate-200/50 p-1 rounded-full w-full justify-center">
          {characters.map((char, index) => (
            <button
              key={index}
              onClick={() => setActiveCharIndex(index)}
              className={`px-3 py-1 text-xs font-bold font-serif rounded-full transition-all flex items-center gap-1 ${
                activeCharIndex === index
                  ? 'bg-white text-slate-800 shadow-sm font-medium'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Chữ <span className="text-sm">{char}</span>
            </button>
          ))}
        </div>
      )}

      {/* Main Grid Card Canvas */}
      <div className="relative w-48 h-48 bg-white border-2 border-red-200 rounded-2xl shadow-sm flex items-center justify-center overflow-hidden">
        
        {/* Calligraphy Red Rice Grid Background "Ô kẻ mễ" (米字格) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
          {/* Inner border */}
          <rect x="1" y="1" width="98" height="98" fill="none" stroke="#fecaca" strokeWidth="1" strokeDasharray="1,1" />
          {/* Calligraphy Cross Lines */}
          <line x1="0" y1="50" x2="100" y2="50" stroke="#fee2e2" strokeWidth="0.75" strokeDasharray="3,3" />
          <line x1="50" y1="0" x2="50" y2="100" stroke="#fee2e2" strokeWidth="0.75" strokeDasharray="3,3" />
          {/* Diagonals */}
          <line x1="0" y1="0" x2="100" y2="100" stroke="#fca5a5" strokeWidth="0.5" strokeDasharray="4,4" opacity="0.4" />
          <line x1="100" y1="0" x2="0" y2="100" stroke="#fca5a5" strokeWidth="0.5" strokeDasharray="4,4" opacity="0.4" />
        </svg>

        {/* HanziWriter Container */}
        <div ref={containerRef} className="z-10 w-[180px] h-[180px]" />

        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-0 bg-white/95 z-20 flex flex-col items-center justify-center gap-2">
            <RefreshCw className="w-6 h-6 animate-spin text-red-400" />
            <span className="text-[11px] text-slate-400 font-medium">Đang tải nét vẽ...</span>
          </div>
        )}

        {/* Error Fallback */}
        {hasError && (
          <div className="absolute inset-0 bg-white/95 z-20 flex flex-col items-center justify-center p-4 text-center">
            <span className="text-3xl mb-1 text-slate-600 font-serif font-bold">{activeChar}</span>
            <span className="text-[11px] text-red-500 font-bold">Không thể tải thứ tự nét</span>
            <button 
              onClick={() => setActiveCharIndex(activeCharIndex)}
              className="mt-2 text-[10px] px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors font-semibold"
            >
              Thử lại
            </button>
          </div>
        )}
      </div>

      {/* Controller Buttons */}
      <div className="flex gap-2 mt-4 w-full">
        <button
          onClick={handleAnimate}
          disabled={isLoading || hasError}
          className={`flex-1 py-2 px-3 border rounded-xl flex items-center justify-center gap-1.5 transition-all text-xs font-bold leading-none ${
            isPlaying 
              ? 'bg-blue-50 border-blue-200 text-blue-600 animate-pulse'
              : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700 active:scale-95'
          }`}
        >
          <Play className={`w-3.5 h-3.5 ${isPlaying ? 'fill-blue-500 text-blue-500' : ''}`} />
          Viết mẫu
        </button>

        <button
          onClick={isQuizMode ? handleReset : startQuiz}
          disabled={isLoading || hasError}
          className={`flex-1 py-2 px-3 border rounded-xl flex items-center justify-center gap-1.5 transition-all text-xs font-bold leading-none ${
            isQuizMode
              ? 'bg-emerald-50 border-emerald-200 text-emerald-600'
              : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700 active:scale-95'
          }`}
        >
          <PenTool className="w-3.5 h-3.5" />
          {isQuizMode ? 'Làm lại' : 'Tự luyện nét'}
        </button>

        <button
          onClick={handleReset}
          disabled={isLoading || hasError}
          className="border border-slate-200 text-slate-400 bg-white hover:bg-slate-50 p-2 rounded-xl transition-all active:scale-95"
          title="Xóa trắng"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Guide/Result Box */}
      <div className="mt-2.5 w-full text-center px-1 text-[10.5px] leading-relaxed text-slate-400 font-semibold h-9 flex items-center justify-center bg-white/40 rounded-lg border border-slate-100">
        {isQuizMode ? (
          quizScore ? (
            <span className="text-emerald-600 flex items-center gap-1 justify-center">
              <CheckCircle className="w-3.5 h-3.5" /> Hoàn thành! Lỗi: {quizScore.mistakes} nét.
            </span>
          ) : (
            <span className="text-blue-600 animate-pulse">{quizMessage}</span>
          )
        ) : (
          <span className="text-slate-500">Mã chữ chuẩn Hán Việt • Ô kẻ mễ luyện thư pháp</span>
        )}
      </div>
    </div>
  );
}
