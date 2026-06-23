import React, { useState, useEffect } from 'react';
import { Sparkles, Loader2, Volume2 } from 'lucide-react';
import { speakChineseText } from '../utils/speech';

interface AIAnalysisPanelProps {
  word: string;
  onAnalysisComplete?: (data: any) => void;
}

const CACHE_KEY = 'hanzi_ai_analysis_cache';

export function AIAnalysisPanel({ word, onAnalysisComplete }: AIAnalysisPanelProps) {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<{ 
    radicals: string[], 
    story: string, 
    exampleSentence?: string, 
    examplePinyin?: string, 
    exampleMeaning?: string 
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check cache when word changes
    setError(null);
    try {
      const cache = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
      if (cache[word]) {
        setAnalysis(cache[word]);
        if (onAnalysisComplete) onAnalysisComplete(cache[word]);
      } else {
        setAnalysis(null);
      }
    } catch (e) {
      setAnalysis(null);
    }
  }, [word]);

  const analyzeWord = async () => {
    setLoading(true);
    setError(null);
    try {
      const customApiKey = localStorage.getItem('settings_gemini_api_key') || '';
      
      const response = await fetch('/api/gemini/analyze', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          ...(customApiKey && { 'x-gemini-api-key': customApiKey })
        },
        body: JSON.stringify({ word }),
      });
      
      let data;
      const textResponse = await response.text();
      try {
        data = JSON.parse(textResponse);
      } catch(e) {
        throw new Error(response.status === 502 || response.status === 503 || response.status === 504 ? 'Máy chủ quá tải (503)' : `Lỗi hệ thống: ${response.status}`);
      }

      if (!response.ok) {
        throw new Error(data.error || 'Lỗi kết nối AI');
      }
      
      setAnalysis(data);
      if (onAnalysisComplete) onAnalysisComplete(data);
      
      // Save to cache
      try {
        const cache = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
        cache[word] = data;
        if (data.actualWord) {
          cache[data.actualWord] = data;
        }
        localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
      } catch (e) {
        console.error('Failed to save AI analysis to cache', e);
      }
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50/50 rounded-2xl border border-indigo-100 p-4 space-y-3 mt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-indigo-700">
          <Sparkles className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-widest">Phân tích AI thông minh</span>
        </div>
        {!analysis && !loading && (
          <button 
            onClick={analyzeWord}
            className="text-[10px] bg-indigo-100 text-indigo-700 hover:bg-indigo-200 px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer"
          >
            Tạo phân tích AI
          </button>
        )}
      </div>

      {loading && (
        <div className="flex items-center space-x-2 text-slate-500 text-xs py-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Gemini đang phân tích bộ thủ và sáng tạo câu chuyện...</span>
        </div>
      )}

      {error && (
        <div className="text-xs text-red-500 bg-red-50 p-2 rounded-lg">
          {error}
        </div>
      )}

      {analysis && (
        <div className="space-y-4 pt-2">
          <div className="space-y-2">
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Bộ thủ cấu thành</span>
             <div className="flex flex-wrap gap-2">
                {analysis.radicals && analysis.radicals.map((rad, idx) => (
                  <span key={idx} className="bg-white border border-indigo-100 text-indigo-700 text-xs px-2.5 py-1 rounded-lg font-medium shadow-sm">
                    {rad}
                  </span>
                ))}
             </div>
          </div>
          <div className="space-y-1 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Câu chuyện dệt chữ</span>
             <p className="text-sm text-slate-700 leading-relaxed font-medium">
               {analysis.story}
             </p>
          </div>
          {analysis.exampleSentence && (
            <div className="space-y-2 bg-white p-3 rounded-xl border border-slate-100 shadow-sm mt-3">
              <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Cú pháp ví dụ đàm thoại</span>
                <button
                  onClick={() => speakChineseText(analysis.exampleSentence!)}
                  className="p-1 px-2.5 bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 hover:bg-slate-100 transition-colors flex items-center space-x-1 cursor-pointer"
                  title="Nghe giọng nói đàm thoại"
                >
                  <Volume2 className="w-3 h-3" />
                  <span>Nghe</span>
                </button>
              </div>
              <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                {analysis.exampleSentence}
              </p>
              {analysis.examplePinyin && (
                <p className="text-xs text-indigo-600 font-mono font-bold tracking-wide">
                  {analysis.examplePinyin}
                </p>
              )}
              {analysis.exampleMeaning && (
                <p className="text-xs text-slate-600 italic">
                  {analysis.exampleMeaning}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
