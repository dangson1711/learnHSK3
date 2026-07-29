import { GoogleGenAI, Type } from "@google/genai";
import fs from 'fs';
import path from 'path';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

const LESSONS_METADATA = [
  { order: 1, title: 'Bài 1: 周末你有什么打算 (Cuối tuần bạn có dự định gì?)', description: 'Nói về dự định cuối tuần, sắp xếp đồ đạc dã ngoại, du lịch miền Nam hay miền Bắc.' },
  { order: 2, title: 'Bài 2: 他什么时候回来 (Khi nào anh ấy về?)', description: 'Nói về sức khỏe, thời gian đi lên/xuống lầu, mang theo đồ che mưa (ô).' },
  { order: 3, title: 'Bài 3: 桌子上放着很多饮料 (Trên bàn đặt rất nhiều đồ uống)', description: 'Nói về không gian sống, sở thích uống trà/cà phê, chọn mua đồ uống và hoa quả.' },
  { order: 4, title: 'Bài 4: 她总是笑着跟客人说话 (Cô ấy luôn cười khi nói chuyện với khách)', description: 'Nói về công việc tại văn phòng, tinh thần vui vẻ khi giao tiếp với khách hàng.' },
  { order: 5, title: 'Bài 5: 我最近越来越胖了 (Dạo này tôi ngày càng béo lên)', description: 'Nói về sức khỏe, cân nặng, tập thể thao, thói quen ăn uống lành mạnh.' },
  { order: 6, title: 'Bài 6: 怎么突然找不到了 (Sao đột nhiên lại không tìm thấy nữa)', description: 'Nói về đồ đạc bị thất lạc (kính, chìa khóa), tìm kiếm và phát hiện sự việc đột ngột.' },
  { order: 7, title: 'Bài 7: 我跟她都认识五年了 (Tôi và cô ấy quen nhau 5 năm rồi)', description: 'Nói về các mối quan hệ bạn bè, tình cảm lâu năm, thời gian gắn bó học tập hoặc làm việc.' },
  { order: 8, title: 'Bài 8: 你去哪儿我就去哪儿 (Bạn đi đâu tôi đi đó)', description: 'Bày tỏ quan điểm cá nhân, sự đồng ý, đưa ra lựa chọn theo mong muốn của người khác.' },
  { order: 9, title: 'Bài 9: 她的汉语说得跟中国人一样好 (Tiếng Hán của cô ấy nói tốt như người Trung Quốc)', description: 'So sánh mức độ thành thạo ngôn ngữ, cách học tập hiệu quả, khen ngợi năng lực.' },
  { order: 10, title: 'Bài 10: 数学比历史难多了 (Toán học khó hơn lịch sử nhiều)', description: 'So sánh các môn học, mức độ khó dễ, kỳ vọng thành tích học tập.' },
  { order: 11, title: 'Bài 11: 别忘了把空调关了 (Đừng quên tắt điều hòa)', description: 'Sử dụng câu chữ "把" biểu thị yêu cầu bảo quản đồ đạc, tắt thiết bị điện khi ra ngoài.' },
  { order: 12, title: 'Bài 12: 把重要的东西放在我这儿吧 (Hãy để những đồ quan trọng ở chỗ tôi)', description: 'Sử dụng câu chữ "把" biểu thị việc sắp xếp vị trí đồ vật, giữ gìn tài liệu quan trọng.' },
  { order: 13, title: 'Bài 13: 我是走回来的 (Tôi đi bộ về)', description: 'Diễn tả hướng của hành động đi về phía người nói, cách thức di chuyển qua lại.' },
  { order: 14, title: 'Bài 14: 你把水果拿过来 (Bạn mang trái cây qua đây)', description: 'Sử dụng câu chữ "把" kết hợp bổ ngữ xu hướng, di chuyển hoa quả đồ ăn đến bàn.' },
  { order: 15, title: 'Bài 15: 其他都没什么问题 (Những thứ khác đều không có vấn đề gì)', description: 'Báo cáo tình hình công việc, học tập, khẳng định không còn vướng mắc nào.' },
  { order: 16, title: 'Bài 16: 我现在累得下了班就想睡觉 (Bây giờ tôi mệt đến mức tan làm chỉ muốn ngủ)', description: 'Diễn tả trạng thái mệt mỏi, áp lực công việc, thói quen sinh hoạt khi bận rộn.' },
  { order: 17, title: 'Bài 17: 谁都有办法看好你的病 (Ai cũng có cách chữa khỏi bệnh cho bạn)', description: 'Nói về y tế, động viên tinh thần người bệnh, niềm tin vào các biện pháp chữa trị.' },
  { order: 18, title: 'Bài 18: 我我相信他们会同意的 (Tôi tin họ sẽ đồng ý)', description: 'Bày tỏ sự tự tin, thuyết phục đối tác hoặc người khác đồng ý với kế hoạch.' },
  { order: 19, title: 'Bài 19: 你没看出来吗 (Bạn không nhìn ra sao)', description: 'Diễn tả sự ngạc nhiên, nhận ra sự thay đổi ở người khác hoặc sự việc xung quanh.' },
  { order: 20, title: 'Bài 20: 我被他影响了 (Tôi bị anh ấy ảnh hưởng rồi)', description: 'Sử dụng câu chữ "被" biểu thị tác động bị động, thay đổi thói quen tốt từ người khác.' }
];

