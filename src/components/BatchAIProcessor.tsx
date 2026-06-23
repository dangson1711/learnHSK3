import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  Square,
  Loader2,
  Database,
  AlertCircle,
} from "lucide-react";
import { ALL_600_VOCABULARIES } from "../data/vocabulary";
import { AIAnalysisPanel } from "./AIAnalysisPanel";

const CACHE_KEY = "hanzi_ai_analysis_cache";

export function BatchAIProcessor() {
  const [isOpen, setIsOpen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState({
    current: 0,
    total: ALL_600_VOCABULARIES.length,
    successful: 0,
    failed: 0,
    skipped: 0,
  });
  const [currentWord, setCurrentWord] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const isRunningRef = useRef(isRunning);

  useEffect(() => {
    isRunningRef.current = isRunning;
  }, [isRunning]);

  const addLog = (msg: string) => {
    setLogs((prev) => {
      const newLogs = [...prev, msg];
      if (newLogs.length > 50) return newLogs.slice(newLogs.length - 50);
      return newLogs;
    });
  };

  const startBatch = async () => {
    if (isRunning) return;
    setIsRunning(true);
    isRunningRef.current = true;
    addLog("Bắt đầu xử lý AI hàng loạt...");

    let cache: Record<string, any> = {};
    try {
      cache = JSON.parse(localStorage.getItem(CACHE_KEY) || "{}");
    } catch (e) {
      // ignore
    }

    let success = 0;
    let fail = 0;
    let skip = 0;

    const maxRetriesPerBatch = 5;
    let currentBatchRetries = 0;
    const BATCH_SIZE = 30;

    for (let i = 0; i < ALL_600_VOCABULARIES.length; i += BATCH_SIZE) {
      if (!isRunningRef.current) break;

      const currentItemMax = Math.min(
        i + BATCH_SIZE,
        ALL_600_VOCABULARIES.length,
      );
      setProgress((p) => ({ ...p, current: currentItemMax }));

      const batchWords = ALL_600_VOCABULARIES.slice(i, currentItemMax).map(
        (v) => v.word,
      );
      const wordsToProcess = batchWords.filter((w) => !cache[w]);

      const skippedCount = batchWords.length - wordsToProcess.length;
      if (skippedCount > 0) {
        skip += skippedCount;
        setProgress((p) => ({ ...p, skipped: skip }));
      }

      if (wordsToProcess.length === 0) {
        currentBatchRetries = 0;
        continue;
      }

      const label =
        wordsToProcess.length === 1
          ? wordsToProcess[0]
          : `${wordsToProcess[0]} (+${wordsToProcess.length - 1} từ)`;
      setCurrentWord(label);

      try {
        const customApiKey =
          localStorage.getItem("settings_gemini_api_key") || "";

        let response = await fetch("/api/gemini/analyze-batch", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(customApiKey && { "x-gemini-api-key": customApiKey }),
          },
          body: JSON.stringify({ words: wordsToProcess }),
        });

        let dataArray;
        let textResponse = await response.text();

        // Kịch bản Web tĩnh (GitHub Pages), Vercel Timeout (504), lỗi server (500) hoặc API trả về HTML (404 Not Found)
        if (
          response.status === 404 ||
          response.status === 504 ||
          response.status === 500 ||
          textResponse.trim().startsWith("<") ||
          textResponse.includes("FUNCTION_INVOCATION_TIMEOUT") ||
          textResponse.includes("A server error has occurred")
        ) {
          if (!customApiKey) {
            if (
              textResponse.includes("FUNCTION_INVOCATION_TIMEOUT") ||
              response.status === 504
            ) {
              throw new Error(
                "Máy chủ Vercel bị quá thời gian xử lý (Timeout). Vui lòng vào Cài đặt để nhập API Key của bạn để tiếp tục xử lý!",
              );
            }
            throw new Error(
              "Không thể kết nối máy chủ hoặc máy chủ bị lỗi. Bạn CẦN nhập API Key trong phần Cài đặt để sử dụng tính năng này!",
            );
          }
          addLog(
            `⚠️ Gặp lỗi từ máy chủ (${response.status}), tự động chuyển sang gọi trực tiếp AI từ trình duyệt...`,
          );

          const directPrompt = `Phân tích danh sách ${wordsToProcess.length} từ tiếng Trung sau đây.
Với mỗi từ, xác định chữ Hán thông dụng tương ứng (nếu input là pinyin hoặc nghĩa tiếng việt).
Phân tích mỗi chữ Hán thành các bộ thủ.
Sáng tạo CÂU CHUYỆN LIÊN TƯỞNG NGẮN (2-3 câu) liên kết các bộ thủ để dễ nhớ.
Cung cấp VÍ DỤ GIAO TIẾP THỰC TẾ ngắn gọn chứa từ đó.

Trả về duy nhất MỘT ARRAY CHỨA ${wordsToProcess.length} JSON OBJECTS, có cấu trúc chính xác (ví dụ cho chữ "我"):
[
  {
    "queryWord": "từ_gốc_từ_danh_sách",
    "actualWord": "我",
    "wordPinyin": "wǒ",
    "wordMeaning": "tôi, tao, mình",
    "radicals": ["Bộ thủ 1 (Nghĩa 1)", "Bộ thủ 2 (Nghĩa 2)"],
    "story": "Câu chuyện...",
    "exampleSentence": "Ní hǎo, wǒ shì...",
    "examplePinyin": "Ní hǎo, wǒ shì...",
    "exampleMeaning": "Xin chào, tôi là..."
  }
]
Danh sách từ: ${wordsToProcess.join(", ")}
Lưu ý quan trọng: Chỉ trả về mảng JSON thuần túy, tuyệt đối không chứa markdown, không có text hướng dẫn. Phải trả đủ ${wordsToProcess.length} từ.`;

          const geminiRes = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${customApiKey}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                contents: [{ parts: [{ text: directPrompt }] }],
                generationConfig: {
                  responseMimeType: "application/json",
                  temperature: 0.2,
                },
              }),
            },
          );

          const geminiTextResponse = await geminiRes.text();
          let geminiData;
          try {
            geminiData = JSON.parse(geminiTextResponse);
          } catch (e) {
            // ignore
          }
          if (!geminiRes.ok) {
            throw new Error(
              geminiData?.error?.message ||
                geminiTextResponse ||
                "Lỗi khi gọi API Gemini trực tiếp",
            );
          }
          const geminiText =
            geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;
          textResponse = geminiText || "[]";
        } else {
          if (!response.ok) {
            let proxyErrMsg = textResponse;
            try {
              const parsed = JSON.parse(textResponse);
              proxyErrMsg = parsed.error || proxyErrMsg;
            } catch (e) {}
            throw new Error(
              typeof proxyErrMsg === "string"
                ? proxyErrMsg
                : JSON.stringify(proxyErrMsg),
            );
          }
        }

        try {
          dataArray = JSON.parse(textResponse);
        } catch (e) {
          throw new Error(
            `Lỗi parse JSON. Nội dung: ${textResponse.substring(0, 20)}...`,
          );
        }

        if (!Array.isArray(dataArray)) {
          throw new Error("Phản hồi từ AI không đúng định dạng mảng JSON");
        }

        let savedInMem = false;
        dataArray.forEach((data: any) => {
          // Link to the requested word or actual word
          const targetWord = data.queryWord || data.actualWord;
          if (targetWord) {
            cache[targetWord] = data;
            if (data.actualWord && data.actualWord !== targetWord) {
              cache[data.actualWord] = data;
            }
            savedInMem = true;
          }
        });

        if (savedInMem) {
          try {
            localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
          } catch (e) {
            addLog(`❌ Cảnh báo: Quá dung lượng lưu trữ cục bộ.`);
            setIsRunning(false);
            break;
          }
        }

        success += wordsToProcess.length;
        setProgress((p) => ({ ...p, successful: success }));
        addLog(`✅ Đã phân tích nhóm: ${label}`);
        currentBatchRetries = 0;

        // Tránh rate limit
        addLog(`⏳ Đang nghỉ 15 giây để lách luật quá tải từ Gemini...`);
        await new Promise((r) => setTimeout(r, 15000));
      } catch (err: any) {
        const displayErr =
          typeof err === "string" ? err : err?.message || "Lỗi không xác định";
        addLog(`❌ Lỗi nhóm [${label}]: ${displayErr}`);

        // Thử lại nếu quá tải
        const errMsg =
          typeof err === "string"
            ? err.toLowerCase()
            : (err?.message || "").toLowerCase();
        if (
          errMsg.includes("503") ||
          errMsg.includes("quá tải") ||
          errMsg.includes("429") ||
          errMsg.includes("high demand") ||
          errMsg.includes("unavailable") ||
          errMsg.includes("overloaded")
        ) {
          currentBatchRetries++;
          if (currentBatchRetries <= maxRetriesPerBatch) {
            const waitTime = currentBatchRetries * 30000; // 30s, 60s, 90s, 120s...
            addLog(
              `⚠️ Hệ thống AI quá tải, chờ ${waitTime / 1000} giây rồi thử lại nhóm "${label}" (Lần ${currentBatchRetries}/${maxRetriesPerBatch})...`,
            );
            await new Promise((r) => setTimeout(r, waitTime));
            i -= BATCH_SIZE; // Quay lại batch này
            continue;
          } else {
            addLog(`❌ Hết lượt thử lại nhóm "${label}", tự động bỏ qua.`);
            fail += wordsToProcess.length;
            setProgress((p) => ({ ...p, failed: fail }));
          }
        } else {
          fail += wordsToProcess.length;
          setProgress((p) => ({ ...p, failed: fail }));
        }
        currentBatchRetries = 0;
        addLog(`⏳ Đang nghỉ 15 giây để lách luật quá tải từ Gemini...`);
        await new Promise((r) => setTimeout(r, 15000));
      }
    }

    setIsRunning(false);
    setCurrentWord(null);
    addLog("⏹ Đã hoàn thành/dừng tiến trình quét AI.");
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
                <h3 className="font-bold uppercase tracking-wider text-sm">
                  Tiện ích Sinh AI Hàng Loạt
                </h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-indigo-400 hover:text-indigo-600 font-bold"
              >
                Đóng
              </button>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto">
              <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                <p className="text-xs text-blue-700 leading-relaxed font-medium">
                  Chức năng này sẽ tự động tiến hành đưa 600 từ vựng HSK1 - HSK3
                  vào máy chủ AI để xử lý bóc tách bộ thủ, tạo câu chuyện liên
                  tưởng và tình huống đàm thoại. <br />
                  <br />
                  Tất cả kết quả sẽ được{" "}
                  <strong>
                    lưu vĩnh viễn vào bộ nhớ cục bộ (Local Storage)
                  </strong>
                  , khi học từ mới bạn sẽ không phải đợi chờ AI phân tích nữa.
                </p>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">
                    Tiến trình
                  </div>
                  <div className="text-sm font-bold text-slate-700 font-mono mt-1">
                    {progress.current} / {progress.total}
                  </div>
                </div>
                <div className="bg-green-50 p-2 rounded-lg border border-green-100">
                  <div className="text-[10px] font-bold text-green-500 uppercase">
                    Thành công
                  </div>
                  <div className="text-sm font-bold text-green-700 font-mono mt-1">
                    {progress.successful}
                  </div>
                </div>
                <div className="bg-slate-100 p-2 rounded-lg border border-slate-200">
                  <div className="text-[10px] font-bold text-slate-500 uppercase">
                    Đã có (Bỏ qua)
                  </div>
                  <div className="text-sm font-bold text-slate-700 font-mono mt-1">
                    {progress.skipped}
                  </div>
                </div>
                <div className="bg-red-50 p-2 rounded-lg border border-red-100">
                  <div className="text-[10px] font-bold text-red-500 uppercase">
                    Lỗi / Quá tải
                  </div>
                  <div className="text-sm font-bold text-red-700 font-mono mt-1">
                    {progress.failed}
                  </div>
                </div>
              </div>

              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-indigo-500 h-full transition-all duration-300"
                  style={{
                    width: `${(progress.current / progress.total) * 100}%`,
                  }}
                />
              </div>

              {currentWord && (
                <div className="flex items-center space-x-2 text-sm text-indigo-600 font-medium">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>
                    Đang xử lý:{" "}
                    <strong className="font-serif text-lg ml-1">
                      {currentWord}
                    </strong>
                    ...
                  </span>
                </div>
              )}

              <div className="bg-slate-900 rounded-xl p-3 h-40 overflow-y-auto space-y-1 font-mono text-[10px] text-slate-300">
                {logs.length === 0 ? (
                  <div className="text-slate-500 text-center mt-12">
                    Chưa có nhật ký hoạt động
                  </div>
                ) : (
                  logs.map((L, i) => (
                    <div
                      key={i}
                      className={
                        L.includes("❌")
                          ? "text-red-400"
                          : L.includes("✅")
                            ? "text-green-400"
                            : L.includes("⚠️")
                              ? "text-yellow-400"
                              : "text-slate-300"
                      }
                    >
                      {L}
                    </div>
                  ))
                )}
                {/* Auto scroll stub */}
                <div ref={(el) => el?.scrollIntoView()} />
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
