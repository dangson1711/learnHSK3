import React, { useState, useEffect } from "react";
import { Sparkles, Loader2, Volume2, Database } from "lucide-react";
import { speakChineseText } from "../utils/speech";
import { db } from "../lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { findRadicalByChar } from "../utils/radicals";

interface AIAnalysisPanelProps {
  word: string;
  onAnalysisComplete?: (data: any) => void;
  onRadicalClick?: (radicalChar: string) => void;
}

const CACHE_KEY = "hanzi_ai_analysis_cache";

export function AIAnalysisPanel({
  word,
  onAnalysisComplete,
  onRadicalClick
}: AIAnalysisPanelProps) {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<{
    radicals: string[];
    story: string;
    actualWord?: string;
    exampleSentence?: string;
    examplePinyin?: string;
    exampleMeaning?: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const cache = JSON.parse(localStorage.getItem(CACHE_KEY) || "{}");
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

  const loadFromDatabase = async () => {
    setLoading(true);
    setError(null);
    try {
      const safeWord = word.trim().replace(/\//g, '-');
      const docRef = doc(db, "vocabularies", safeWord);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data() as any;
        setAnalysis(data);
        if (onAnalysisComplete) onAnalysisComplete(data);
        
        try {
          const cache = JSON.parse(localStorage.getItem(CACHE_KEY) || "{}");
          cache[word] = data;
          if (data.actualWord) cache[data.actualWord] = data;
          localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
        } catch (e) {}

      } else {
        // Tự động gọi AI API nếu chưa có trong Database
        const res = await fetch("/api/gemini/analyze-batch", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ words: [word] }),
        });

        if (!res.ok) {
          try {
            const errBody = await res.json();
            throw new Error(errBody.error || "Không thể tạo dữ liệu mới từ AI.");
          } catch (e: any) {
            throw new Error(e.message || "Không thể tạo dữ liệu mới từ AI.");
          }
        }

        const results = await res.json();
        
        if (Array.isArray(results) && results.length > 0 && results[0].word) {
          const item = results[0];
          item.word = item.word.trim();
          item.actualWord = item.word;
          const safeWord = item.word.replace(/\//g, '-');
          
          const newDocRef = doc(db, 'vocabularies', safeWord);
          await setDoc(newDocRef, item);

          setAnalysis(item);
          if (onAnalysisComplete) onAnalysisComplete(item);

          try {
            const cache = JSON.parse(localStorage.getItem(CACHE_KEY) || "{}");
            cache[word] = item;
            cache[item.actualWord] = item;
            localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
          } catch (e) {}
        } else {
          setError(`Không thể phân tích từ '${word}'. Vui lòng sử dụng tính năng 'Database Seeder (Admin)' ở dưới cùng trang để bơm dữ liệu.`);
        }
      }
    } catch (err: any) {
      setError(err.message || "Lỗi tải Database. Kiểm tra kết nối mạng.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50/50 rounded-2xl border border-indigo-100 p-4 space-y-3 mt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-indigo-700">
          <Database className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-widest">
            Phân tích từ vựng
          </span>
        </div>
        {!analysis && !loading && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              loadFromDatabase();
            }}
            className="text-[10px] bg-indigo-100 text-indigo-700 hover:bg-indigo-200 px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer"
          >
            Tải dữ liệu
          </button>
        )}
      </div>

      {loading && (
        <div className="flex items-center space-x-2 text-slate-500 text-xs py-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Đang lấy dữ liệu từ Cơ sở dữ liệu...</span>
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
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
              Bộ thủ cấu thành
            </span>
            <div className="flex flex-wrap gap-2">
              {Array.isArray(analysis.radicals) &&
                analysis.radicals.filter(rad => {
                  return !!findRadicalByChar(rad);
                }).map((rad, idx) => {
                  const foundRad = findRadicalByChar(rad);
                  return (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        onRadicalClick && onRadicalClick(rad);
                      }}
                      className="bg-white border border-indigo-100 text-indigo-700 hover:bg-indigo-50 text-xs px-2.5 py-1 rounded-lg font-medium shadow-sm transition-colors cursor-pointer flex items-center space-x-1"
                    >
                      <span className="font-bold">{rad}</span>
                      {foundRad && rad !== foundRad.character && !rad.includes(foundRad.character) && (
                        <span className="text-[10px] opacity-70">({foundRad.character})</span>
                      )}
                    </button>
                  );
                })}
            </div>
          </div>
          <div className="space-y-1 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
              Câu chuyện dệt chữ
            </span>
            <p className="text-sm text-slate-700 leading-relaxed font-medium">
              {analysis.story}
            </p>
          </div>
          {analysis.exampleSentence && (
            <div className="space-y-2 bg-white p-3 rounded-xl border border-slate-100 shadow-sm mt-3">
              <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                  Cú pháp ví dụ đàm thoại
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    speakChineseText(analysis.exampleSentence!);
                  }}
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
