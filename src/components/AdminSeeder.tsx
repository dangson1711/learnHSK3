import React, { useState } from "react";
import { Database, Loader2 } from "lucide-react";
import { HSK_1_WORDS_LIST, HSK_2_WORDS_LIST, HSK_3_WORDS_LIST } from "../data/vocabulary";
import { db } from "../lib/firebase";
import { doc, setDoc } from "firebase/firestore";

export function AdminSeeder() {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [logs, setLogs] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const isRunningRef = React.useRef(false);

  const allWords = [
    ...HSK_1_WORDS_LIST.map(w => w.word),
    ...HSK_2_WORDS_LIST.map(w => w.word),
    ...HSK_3_WORDS_LIST.map(w => w.word)
  ];

  const BATCH_SIZE = 30;

  const addLog = (msg: string) => {
    setLogs(prev => [...prev, msg].slice(-10)); // Keep only last 10 logs
  };

  const startSeeding = async () => {
    if (isRunningRef.current) return;
    setIsRunning(true);
    isRunningRef.current = true;
    setIsFinished(false);
    setLogs([]);
    addLog(`Đang kiểm tra dữ liệu hiện có trên Database...`);

    try {
      const { collection, getDocs } = await import("firebase/firestore");
      const querySnapshot = await getDocs(collection(db, "vocabularies"));
      const existingWords = new Set();
      querySnapshot.forEach((doc) => {
        existingWords.add(doc.id);
      });

      const pendingWords = allWords.filter(w => !existingWords.has(w.trim().replace(/\//g, '-')));
      
      if (pendingWords.length === 0) {
        addLog(`✅ Tất cả ${allWords.length} từ đã được phân tích. Không cần chạy thêm.`);
        setIsRunning(false);
        isRunningRef.current = false;
        setIsFinished(true);
        setProgress({ current: allWords.length, total: allWords.length });
        return;
      }

      addLog(`🚀 Bắt đầu quá trình Bơm dữ liệu (${pendingWords.length} từ chưa có)...`);
      setProgress({ current: 0, total: pendingWords.length });

      let totalProcessed = 0;

      for (let i = 0; i < pendingWords.length; i += BATCH_SIZE) {
        if (!isRunningRef.current) {
          addLog("🛑 Đã dừng tiến trình.");
          break;
        }

        const batch = pendingWords.slice(i, i + BATCH_SIZE);
        addLog(`⏳ Đang xử lý mẻ ${i + 1} - ${i + batch.length}...`);

        let success = false;
        let retries = 0;
        
        while (!success && retries < 3) {
          if (!isRunningRef.current) break;
          
          try {
            const res = await fetch("/api/gemini/analyze-batch", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ words: batch }),
            });

            if (!res.ok) {
              const errBody = await res.json();
              throw new Error(errBody.error || "Server error");
            }

            const results = await res.json();
            
            if (!Array.isArray(results) || results.length === 0) {
              throw new Error("Không nhận được dữ liệu hợp lệ từ AI");
            }

            // INSERT into Firebase Database
            let savedCount = 0;
            for (const item of results) {
              if (item && item.word) {
                item.word = item.word.trim();
                item.actualWord = item.word;
                // prevent slashes in doc path
                const safeWord = item.word.replace(/\//g, '-');
                const docRef = doc(db, 'vocabularies', safeWord);
                await setDoc(docRef, item);
                savedCount++;
              }
            }
            
            addLog(`✅ Đã lưu thành công ${savedCount} từ vào Firebase.`);
            success = true;
            totalProcessed += batch.length;
            setProgress(p => ({ ...p, current: totalProcessed }));

            // Rate limit breaker
            await new Promise(r => setTimeout(r, 1000));
            
          } catch (error: any) {
            retries++;
            addLog(`❌ Lỗi mẻ này (Thử lại ${retries}/3): ${error.message}`);
            await new Promise(r => setTimeout(r, 3000)); // wait before retry
          }
        }

        if (!success && isRunningRef.current) {
          addLog(`⚠️ Bỏ qua mẻ này vì liên tục gặp lỗi.`);
        }
      }

      if (isRunningRef.current) {
        addLog(`🎉 Hoàn thành quá trình bơm dữ liệu!`);
      }
    } catch (error: any) {
      addLog(`❌ Lỗi hệ thống: ${error.message}`);
    } finally {
      setIsRunning(false);
      isRunningRef.current = false;
      setIsFinished(true);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 max-w-xl mx-auto my-8">
      <div className="flex items-center space-x-4 mb-6 pb-6 border-b border-slate-100">
        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0">
          <Database className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-800">
            Database Seeder (Admin)
          </h2>
          <p className="text-sm font-medium text-slate-500 mt-1">
            Chạy trực tiếp trên trình duyệt để bơm ngữ nghĩa vào Firebase.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Progress Display */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm font-bold">
            <span className="text-slate-600 uppercase tracking-widest text-[10px]">Tiến trình</span>
            <span className="text-indigo-600 tabular-nums">
              {progress.current} / {allWords.length}
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
            <div
              className="bg-indigo-600 h-3 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${allWords.length > 0 ? (progress.current / allWords.length) * 100 : 0}%` }}
            />
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={startSeeding}
          disabled={isRunning}
          className="w-full py-4 px-6 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed text-white rounded-xl font-bold shadow-sm transition-all shadow-indigo-100 flex items-center justify-center space-x-2"
        >
          {isRunning ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Đang bơm dữ liệu...</span>
            </>
          ) : isFinished ? (
            <>
              <span>Chạy lại</span>
            </>
          ) : (
            <>
              <span>Bắt đầu bơm dữ liệu</span>
            </>
          )}
        </button>

        {/* Logs */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Terminal Output</span>
          </div>
          <div className="font-mono text-xs text-slate-600 space-y-1.5 h-32 overflow-y-auto">
            {logs.length === 0 ? (
              <span className="text-slate-400 italic">Sẵn sàng...</span>
            ) : (
              logs.map((log, i) => (
                <div key={i} className="leading-relaxed">
                  {log}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
