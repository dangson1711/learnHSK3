import express from "express";
import path from "path";
import { GoogleGenAI, Type, Schema } from "@google/genai";

const app = express();
app.use(express.json());

const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    results: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          word: { type: Type.STRING },
          pinyin: { type: Type.STRING },
          meaning: { type: Type.STRING },
          radicals: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
          story: { type: Type.STRING },
          actualWord: { type: Type.STRING },
          exampleSentence: { type: Type.STRING },
          examplePinyin: { type: Type.STRING },
          exampleMeaning: { type: Type.STRING },
        },
        required: ["word", "pinyin", "meaning", "radicals", "story", "actualWord"],
      },
    },
  },
};

// API Route for Batch Gemini analysis
app.post("/api/gemini/analyze-batch", async (req, res) => {
  try {
    const { words } = req.body;
    if (!words || !Array.isArray(words)) {
      return res.status(400).json({ error: "Missing words array" });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error("GEMINI_API_KEY không tồn tại trên server.");
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `Phân tích danh sách ${words.length} từ tiếng Trung sau đây.
Với mỗi từ, xác định chữ Hán thông dụng tương ứng (nếu input là pinyin hoặc nghĩa tiếng việt).
Phân tích mỗi chữ Hán thành các bộ thủ.
Sáng tạo CÂU CHUYỆN LIÊN TƯỞNG NGẮN (2-3 câu) liên kết các bộ thủ để dễ nhớ.
Cung cấp VÍ DỤ GIAO TIẾP THỰC TẾ ngắn gọn chứa từ đó.

Danh sách từ: ${words.join(', ')}`;

    let response: any;
    let retries = 3;
    let delay = 2000;
    
    while (retries > 0) {
      try {
         const genResponse = await ai.models.generateContent({
          model: "gemini-3.1-flash-lite",
          contents: prompt,
          config: {
            temperature: 0.2,
            responseMimeType: "application/json",
            responseSchema: responseSchema,
          },
        });
        response = genResponse;
        break; // Success
      } catch (error: any) {
        retries--;
        console.error(`Gemini API Batch Error (retries left: ${retries}):`, error.message);
        if (retries === 0 || (!error.message?.includes('503') && !error.message?.includes('429'))) {
          throw error;
        }
        await new Promise(r => setTimeout(r, delay));
        delay *= 2; // Exponential backoff
      }
    }

    let text = response.text || '{"results":[]}';
    if (text.startsWith("```json")) {
      text = text.replace(/^```json\n/, "").replace(/\n```$/, "");
    } else if (text.startsWith("```")) {
      text = text.replace(/^```\n/, "").replace(/\n```$/, "");
    }
    
    let data;
    try {
      data = JSON.parse(text);
      if (data.results && Array.isArray(data.results)) {
        data = data.results;
      } else if (!Array.isArray(data)) {
        data = [];
      }
    } catch (e) {
       data = [];
    }
    
    res.json(data);
  } catch (error: any) {
    console.error("Gemini API Batch Error:", error);
    let errorMessage = error.message || "Lỗi khi phân tích từ vựng";
    if (errorMessage.includes("503") || errorMessage.includes("high demand") || errorMessage.includes("UNAVAILABLE") || errorMessage.includes("overloaded")) {
      errorMessage = "Hệ thống AI hiện đang quá tải do nhu cầu cao. Bạn vui lòng thử lại sau vài giây nhé!";
      res.status(503).json({ error: errorMessage });
      return;
    }
    res.status(500).json({ error: errorMessage });
  }
});

export default app;

async function startServer() {
  const PORT = 3000;

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    // @ts-ignore
    const { createServer: createViteServer } = await import("vite");
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

if (!process.env.VERCEL) {
  startServer();
}
