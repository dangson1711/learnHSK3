import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Square, Loader2, Database, AlertCircle } from 'lucide-react';
import { ALL_600_VOCABULARIES } from '../data/vocabulary';
import { AIAnalysisPanel } from './AIAnalysisPanel';

const CACHE_KEY = 'hanzi_ai_analysis_cache';

export function BatchAIProcessor() {
  const [isOpen, setIsOpen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: ALL_600_VOCABULARIES.length, successful: 0, failed: 0, skipped: 0 });
  const [currentWord, setCurrentWord] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  
  const isRunningRef = useRef(isRunning);
  
  useEffect(() => {
    isRunningRef.current = isRunning;
  }, [isRunning]);

  const addLog = (msg: string) => {
    setLogs(prev => {
      const newLogs = [...prev, msg];
      if (newLogs.length > 50) return newLogs.slice(newLogs.length - 50);
      return newLogs;
    });
  }

  const startBatch = async () => {
    if (isRunning) return;
    setIsRunning(true);
    isRunningRef.current = true;
    addLog('Bắt đầu xử lý AI hàng loạt...');
    
    let cache: Record<string, any> = {};
    try {
      cache = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
    } catch (e) {
      // ignore
    }

    let success = 0;
    let fail = 0;
    let skip = 0;

    const maxRetriesPerWord = 3;
    let currentWordRetries = 0;

    for (let i = 0; i < ALL_600_VOCABULARIES.length; i++) {
       if (!isRunningRef.current) break;
       
       const word = ALL_600_VOCABULARIES[i].word;
       setCurrentWord(word);
       setProgress(p => ({ ...p, current: i + 1 }));

       if (cache[word]) {
          skip++;
          setProgress(p => ({ ...p, skipped: skip }));
          currentWordRetries = 0;
          continue;
       }

       try {
          const response = await fetch('/api/gemini/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ word }),
          });
          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.error || 'Lỗi kết nối AI');
          }
          
          cache[word] = data;
          if (data.actualWord) {
            cache[data.actualWord] = data; // Cache fallback
          }
          try {
            localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
          } catch(e) {
            addLog(`❌ Cảnh báo: Quá dung lượng lưu trữ cục bộ khi lưu "${word}".`);
            setIsRunning(false);
            break;
          }

          success++;
          setProgress(p => ({ ...p, successful: success }));
          addLog(`✅ Đã phân tích: ${word}`);
          currentWordRetries = 0;
          
          // Nghỉ 1.5 giây để tránh rate limit
          await new Promise(r => setTimeout(r, 1500));
       } catch (err: any) {
          
          addLog(`❌ Lỗi [${word}]: ${err.message}`);
          
          // Nếu gặp lỗi 503 hoặc quá tải, thử lại
          if (err.message?.includes('503') || err.message?.includes('quá tải') || err.message?.includes('429')) {
             currentWordRetries++;
             if (currentWordRetries <= maxRetriesPerWord) {
                addLog(`⚠️ Đang quá tải, tạm nghỉ chờ phục hồi rồi thử lại từ "${word}" (Lần ${currentWordRetries}/${maxRetriesPerWord})...`);
                await new Promise(r => setTimeout(r, 10000)); // Nghỉ 10s
                i--; // Lùi lại 1 bước để vòng lặp thử lại từ này
                continue;
             } else {
                addLog(`❌ Đã thử lại quá nhiều lần từ "${word}", tự động bỏ qua.`);
             }
          }
          
          fail++;
          setProgress(p => ({ ...p, failed: fail }));
          currentWordRetries = 0;
          await new Promise(r => setTimeout(r, 2000));
       }
    }
    
    setIsRunning(false);
    setCurrentWord(null);
    addLog('⏹ Đã hoàn thành/dừng tiến trình quét AI.');
  };

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        onClick={toggleOpen}
        className="fixed bottom-6 right-6 p-4 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition shadow-indigo-200"
        title="Tiện ích Sinh & Lưu AI hàng loạt"
      >
        <Database className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-lg border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
            <div className="px-6 py-5 bg-indigo-50 border-b border-indigo-100 flex items-center justify-between">
              <div className="flex items-center space-x-3 text-indigo-700">
                <Database className="w-5 h-5" />
                <h3 className="font-bold uppercase tracking-wider text-sm">Tiện ích Sinh AI Hàng Loạt</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-indigo-400 hover:text-indigo-600 font-bold">
                Đóng
              </button>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto">
              <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                <p className="text-xs text-blue-700 leading-relaxed font-medium">
                  Chức năng này sẽ tự động tiến hành đưa 600 từ vựng HSK1 - HSK3 vào máy chủ AI để xử lý bóc tách bộ thủ, tạo câu chuyện liên tưởng và tình huống đàm thoại. <br/><br/>
                  Tất cả kết quả sẽ được <strong>lưu vĩnh viễn vào bộ nhớ cục bộ (Local Storage)</strong>, khi học từ mới bạn sẽ không phải đợi chờ AI phân tích nữa.
                </p>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Tiến trình</div>
                  <div className="text-sm font-bold text-slate-700 font-mono mt-1">{progress.current} / {progress.total}</div>
                </div>
                <div className="bg-green-50 p-2 rounded-lg border border-green-100">
                  <div className="text-[10px] font-bold text-green-500 uppercase">Thành công</div>
                  <div className="text-sm font-bold text-green-700 font-mono mt-1">{progress.successful}</div>
                </div>
                <div className="bg-slate-100 p-2 rounded-lg border border-slate-200">
                  <div className="text-[10px] font-bold text-slate-500 uppercase">Đã có (Bỏ qua)</div>
                  <div className="text-sm font-bold text-slate-700 font-mono mt-1">{progress.skipped}</div>
                </div>
                <div className="bg-red-50 p-2 rounded-lg border border-red-100">
                  <div className="text-[10px] font-bold text-red-500 uppercase">Lỗi / Quá tải</div>
                  <div className="text-sm font-bold text-red-700 font-mono mt-1">{progress.failed}</div>
                </div>
              </div>

              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-indigo-500 h-full transition-all duration-300"
                  style={{ width: `${(progress.current / progress.total) * 100}%` }}
                />
              </div>

              {currentWord && (
                <div className="flex items-center space-x-2 text-sm text-indigo-600 font-medium">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Đang xử lý: <strong className="font-serif text-lg ml-1">{currentWord}</strong>...</span>
                </div>
              )}

              <div className="bg-slate-900 rounded-xl p-3 h-40 overflow-y-auto space-y-1 font-mono text-[10px] text-slate-300">
                 {logs.length === 0 ? (
                   <div className="text-slate-500 text-center mt-12">Chưa có nhật ký hoạt động</div>
                 ) : (
                   logs.map((L, i) => (
                     <div key={i} className={
                       L.includes('❌') ? 'text-red-400' : 
                       L.includes('✅') ? 'text-green-400' : 
                       L.includes('⚠️') ? 'text-yellow-400' : 'text-slate-300'
                     }>{L}</div>
                   ))
                 )}
                 {/* Auto scroll stub */}
                 <div ref={el => el?.scrollIntoView()} />
              </div>
            </div>

            <div className="p-5 border-t border-slate-200 bg-slate-50 flex space-x-3 justify-end items-center">
              {!isRunning ? (
                <button
                  onClick={startBatch}
                  className="flex flex-1 items-center justify-center space-x-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all"
                >
                  <Play className="w-4 h-4" />
                  <span>Chạy AI Phân Tích (Cần nhiều thời gian)</span>
                </button>
              ) : (
                <button
                  onClick={() => setIsRunning(false)}
                  className="flex flex-1 items-center justify-center space-x-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-all cursor-pointer shadow-sm shadow-red-200"
                >
                  <Square className="w-4 h-4" />
                  <span>Dừng tiến trình</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
