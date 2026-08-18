import React, { useState, useEffect, useRef } from "react";
import { Database, Loader2, Eye, EyeOff, Cpu, Key } from "lucide-react";
import { HSK_1_WORDS_LIST, HSK_2_WORDS_LIST, HSK_3_WORDS_LIST } from "../data/vocabulary";
import { AUTOMATION_WORDS } from "../data/automation";
import { db } from "../lib/firebase";
import { doc, setDoc, collection, getDocs } from "firebase/firestore";

export function AdminSeeder() {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [logs, setLogs] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [pendingCount, setPendingCount] = useState<number | null>(null);
  const [checking, setChecking] = useState(false);
  const isRunningRef = useRef(false);

  // Configuration settings for custom API Key and Gemini model
  const [customApiKey, setCustomApiKey] = useState<string>(() => {
    return localStorage.getItem("gemini_api_key") || "";
  });
  const [selectedModel, setSelectedModel] = useState<string>(() => {
    return localStorage.getItem("gemini_model") || "gemini-3.5-flash";
  });
  const [showKey, setShowKey] = useState(false);

  useEffect(() => {
    localStorage.setItem("gemini_api_key", customApiKey);
  }, [customApiKey]);

  useEffect(() => {
    localStorage.setItem("gemini_model", selectedModel);
  }, [selectedModel]);

  // Deduplicate all words to ensure unique entries
  const allWords = Array.from(
    new Set([
      ...HSK_1_WORDS_LIST.map(w => w.word),
      ...HSK_2_WORDS_LIST.map(w => w.word),
      ...HSK_3_WORDS_LIST.map(w => w.word),
      ...AUTOMATION_WORDS.map(w => w.word)
    ])
  );

  const BATCH_SIZE = 20; // 20 words per batch

  const addLog = (msg: string) => {
    setLogs(prev => [...prev, msg].slice(-10)); // Keep only last 10 logs
  };

  // Check pending words on mount
  useEffect(() => {
    const checkPendingOnMount = async () => {
      setChecking(true);
      try {
        const querySnapshot = await getDocs(collection(db, "vocabularies"));
        const existingWords = new Set();
        querySnapshot.forEach((doc) => {
          existingWords.add(doc.id);
        });

        const pending = allWords.filter(w => !existingWords.has(w.trim().replace(/\//g, '-')));
        setPendingCount(pending.length);
        setProgress({ current: 0, total: pending.length });
      } catch (err: any) {
        console.error("Lỗi khi kiểm tra dữ liệu cũ:", err);
      } finally {
        setChecking(false);
      }
    };
    checkPendingOnMount();
  }, []);

  const startSeeding = async () => {
    if (isRunningRef.current) return;
    setIsRunning(true);
    isRunningRef.current = true;
    setIsFinished(false);
    setLogs([]);
    addLog(`Đang kiểm tra dữ liệu hiện có trên Database...`);

    try {
      const querySnapshot = await getDocs(collection(db, "vocabularies"));
      const existingWords = new Set();
      querySnapshot.forEach((doc) => {
        existingWords.add(doc.id);
      });

      const pendingWords = allWords.filter(w => !existingWords.has(w.trim().replace(/\//g, '-')));
      setPendingCount(pendingWords.length);
      setProgress({ current: 0, total: pendingWords.length });
      
      if (pendingWords.length === 0) {
        addLog(`✅ Tất cả ${allWords.length} từ đã được phân tích. Không cần chạy thêm.`);
        setIsRunning(false);
        isRunningRef.current = false;
        setIsFinished(true);
        return;
      }

      addLog(`🚀 Bắt đầu quá trình Bơm dữ liệu (${pendingWords.length} từ chưa có)...`);

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
              body: JSON.stringify({ 
                words: batch,
                apiKey: customApiKey,
                model: selectedModel
              }),
            });

            if (!res.ok) {
              let errorMessage = `Yêu cầu thất bại (Mã lỗi: ${res.status})`;
              try {
                const contentType = res.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                  const errBody = await res.json();
                  errorMessage = errBody.error || errorMessage;
                } else {
                  const text = await res.text();
                  if (text.includes("<!doctype") || text.includes("<html")) {
                    errorMessage = "Máy chủ bận hoặc gặp lỗi quota Gemini. Vui lòng thử lại sau.";
                  } else {
                    errorMessage = text.slice(0, 100) || errorMessage;
                  }
                }
              } catch (e) {}
              throw new Error(errorMessage);
            }

            let results;
            try {
              const contentType = res.headers.get("content-type");
              if (contentType && contentType.includes("application/json")) {
                results = await res.json();
              } else {
                throw new Error("Không nhận được dữ liệu JSON hợp lệ từ server.");
              }
            } catch (jsonErr: any) {
              throw new Error("Dữ liệu phản hồi không đúng định dạng: " + jsonErr.message);
            }
            
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
            setPendingCount(prev => prev !== null ? Math.max(0, prev - batch.length) : null);

            // Rate limit breaker: 50 seconds delay before next batch (if any)
            if (i + BATCH_SIZE < pendingWords.length && isRunningRef.current) {
              addLog(`⏱️ Chờ 50 giây trước khi tiếp tục đợt tiếp theo...`);
              for (let sec = 50; sec > 0; sec--) {
                if (!isRunningRef.current) break;
                if (sec === 50 || sec === 40 || sec === 30 || sec === 20 || sec === 10 || sec <= 5) {
                  addLog(`⏱️ Còn lại ${sec} giây...`);
                }
                await new Promise(r => setTimeout(r, 1000));
              }
            }
            
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
    <div className="bg-white rounded-3xl p-4 md:p-6 shadow-sm border border-slate-100 max-w-xl mx-auto my-2">
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
        {/* Gemini AI Config Section */}
        <div className="bg-slate-50/70 border border-slate-100 rounded-2xl p-4 space-y-4">
          <div className="flex items-center space-x-2 text-slate-700 font-bold text-sm">
            <Cpu className="w-4 h-4 text-indigo-500" />
            <span>Cấu hình Gemini AI</span>
          </div>
          
          <div className="space-y-3 text-xs">
            {/* Model select */}
            <div className="space-y-1.5">
              <label className="text-slate-500 font-medium block">Phiên bản Mô hình:</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedModel("gemini-3.5-flash")}
                  className={`py-2 px-3 rounded-lg border text-center font-semibold transition-all ${
                    selectedModel === "gemini-3.5-flash"
                      ? "bg-indigo-50 border-indigo-200 text-indigo-700 shadow-sm"
                      : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  Gemini 3.5 Flash <span className="text-[9px] block opacity-80">(Mặc định)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedModel("gemini-2.5-flash")}
                  className={`py-2 px-3 rounded-lg border text-center font-semibold transition-all ${
                    selectedModel === "gemini-2.5-flash"
                      ? "bg-indigo-50 border-indigo-200 text-indigo-700 shadow-sm"
                      : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  Gemini 2.5 Flash <span className="text-[9px] block opacity-80">(Tốc độ cao)</span>
                </button>
              </div>
            </div>

            {/* API Key Input */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-slate-500 font-medium flex items-center gap-1">
                  <Key className="w-3.5 h-3.5 text-slate-400" />
                  Custom Gemini API Key:
                </label>
                {customApiKey && (
                  <button
                    type="button"
                    onClick={() => setCustomApiKey("")}
                    className="text-[10px] text-rose-500 hover:underline font-semibold"
                  >
                    Xóa Key tùy chỉnh
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  type={showKey ? "text" : "password"}
                  value={customApiKey}
                  onChange={(e) => setCustomApiKey(e.target.value)}
                  placeholder="Mặc định (Dùng API Key của hệ thống)"
                  className="w-full pl-3 pr-10 py-2.5 rounded-lg border border-slate-200 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 focus:outline-none bg-white text-slate-700 font-mono text-[11px]"
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  {showKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
              <p className="text-[10px] text-slate-400 font-normal leading-relaxed">
                * Nếu tài khoản dùng thử của hệ thống hết giới hạn (Quota Limit), bạn có thể dán API Key cá nhân của mình vào đây để tiếp tục học và bơm dữ liệu.
              </p>
            </div>
          </div>
        </div>

        {/* Pending word count summary */}
        {checking ? (
          <div className="flex items-center space-x-2 text-sm text-slate-500 justify-center bg-slate-50 rounded-2xl py-3 border border-slate-100">
            <Loader2 className="w-4 h-4 animate-spin text-indigo-500" />
            <span>Đang kiểm tra số từ cần bơm...</span>
          </div>
        ) : pendingCount !== null ? (
          <div className="bg-indigo-50/60 rounded-2xl p-4 border border-indigo-100/50 flex justify-between items-center text-sm">
            <span className="text-slate-600 font-semibold">Số từ chưa có cần bơm:</span>
            <span className="font-bold text-indigo-700 bg-white px-3 py-1 rounded-full border border-indigo-100 shadow-sm tabular-nums text-base">
              {pendingCount}
            </span>
          </div>
        ) : null}

        {/* Progress Display */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm font-bold">
            <span className="text-slate-600 uppercase tracking-widest text-[10px]">Tiến trình bơm</span>
            <span className="text-indigo-600 tabular-nums">
              {progress.total > 0 ? `Đã hoàn thành ${progress.current} từ (${Math.round((progress.current / progress.total) * 100)}%)` : 'Sẵn sàng'}
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
            <div
              className="bg-indigo-600 h-3 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress.total > 0 ? (progress.current / progress.total) * 100 : 0}%` }}
            />
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={startSeeding}
          disabled={isRunning || checking}
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
