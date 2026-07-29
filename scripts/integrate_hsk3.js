import fs from 'fs';

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
  { order: 18, title: 'Bài 18: 我相信 họ sẽ đồng ý (Tôi tin họ sẽ đồng ý)', description: 'Bày tỏ sự tự tin, thuyết phục đối tác hoặc người khác đồng ý với kế hoạch.' },
  { order: 19, title: 'Bài 19: 你没看出来吗 (Bạn không nhìn ra sao)', description: 'Diễn tả sự ngạc nhiên, nhận ra sự thay đổi ở người khác hoặc sự việc xung quanh.' },
  { order: 20, title: 'Bài 20: 我被他影响了 (Tôi bị anh ấy ảnh hưởng rồi)', description: 'Sử dụng câu chữ "被" biểu thị tác động bị động, thay đổi thói quen tốt từ người khác.' }
];

function cleanTitle(title) {
  // Extract Vietnamese from inside parentheses if exists, otherwise clean it
  const match = title.match(/Bài \d+: (.*?) \((.*?)\)/);
  if (match) {
    return `Bài ${match[1].trim()} (${match[2].trim()})`;
  }
  return title;
}

function run() {
  const rawData = JSON.parse(fs.readFileSync('hsk3_generated_raw.json', 'utf-8'));
  console.log(`Loaded HSK 3 dataset with ${rawData.length} lessons.`);

  // 1. INTEGRATE VOCABULARY
  console.log("Integrating HSK 3 Vocabulary...");
  let vocabularyTs = fs.readFileSync('src/data/vocabulary.ts', 'utf-8');

  // Format 20 topics
  const hsk3TopicsFormatted = LESSONS_METADATA.map(l => {
    const rawLesson = rawData.find(r => r.lessonNumber === l.order) || {};
    const titleMatch = l.title.match(/Bài \d+: (.*?) \((.*?)\)/);
    const chinesePart = titleMatch ? titleMatch[1].trim() : "HSK 3";
    const vnPart = titleMatch ? titleMatch[2].trim() : "HSK 3";
    return `  { id: 'top_hsk3_${String(l.order).padStart(2, '0')}', hskLevel: 3, title: '${l.title}', vietnameseTitle: '第${l.order}课：${chinesePart} (${vnPart})', description: '${l.description}', order: ${l.order} }`;
  }).join(',\n');

  // Replace target block of topics
  const startTopicStr = "{ id: 'top_hsk3_01', hskLevel: 3, title: 'Cuộc sống & Mối quan hệ', vietnameseTitle: '生活与社会社交', description: 'Giao lưu trò chuyện kết duyên hữu hảo.', order: 1 },";
  const endTopicStr = "{ id: 'top_hsk3_07', hskLevel: 3, title: 'Bày tỏ quan điểm', vietnameseTitle: '发表观点与论证', description: 'Nói thẳng nói thật chính kiến phân minh.', order: 7 },";

  // Let's do index search as it is much safer than strict matches if there are any tiny whitespace mismatches
  const startIdx = vocabularyTs.indexOf("top_hsk3_01");
  const endIdx = vocabularyTs.indexOf("top_hsk3_07");

  if (startIdx !== -1 && endIdx !== -1) {
    // find opening brace before top_hsk3_01
    let braceStart = vocabularyTs.lastIndexOf('{', startIdx);
    // find closing brace and comma after top_hsk3_07
    let braceEnd = vocabularyTs.indexOf('},', endIdx) + 2;
    
    vocabularyTs = vocabularyTs.substring(0, braceStart) + hsk3TopicsFormatted + vocabularyTs.substring(braceEnd);
    console.log("Successfully replaced HSK 3 Topics!");
  } else {
    console.warn("Could not locate the exact topic boundary by index. Trying direct replace...");
    // Fallback direct string replace (just in case)
    const blockToReplace = vocabularyTs.substring(vocabularyTs.indexOf("{ id: 'top_hsk3_01'"), vocabularyTs.indexOf("...AUTOMATION_TOPICS") - 4);
    vocabularyTs = vocabularyTs.replace(blockToReplace, hsk3TopicsFormatted + ",\n");
  }

  // Format words list
  const hsk3WordsList = [];
  rawData.forEach(l => {
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

  // Find boundaries of HSK_3_WORDS_LIST in vocabulary.ts
  const wordsStartStr = "export const HSK_3_WORDS_LIST = [";
  const wordsEndStr = "// 5. HÀM TRÍCH XUẤT TỪ VỰNG THEO LỘ TRÌNH";
  const wStartIdx = vocabularyTs.indexOf(wordsStartStr);
  const wEndIdx = vocabularyTs.indexOf(wordsEndStr);

  if (wStartIdx !== -1 && wEndIdx !== -1) {
    vocabularyTs = vocabularyTs.substring(0, wStartIdx) + wordsListFormatted + "\n\n" + vocabularyTs.substring(wEndIdx);
    console.log("Successfully replaced HSK 3 Words List!");
  } else {
    console.error("Could not find boundaries for HSK_3_WORDS_LIST in vocabulary.ts");
  }

  fs.writeFileSync('src/data/vocabulary.ts', vocabularyTs, 'utf-8');

  // 2. INTEGRATE DIALOGUES
  console.log("Integrating HSK 3 Dialogues...");
  let dialoguesTs = fs.readFileSync('src/data/dialogues.ts', 'utf-8');

  // Format Dialogues
  const hsk3DialoguesFormatted = rawData.map(l => {
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

  // We want to insert this before the final closing "];" in TOPIC_DIALOGUES
  // dialoguesTs ends with "];\n"
  const lastBracketIdx = dialoguesTs.lastIndexOf('];');
  if (lastBracketIdx !== -1) {
    // We add a comma before inserting
    dialoguesTs = dialoguesTs.substring(0, lastBracketIdx).trim() + ",\n" + hsk3DialoguesFormatted + "\n];\n";
    fs.writeFileSync('src/data/dialogues.ts', dialoguesTs, 'utf-8');
    console.log("Successfully appended HSK 3 dialogues to dialogues.ts");
  } else {
    console.error("Could not find the trailing '];' in dialogues.ts!");
  }

  // 3. INTEGRATE GRAMMAR
  console.log("Integrating HSK 3 Grammar...");
  let grammarTs = fs.readFileSync('src/data/grammar.ts', 'utf-8');

  // Format Grammar
  const hsk3GrammarFormatted = rawData.map(l => {
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

  const lastGrammarBracketIdx = grammarTs.lastIndexOf('];');
  if (lastGrammarBracketIdx !== -1) {
    grammarTs = grammarTs.substring(0, lastGrammarBracketIdx).trim() + ",\n" + hsk3GrammarFormatted + "\n];\n";
    fs.writeFileSync('src/data/grammar.ts', grammarTs, 'utf-8');
    console.log("Successfully appended HSK 3 grammar points to grammar.ts");
  } else {
    console.error("Could not find the trailing '];' in grammar.ts!");
  }

  console.log("HSK 3 Integration completely finished successfully!");
}

run();
