import { GoogleGenAI } from "@google/genai";
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
  { order: 18, title: 'Bài 18: 我相信他们会同意的 (Tôi tin họ sẽ đồng ý)', description: 'Bày tỏ sự tự tin, thuyết phục đối tác hoặc người khác đồng ý với kế hoạch.' },
  { order: 19, title: 'Bài 19: 你没看出来吗 (Bạn không nhìn ra sao)', description: 'Diễn tả sự ngạc nhiên, nhận ra sự thay đổi ở người khác hoặc sự việc xung quanh.' },
  { order: 20, title: 'Bài 20: 我被他影响了 (Tôi bị anh ấy ảnh hưởng rồi)', description: 'Sử dụng câu chữ "被" biểu thị tác động bị động, thay đổi thói quen tốt từ người khác.' }
];

async function parseBatchWithGemini(batchNum, rawTextSegment) {
  console.log(`Sending batch ${batchNum} to Gemini for parsing...`);

  const prompt = `You are a professional Chinese language educator. I have a raw file of HSK 3 lessons containing Vocabulary, Dialogues (Bài khóa), and Grammar points in Vietnamese.
I want you to parse this exact raw text into a clean, structured JSON object.

Here is the raw text to parse:
"""
${rawTextSegment}
"""

Please return a valid JSON object matching this schema:
{
  "lessons": [
    {
      "lessonNumber": number,
      "vocabulary": [
        {
          "word": "Chinese characters",
          "pinyin": "pinyin with tones",
          "meaning": "Vietnamese translation"
        }
      ],
      "dialogues": [
        {
          "title": "Dialogue title in Chinese and Vietnamese (e.g. '1. 谈周末的打算 (Nói về dự định cuối tuần)')",
          "lines": [
            {
              "speaker": "A",
              "chinese": "Chinese characters",
              "pinyin": "Pinyin with tones",
              "vietnamese": "Vietnamese translation"
            }
          ]
        }
      ],
      "grammar": [
        {
          "title": "Grammar point title in Vietnamese with exact numbering",
          "examples": [
            {
              "chinese": "Chinese characters",
              "pinyin": "Pinyin with tones",
              "vietnamese": "Vietnamese translation"
            }
          ]
        }
      ]
    }
  ]
}

STRICT RULE:
1. Do not correct any text. Use the EXACT text (Vietnamese meaning, Chinese character, speaker, and Pinyin) provided in the prompt. Do not abbreviate or skip any words, dialogues, or grammar points.
2. Ensure there are no JSON syntax errors. Output raw JSON only. Do not wrap inside markdown codeblocks (no \`\`\`json).`;

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
      console.warn(`Attempt ${attempt} failed for batch ${batchNum}: ${e.message}`);
      if (attempt === retries) {
        throw e;
      }
      console.log(`Waiting ${delay}ms before retrying...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      delay *= 2;
    }
  }

  const text = response.text;
  try {
    return JSON.parse(text);
  } catch (error) {
    console.error(`Failed to parse JSON for batch ${batchNum}:`, error);
    console.log("Raw output was:", text);
    throw error;
  }
}

async function main() {
  const rawText = fs.readFileSync('user_hsk3_raw_input.txt', 'utf-8');

  // Split raw text into 4 logical chunks
  // Batch 1: Lessons 1 to 5 (Vocab & Dialogues) + Grammar 1 to 5
  // Batch 2: Lessons 6 to 10 (Vocab & Dialogues) + Grammar 6 to 10
  // Batch 3: Lessons 11 to 15 (Vocab & Dialogues) + Grammar 11 to 15
  // Batch 4: Lessons 16 to 20 (Vocab & Dialogues) + Grammar 16 to 20

  const segments = [
    // Segment 1 (1-5)
    {
      num: 1,
      text: rawText.substring(0, rawText.indexOf("Bài 6: ")) + "\n\n" + 
            rawText.substring(rawText.indexOf("Bài 1: 周末你有什么打算\n1. Bổ ngữ kết quả"), rawText.indexOf("Bài 6: 怎么突然找不到了\n1. Bổ ngữ khả năng"))
    },
    // Segment 2 (6-10)
    {
      num: 2,
      text: rawText.substring(rawText.indexOf("Bài 6: "), rawText.indexOf("Bài 11: ")) + "\n\n" + 
            rawText.substring(rawText.indexOf("Bài 6: 怎么突然找不到了\n1. Bổ ngữ khả năng"), rawText.indexOf("Bài 11: 别忘了把空调关了"))
    },
    // Segment 3 (11-15)
    {
      num: 3,
      text: rawText.substring(rawText.indexOf("Bài 11: "), rawText.indexOf("Bài 16: ")) + "\n\n" + 
            rawText.substring(rawText.indexOf("Bài 11: 别忘了把空调关了"), rawText.indexOf("Bài 16: 我现在累得下了班就想睡觉\n1."))
    },
    // Segment 4 (16-20)
    {
      num: 4,
      text: rawText.substring(rawText.indexOf("Bài 16: "), rawText.indexOf("======================== GRAMMAR SECTOR ========================")) + "\n\n" + 
            rawText.substring(rawText.indexOf("Bài 16: 我现在累得下了班就想睡觉\n1."))
    }
  ];

  const parsedLessons = [];

  for (const seg of segments) {
    const res = await parseBatchWithGemini(seg.num, seg.text);
    parsedLessons.push(...res.lessons);
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  // Double check that we have exactly 20 lessons
  console.log(`Successfully parsed ${parsedLessons.length} lessons from Gemini.`);

  // Write out raw JSON to a backup file
  fs.writeFileSync('user_hsk3_parsed_final.json', JSON.stringify(parsedLessons, null, 2), 'utf-8');
  console.log("Saved raw parsed content to user_hsk3_parsed_final.json");

  // INTEGRATE INTO TS FILES
  console.log("Integrating HSK 3 Topics & Words into vocabulary.ts...");
  let vocabularyTs = fs.readFileSync('src/data/vocabulary.ts', 'utf-8');

  // Format 20 topics
  const hsk3TopicsFormatted = LESSONS_METADATA.map(l => {
    const titleMatch = l.title.match(/Bài \d+: (.*?) \((.*?)\)/);
    const chinesePart = titleMatch ? titleMatch[1].trim() : "HSK 3";
    const vnPart = titleMatch ? titleMatch[2].trim() : "HSK 3";
    return `  { id: 'top_hsk3_${String(l.order).padStart(2, '0')}', hskLevel: 3, title: '${l.title.replace(/'/g, "\\'")}', vietnameseTitle: '第${l.order}课：${chinesePart.replace(/'/g, "\\'")} (${vnPart.replace(/'/g, "\\'")})', description: '${l.description.replace(/'/g, "\\'")}', order: ${l.order} }`;
  }).join(',\n');

  // Replace topics block in vocabulary.ts
  const tStartIdx = vocabularyTs.indexOf("top_hsk3_01");
  const tEndIdx = vocabularyTs.indexOf("top_hsk3_20");

  if (tStartIdx !== -1 && tEndIdx !== -1) {
    let braceStart = vocabularyTs.lastIndexOf('{', tStartIdx);
    let braceEnd = vocabularyTs.indexOf('},', tEndIdx) + 2;
    vocabularyTs = vocabularyTs.substring(0, braceStart) + hsk3TopicsFormatted + vocabularyTs.substring(braceEnd);
  }

  // Format words list
  const hsk3WordsList = [];
  parsedLessons.forEach(l => {
    l.vocabulary.forEach(w => {
      hsk3WordsList.push({
        word: w.word.trim(),
        pinyin: w.pinyin.trim(),
        meaning: w.meaning.trim(),
        topicIdx: l.lessonNumber
      });
    });
  });

  const wordsListFormatted = `export const HSK_3_WORDS_LIST = [\n` + hsk3WordsList.map(w => {
    return `  { word: '${w.word.replace(/'/g, "\\'")}', pinyin: '${w.pinyin.replace(/'/g, "\\'")}', meaning: '${w.meaning.replace(/'/g, "\\'")}', topicIdx: ${w.topicIdx} }`;
  }).join(',\n') + `\n];`;

  // Replace words list block in vocabulary.ts
  const wStartIdx = vocabularyTs.indexOf("export const HSK_3_WORDS_LIST = [");
  const wEndIdx = vocabularyTs.indexOf("// 5. HÀM TRÍCH XUẤT TỪ VỰNG THEO LỘ TRÌNH");

  if (wStartIdx !== -1 && wEndIdx !== -1) {
    vocabularyTs = vocabularyTs.substring(0, wStartIdx) + wordsListFormatted + "\n\n" + vocabularyTs.substring(wEndIdx);
  } else {
    console.error("Could not find boundaries for HSK_3_WORDS_LIST in vocabulary.ts");
  }

  fs.writeFileSync('src/data/vocabulary.ts', vocabularyTs, 'utf-8');
  console.log("vocabulary.ts integrated successfully!");

  // DIALOGUES INTEGRATION
  console.log("Integrating HSK 3 Dialogues into dialogues.ts...");
  let dialoguesTs = fs.readFileSync('src/data/dialogues.ts', 'utf-8');

  // Format dialogues
  const hsk3DialoguesFormatted = parsedLessons.map(l => {
    const topicId = `top_hsk3_${String(l.lessonNumber).padStart(2, '0')}`;
    const formattedGroups = l.dialogues.map(d => {
      const linesFormatted = d.lines.map(line => {
        return `          {
            "speaker": "${line.speaker}",
            "chinese": "${line.chinese.replace(/"/g, '\\"')}",
            "pinyin": "${line.pinyin.replace(/"/g, '\\"')}",
            "vietnamese": "${line.vietnamese.replace(/"/g, '\\"')}"
          }`;
      }).join(',\n');
      return `      {
        "title": "${d.title.replace(/"/g, '\\"')}",
        "lines": [\n${linesFormatted}\n        ]
      }`;
    }).join(',\n');

    return `  {
    "topicId": "${topicId}",
    "dialogues": [\n${formattedGroups}\n    ]\n  }`;
  }).join(',\n');

  // We find "top_hsk3_01" in dialogues.ts. If it already exists, let's remove everything from "top_hsk3_01" to the end of TOPIC_DIALOGUES
  const dStartIdx = dialoguesTs.indexOf('"topicId": "top_hsk3_01"');
  if (dStartIdx !== -1) {
    // Find the opening brace of top_hsk3_01
    const braceStart = dialoguesTs.lastIndexOf('{', dStartIdx);
    const endBracketIdx = dialoguesTs.lastIndexOf('];');
    dialoguesTs = dialoguesTs.substring(0, braceStart) + hsk3DialoguesFormatted + "\n];\n";
  } else {
    // Just append
    const lastBracketIdx = dialoguesTs.lastIndexOf('];');
    if (lastBracketIdx !== -1) {
      dialoguesTs = dialoguesTs.substring(0, lastBracketIdx).trim() + ",\n" + hsk3DialoguesFormatted + "\n];\n";
    }
  }

  fs.writeFileSync('src/data/dialogues.ts', dialoguesTs, 'utf-8');
  console.log("dialogues.ts integrated successfully!");

  // GRAMMAR INTEGRATION
  console.log("Integrating HSK 3 Grammar into grammar.ts...");
  let grammarTs = fs.readFileSync('src/data/grammar.ts', 'utf-8');

  // Format Grammar
  const hsk3GrammarFormatted = parsedLessons.map(l => {
    const topicId = `top_hsk3_${String(l.lessonNumber).padStart(2, '0')}`;
    const formattedPoints = l.grammar.map(gp => {
      const examplesFormatted = gp.examples.map(ex => {
        return `          {
            "chinese": "${ex.chinese.replace(/"/g, '\\"')}",
            "pinyin": "${ex.pinyin.replace(/"/g, '\\"')}",
            "vietnamese": "${ex.vietnamese.replace(/"/g, '\\"')}"
          }`;
      }).join(',\n');
      return `      {
        "title": "${gp.title.replace(/"/g, '\\"')}",
        "examples": [\n${examplesFormatted}\n        ]
      }`;
    }).join(',\n');

    return `  {
    "topicId": "${topicId}",
    "grammarPoints": [\n${formattedPoints}\n    ]\n  }`;
  }).join(',\n');

  const gStartIdx = grammarTs.indexOf('"topicId": "top_hsk3_01"');
  if (gStartIdx !== -1) {
    const braceStart = grammarTs.lastIndexOf('{', gStartIdx);
    grammarTs = grammarTs.substring(0, braceStart) + hsk3GrammarFormatted + "\n];\n";
  } else {
    const lastGrammarBracketIdx = grammarTs.lastIndexOf('];');
    if (lastGrammarBracketIdx !== -1) {
      grammarTs = grammarTs.substring(0, lastGrammarBracketIdx).trim() + ",\n" + hsk3GrammarFormatted + "\n];\n";
    }
  }

  fs.writeFileSync('src/data/grammar.ts', grammarTs, 'utf-8');
  console.log("grammar.ts integrated successfully!");
  console.log("ALL HSK3 USER TRANSLATIONS SUCCESSFULLY INTEGRATED!");
}

main().catch(console.error);
