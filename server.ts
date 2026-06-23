import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Gemini analysis
  app.post("/api/gemini/analyze", async (req, res) => {
    try {
      const { word } = req.body;
      if (!word) {
        return res.status(400).json({ error: "Missing word" });
      }

      const customApiKey = req.headers['x-gemini-api-key'] as string;
      const apiKey = customApiKey || process.env.GEMINI_API_KEY;

      if (!apiKey) {
        throw new Error("Vui lòng cung cấp API Key của bạn để sử dụng chức năng này.");
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const prompt = `Phân tích từ "${word}" thành các bộ thủ. 
Lưu ý: Nếu "${word}" là phiên âm pinyin (chữ Latinh) hoặc nghĩa tiếng Việt, hãy tự xác định chữ Hán (Hanzi) thông dụng nhất tương ứng với từ đó và dùng chữ Hán đó để phân tích.
Đồng thời sáng tạo một câu chuyện ngắn gọn, dễ nhớ (khoảng 2-3 câu) để liên kết các bộ thủ này lại với nhau nhằm giúp người học ghi nhớ ý nghĩa của chữ Hán này.
Bạn cũng phải cung cấp chữ Hán thực tế (actualWord), Pinyin (phiên âm chuẩn) và Nghĩa tiếng Việt của chính chữ Hán đó.
Cuối cùng, hãy tạo thêm một câu ví dụ đàm thoại thực tế, giao tiếp ngắn gọn (không quá dài, dễ áp dụng) sử dụng chữ Hán đó. 
Trả về dưới dạng JSON có cấu trúc như sau:
{
  "actualWord": "Chữ Hán chính thức (ví dụ: 我, 你, ...)",
  "wordPinyin": "Pinyin của chữ gốc...",
  "wordMeaning": "Nghĩa tiếng Việt của chữ gốc...",
  "radicals": ["Bộ 1 (Ý nghĩa)", "Bộ 2 (Ý nghĩa)", ...],
  "story": "Câu chuyện liên tưởng...",
  "exampleSentence": "Câu đàm thoại tiếng Trung...",
  "examplePinyin": "Pinyin của câu đàm thoại...",
  "exampleMeaning": "Nghĩa tiếng Việt của câu đàm thoại..."
}
Lưu ý: Chỉ trả về chuỗi JSON thuần túy, không chứa định dạng markdown.`;

      let response: any;
      let retries = 3;
      let delay = 2000;
      
      while (retries > 0) {
        try {
          response = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: prompt,
            config: {
              responseMimeType: "application/json",
              temperature: 0.7,
            },
          });
          break; // Success
        } catch (error: any) {
          retries--;
          console.error(`Gemini API Error (retries left: ${retries}):`, error.message);
          if (retries === 0 || (!error.message?.includes('503') && !error.message?.includes('429'))) {
            throw error;
          }
          await new Promise(r => setTimeout(r, delay));
          delay *= 2; // Exponential backoff
        }
      }

      const text = response.text || "{}";
      const data = JSON.parse(text);
      res.json(data);
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      
      let errorMessage = error.message || "Lỗi khi phân tích từ vựng";
      
      // Xử lý lỗi hệ thống quá tải từ Gemini
      if (errorMessage.includes("503") || errorMessage.includes("high demand") || errorMessage.includes("UNAVAILABLE")) {
        errorMessage = "Hệ thống AI hiện đang quá tải do nhu cầu cao. Bạn vui lòng thử lại sau vài giây nhé!";
      }

      res.status(500).json({ error: errorMessage });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Static files in production
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
