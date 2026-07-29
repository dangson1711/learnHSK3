import fs from 'fs';
import path from 'path';

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

function cleanString(str) {
  if (!str) return '';
  return str.trim();
}

function mergeLessons() {
  const rawData = JSON.parse(fs.readFileSync('user_hsk3_parsed_final.json', 'utf-8'));

  const finalLessonsMap = new Map();

  for (const record of rawData) {
    const num = record.lessonNumber;
    if (!num) continue;

    if (!finalLessonsMap.has(num)) {
      finalLessonsMap.set(num, {
        lessonNumber: num,
        vocabulary: [],
        dialogues: [],
        grammar: []
      });
    }

    const currentMerged = finalLessonsMap.get(num);

    // Merge vocabulary (deduplicate by the word)
    if (record.vocabulary && record.vocabulary.length > 0) {
      for (const w of record.vocabulary) {
        const cleanedWord = cleanString(w.word);
        if (!cleanedWord) continue;
        const exists = currentMerged.vocabulary.find(item => cleanString(item.word) === cleanedWord);
        if (!exists) {
          currentMerged.vocabulary.push({
            word: cleanedWord,
            pinyin: cleanString(w.pinyin),
            meaning: cleanString(w.meaning)
          });
        }
      }
    }

    // Merge dialogues (deduplicate by dialogue title / comparison)
    if (record.dialogues && record.dialogues.length > 0) {
      for (const d of record.dialogues) {
        const cleanedTitle = cleanString(d.title);
        if (!cleanedTitle) continue;
        const exists = currentMerged.dialogues.find(item => cleanString(item.title) === cleanedTitle);
        if (!exists) {
          currentMerged.dialogues.push(d);
        } else {
          // If already exists, make sure the lines are complete
          if (d.lines && d.lines.length > exists.lines.length) {
            exists.lines = d.lines;
          }
        }
      }
    }

    // Merge grammar points (deduplicate by title)
    if (record.grammar && record.grammar.length > 0) {
      for (const g of record.grammar) {
        const cleanedTitle = cleanString(g.title);
        if (!cleanedTitle) continue;
        const exists = currentMerged.grammar.find(item => cleanString(item.title) === cleanedTitle);
        if (!exists) {
          currentMerged.grammar.push(g);
        } else {
          if (g.examples && g.examples.length > exists.examples.length) {
            exists.examples = g.examples;
          }
        }
      }
    }
  }

  const mergedLessonsList = [];
  for (let i = 1; i <= 20; i++) {
    const les = finalLessonsMap.get(i);
    if (les) {
      mergedLessonsList.push(les);
    } else {
      console.warn(`Warning: Lesson ${i} was not found in parsed data!`);
    }
  }

  // Save the clean merged lessons
  fs.writeFileSync('user_hsk3_merged_clean.json', JSON.stringify(mergedLessonsList, null, 2), 'utf-8');
  console.log(`Merged exactly ${mergedLessonsList.length} lessons successfully into user_hsk3_merged_clean.json`);

  // Print statistics
  mergedLessonsList.forEach(l => {
    console.log(`Lesson ${l.lessonNumber}: ${l.vocabulary.length} words, ${l.dialogues.length} dialogues, ${l.grammar.length} grammar points`);
  });

  return mergedLessonsList;
}

function integrate() {
  const mergedLessons = mergeLessons();

  // 1. INTEGRATE INTO vocabulary.ts
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
  mergedLessons.forEach(l => {
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

  // 2. DIALOGUES INTEGRATION
  console.log("Integrating HSK 3 Dialogues into dialogues.ts...");
  let dialoguesTs = fs.readFileSync('src/data/dialogues.ts', 'utf-8');

  // Format dialogues
  const hsk3DialoguesFormatted = mergedLessons.map(l => {
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
    const braceStart = dialoguesTs.lastIndexOf('{', dStartIdx);
    const endBracketIdx = dialoguesTs.lastIndexOf('];');
    dialoguesTs = dialoguesTs.substring(0, braceStart) + hsk3DialoguesFormatted + "\n];\n";
  } else {
    const lastBracketIdx = dialoguesTs.lastIndexOf('];');
    if (lastBracketIdx !== -1) {
      dialoguesTs = dialoguesTs.substring(0, lastBracketIdx).trim() + ",\n" + hsk3DialoguesFormatted + "\n];\n";
    }
  }

  fs.writeFileSync('src/data/dialogues.ts', dialoguesTs, 'utf-8');
  console.log("dialogues.ts integrated successfully!");

  // 3. GRAMMAR INTEGRATION
  console.log("Integrating HSK 3 Grammar into grammar.ts...");
  let grammarTs = fs.readFileSync('src/data/grammar.ts', 'utf-8');

  // Format Grammar
  const hsk3GrammarFormatted = mergedLessons.map(l => {
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
  console.log("ALL DATA INTEGRATION COMPLETED SUCCESSFULLY!");
}

integrate();