async function generateBatch(startIdx, endIdx) {
  console.log(`Generating lessons ${startIdx} to ${endIdx}...`);
  const lessonsPrompt = LESSONS_METADATA.slice(startIdx - 1, endIdx).map(l => {
    return `Lesson ${l.order}: "${l.title}"
Description: ${l.description}`;
  }).join('\n\n');

  const prompt = `You are a professional Chinese language educator specializing in HSK 3 standard course curriculum.
I need you to generate vocabulary, dialogues, and grammar points for HSK 3 lessons ${startIdx} to ${endIdx}.

Here are the lessons to generate:
${lessonsPrompt}

Please return a JSON object with the following structure:
{
  "lessons": [
    {
      "lessonNumber": number,
      "vocabulary": [
        {
          "word": "Chinese word",
          "pinyin": "pinyin with tones",
          "meaning": "Vietnamese meaning"
        }
      ],
      "dialogues": [
        {
          "title": "Title of the dialogue in Chinese and Vietnamese (e.g. '谈去北京旅游 (Nói về du lịch Bắc Kinh)')",
          "lines": [
            {
              "speaker": "A or B",
              "chinese": "spoken sentence in Chinese",
              "pinyin": "pinyin with tones",
              "vietnamese": "Vietnamese translation"
            }
          ]
        }
      ],
      "grammar": [
        {
          "title": "Grammar point title in Vietnamese describing the rule",
          "examples": [
            {
              "chinese": "example sentence in Chinese",
              "pinyin": "pinyin with tones",
              "vietnamese": "Vietnamese translation"
            }
          ]
        }
      ]
    }
  ]
}

CRITICAL RULES FOR GENERATION:
1. Ensure the Chinese vocabulary words are authentic HSK 3 standard course vocabulary. Include about 12-15 words per lesson.
2. Dialogues must be realistic HSK 3 level dialogues, typically 2 to 4 dialogues per lesson, each containing 4-6 lines of conversation between speakers A and B. Ensure speaker name matches "A" and "B".
3. Grammar points must correspond exactly to the official HSK 3 grammar structures. Give 2-3 grammar points per lesson, each having exactly 3 clear, grammatically correct examples.
4. Ensure pinyin is accurate and correctly spaced, with proper tone marks.
5. All translations (meanings, dialogue lines, grammar titles, and grammar examples) MUST be in natural, accurate Vietnamese.
6. Provide raw, valid JSON only. Do not wrap the JSON in markdown formatting or anything else.`;

  let response;
  let retries = 5;
  let delay = 3000;
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json"
        }
      });
      break;
    } catch (e) {
      console.warn(`Attempt ${attempt} failed for batch ${startIdx}-${endIdx}: ${e.message}`);
      if (attempt === retries) {
        throw e;
      }
      console.log(`Waiting ${delay}ms before retrying...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      delay *= 2; // exponential backoff
    }
  }

  const text = response.text;
  try {
    return JSON.parse(text);
  } catch (error) {
    console.error(`Failed to parse JSON for batch ${startIdx}-${endIdx}:`, error);
    console.log("Raw output was:", text);
    throw error;
  }
}

async function main() {
  const allData = [];
  try {
    // Generate in 4 batches to ensure high quality and prevent token limits
    for (let i = 1; i <= 20; i += 5) {
      const batchResult = await generateBatch(i, i + 4);
      allData.push(...batchResult.lessons);
      // Wait a bit to respect rate limits
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    fs.writeFileSync('hsk3_generated_raw.json', JSON.stringify(allData, null, 2), 'utf-8');
    console.log("Successfully generated raw HSK 3 data in hsk3_generated_raw.json");
  } catch (e) {
    console.error("Error generating data:", e);
  }
}

main();
