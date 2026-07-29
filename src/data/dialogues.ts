export interface DialogueLine {
  speaker: string;
  chinese: string;
  pinyin: string;
  vietnamese: string;
}

export interface DialogueGroup {
  title?: string;
  lines: DialogueLine[];
}

export interface TopicDialogue {
  topicId: string;
  dialogues: DialogueGroup[];
}

export const TOPIC_DIALOGUES: TopicDialogue[] = [
  {
    "topicId": "top_hsk1_01",
    "dialogues": [
      {
        "lines": [
          {
            "speaker": "A",
            "chinese": "你好！",
            "pinyin": "Nǐ hǎo!",
            "vietnamese": "Xin chào!"
          },
          {
            "speaker": "B",
            "chinese": "你好！",
            "pinyin": "Nǐ hǎo!",
            "vietnamese": "Xin chào!"
          }
        ]
      },
      {
        "lines": [
          {
            "speaker": "A",
            "chinese": "您好！",
            "pinyin": "Nín hǎo!",
            "vietnamese": "Chào ngài/ông/bà!"
          },
          {
            "speaker": "B",
            "chinese": "你们好！",
            "pinyin": "Nǐmen hǎo!",
            "vietnamese": "Chào các bạn!"
          }
        ]
      },
      {
        "lines": [
          {
            "speaker": "A",
            "chinese": "对不起！",
            "pinyin": "Duìbuqǐ!",
            "vietnamese": "Xin lỗi!"
          },
          {
            "speaker": "B",
            "chinese": "没关系！",
            "pinyin": "Méi guānxi!",
            "vietnamese": "Không sao đâu!"
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk1_02",
    "dialogues": [
      {
        "lines": [
          {
            "speaker": "A",
            "chinese": "谢谢！",
            "pinyin": "Xièxie!",
            "vietnamese": "Cảm ơn!"
          },
          {
            "speaker": "B",
            "chinese": "不谢！",
            "pinyin": "Bú xiè!",
            "vietnamese": "Không có gì!"
          }
        ]
      },
      {
        "lines": [
          {
            "speaker": "A",
            "chinese": "谢谢你！",
            "pinyin": "Xièxie nǐ!",
            "vietnamese": "Cảm ơn bạn!"
          },
          {
            "speaker": "B",
            "chinese": "不客气！",
            "pinyin": "Bú kèqi!",
            "vietnamese": "Đừng khách sáo!"
          }
        ]
      },
      {
        "lines": [
          {
            "speaker": "A",
            "chinese": "再见！",
            "pinyin": "Zàijiàn!",
            "vietnamese": "Tạm biệt!"
          },
          {
            "speaker": "B",
            "chinese": "再见！",
            "pinyin": "Zàijiàn!",
            "vietnamese": "Tạm biệt!"
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk1_03",
    "dialogues": [
      {
        "lines": [
          {
            "speaker": "A",
            "chinese": "你叫什么名字？",
            "pinyin": "Nǐ jiào shénme míngzi?",
            "vietnamese": "Bạn tên là gì?"
          },
          {
            "speaker": "B",
            "chinese": "我叫李月。",
            "pinyin": "Wǒ jiào Lǐ Yuè.",
            "vietnamese": "Tôi tên là Lý Nguyệt."
          }
        ]
      },
      {
        "lines": [
          {
            "speaker": "A",
            "chinese": "你是老师吗？",
            "pinyin": "Nǐ shì lǎoshī ma?",
            "vietnamese": "Bạn là giáo viên phải không?"
          },
          {
            "speaker": "B",
            "chinese": "我不是老师，我是学生。",
            "pinyin": "Wǒ bú shì lǎoshī, wǒ shì xuésheng.",
            "vietnamese": "Tôi không phải là giáo viên, tôi là học sinh."
          }
        ]
      },
      {
        "lines": [
          {
            "speaker": "A",
            "chinese": "你是中国人吗？",
            "pinyin": "Nǐ shì Zhōngguó rén ma?",
            "vietnamese": "Bạn là người Trung Quốc phải không?"
          },
          {
            "speaker": "B",
            "chinese": "我不是中国人，我是美国人。",
            "pinyin": "Wǒ bú shì Zhōngguó rén, wǒ shì Měiguó rén.",
            "vietnamese": "Tôi không phải người Trung Quốc, tôi là người Mỹ."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk1_04",
    "dialogues": [
      {
        "lines": [
          {
            "speaker": "A",
            "chinese": "她是谁？",
            "pinyin": "Tā shì shéi?",
            "vietnamese": "Cô ấy là ai?"
          },
          {
            "speaker": "B",
            "chinese": "她是我的汉语老师，她叫李月。",
            "pinyin": "Tā shì wǒ de Hànyǔ lǎoshī, tā jiào Lǐ Yuè.",
            "vietnamese": "Cô ấy là giáo viên tiếng Trung của tôi, cô ấy tên là Lý Nguyệt."
          }
        ]
      },
      {
        "lines": [
          {
            "speaker": "A",
            "chinese": "你是哪国人？",
            "pinyin": "Nǐ shì nǎ guó rén?",
            "vietnamese": "Bạn là người nước nào?"
          },
          {
            "speaker": "B",
            "chinese": "我是美国人。你呢？",
            "pinyin": "Wǒ shì Měiguó rén. Nǐ ne?",
            "vietnamese": "Tôi là người Mỹ. Còn bạn thì sao?"
          },
          {
            "speaker": "A",
            "chinese": "我是中国人。",
            "pinyin": "Wǒ shì Zhōngguó rén.",
            "vietnamese": "Tôi là người Trung Quốc."
          }
        ]
      },
      {
        "lines": [
          {
            "speaker": "A",
            "chinese": "他是谁？",
            "pinyin": "Tā shì shéi?",
            "vietnamese": "Cậu ấy là ai?"
          },
          {
            "speaker": "B",
            "chinese": "他是我同学。",
            "pinyin": "Tā shì wǒ tóngxué.",
            "vietnamese": "Cậu ấy là bạn học của tôi."
          },
          {
            "speaker": "A",
            "chinese": "她呢？她是你同学吗？",
            "pinyin": "Tā ne? Tā shì nǐ tóngxué ma?",
            "vietnamese": "Còn cô ấy? Cô ấy có phải là bạn học của bạn không?"
          },
          {
            "speaker": "B",
            "chinese": "她不是我同学，她是我朋友。",
            "pinyin": "Tā bú shì wǒ tóngxué, tā shì wǒ péngyou.",
            "vietnamese": "Cô ấy không phải là bạn học của tôi, cô ấy là bạn của tôi."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk1_05",
    "dialogues": [
      {
        "lines": [
          {
            "speaker": "A",
            "chinese": "你家有几口人？",
            "pinyin": "Nǐ jiā yǒu jǐ kǒu rén?",
            "vietnamese": "Nhà bạn có mấy người?"
          },
          {
            "speaker": "B",
            "chinese": "我家有三口人。",
            "pinyin": "Wǒ jiā yǒu sān kǒu rén.",
            "vietnamese": "Nhà tôi có ba người."
          }
        ]
      },
      {
        "lines": [
          {
            "speaker": "A",
            "chinese": "你女儿几岁了？",
            "pinyin": "Nǐ nǚ'ér jǐ suì le?",
            "vietnamese": "Con gái bạn mấy tuổi rồi?"
          },
          {
            "speaker": "B",
            "chinese": "她今年四岁了。",
            "pinyin": "Tā jīnnián sì suì le.",
            "vietnamese": "Năm nay bé 4 tuổi rồi."
          }
        ]
      },
      {
        "lines": [
          {
            "speaker": "A",
            "chinese": "李老师多大了？",
            "pinyin": "Lǐ lǎoshī duōdà le?",
            "vietnamese": "Cô Lý bao nhiêu tuổi rồi?"
          },
          {
            "speaker": "B",
            "chinese": "她今年五十岁了。",
            "pinyin": "Tā jīnnián wǔshí suì le.",
            "vietnamese": "Năm nay cô ấy 50 tuổi rồi."
          },
          {
            "speaker": "A",
            "chinese": "她女儿呢？",
            "pinyin": "Tā nǚ'ér ne?",
            "vietnamese": "Con gái cô ấy thì sao?"
          },
          {
            "speaker": "B",
            "chinese": "她女儿今年二十岁。",
            "pinyin": "Tā nǚ'ér jīnnián èrshí suì.",
            "vietnamese": "Con gái cô ấy năm nay 20 tuổi."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk1_06",
    "dialogues": [
      {
        "lines": [
          {
            "speaker": "A",
            "chinese": "你会说汉语吗？",
            "pinyin": "Nǐ huì shuō Hànyǔ ma?",
            "vietnamese": "Bạn biết nói tiếng Hán không?"
          },
          {
            "speaker": "B",
            "chinese": "我会说汉语。",
            "pinyin": "Wǒ huì shuō Hànyǔ.",
            "vietnamese": "Tôi biết nói tiếng Hán."
          },
          {
            "speaker": "A",
            "chinese": "你妈妈会说汉语吗？",
            "pinyin": "Nǐ māma huì shuō Hànyǔ ma?",
            "vietnamese": "Mẹ của bạn có biết nói tiếng Hán không?"
          },
          {
            "speaker": "B",
            "chinese": "她不会说。",
            "pinyin": "Tā bú huì shuō.",
            "vietnamese": "Bà ấy không biết nói."
          }
        ]
      },
      {
        "lines": [
          {
            "speaker": "A",
            "chinese": "中国菜好吃吗？",
            "pinyin": "Zhōngguó cài hǎochī ma?",
            "vietnamese": "Món ăn Trung Quốc ngon không?"
          },
          {
            "speaker": "B",
            "chinese": "中国菜很好吃。",
            "pinyin": "Zhōngguó cài hěn hǎochī.",
            "vietnamese": "Món ăn Trung Quốc rất ngon."
          },
          {
            "speaker": "A",
            "chinese": "你会做中国菜吗？",
            "pinyin": "Nǐ huì zuò Zhōngguó cài ma?",
            "vietnamese": "Bạn biết nấu món ăn Trung Quốc không?"
          },
          {
            "speaker": "B",
            "chinese": "我不会做。",
            "pinyin": "Wǒ bú huì zuò.",
            "vietnamese": "Tôi không biết nấu."
          }
        ]
      },
      {
        "lines": [
          {
            "speaker": "A",
            "chinese": "你会写汉字吗？",
            "pinyin": "Nǐ huì xiě Hànzì ma?",
            "vietnamese": "Bạn biết viết chữ Hán không?"
          },
          {
            "speaker": "B",
            "chinese": "我会写。",
            "pinyin": "Wǒ huì xiě.",
            "vietnamese": "Tôi biết viết."
          },
          {
            "speaker": "A",
            "chinese": "这个字怎么写？",
            "pinyin": "Zhège zì zěnme xiě?",
            "vietnamese": "Chữ này viết như thế nào?"
          },
          {
            "speaker": "B",
            "chinese": "对不起，这个字我会读，不会写。",
            "pinyin": "Duìbuqǐ, zhège zì wǒ huì dú, bú huì xiě.",
            "vietnamese": "Xin lỗi, chữ này tôi biết đọc, không biết viết."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk1_07",
    "dialogues": [
      {
        "lines": [
          {
            "speaker": "A",
            "chinese": "请问，今天几号？",
            "pinyin": "Qǐngwèn, jīntiān jǐ hào?",
            "vietnamese": "Xin hỏi, hôm nay là ngày mấy?"
          },
          {
            "speaker": "B",
            "chinese": "今天9月1号。",
            "pinyin": "Jīntiān jiǔ yuè yī hào.",
            "vietnamese": "Hôm nay là ngày 1 tháng 9."
          },
          {
            "speaker": "A",
            "chinese": "今天星期几？",
            "pinyin": "Jīntiān xīngqī jǐ?",
            "vietnamese": "Hôm nay là thứ mấy?"
          },
          {
            "speaker": "B",
            "chinese": "星期三。",
            "pinyin": "Xīngqī sān.",
            "vietnamese": "Thứ tư."
          }
        ]
      },
      {
        "lines": [
          {
            "speaker": "A",
            "chinese": "昨天是几月几号？",
            "pinyin": "Zuótiān shì jǐ yuè jǐ hào?",
            "vietnamese": "Hôm qua là ngày mấy tháng mấy?"
          },
          {
            "speaker": "B",
            "chinese": "昨天是8月31号，星期二。",
            "pinyin": "Zuótiān shì bā yuè sānshíyī hào, xīngqī'èr.",
            "vietnamese": "Hôm qua là ngày 31 tháng 8, thứ ba."
          },
          {
            "speaker": "A",
            "chinese": "明天呢？",
            "pinyin": "Míngtiān ne?",
            "vietnamese": "Ngày mai thì sao?"
          },
          {
            "speaker": "B",
            "chinese": "明天是9月2号，星期四。",
            "pinyin": "Míngtiān shì jiǔ yuè èr hào, xīngqīsì.",
            "vietnamese": "Ngày mai là ngày 2 tháng 9, thứ năm."
          }
        ]
      },
      {
        "lines": [
          {
            "speaker": "A",
            "chinese": "明天星期六，你去学校吗？",
            "pinyin": "Míngtiān xīngqīliù, nǐ qù xuéxiào ma?",
            "vietnamese": "Ngày mai thứ bảy, bạn có đi đến trường không?"
          },
          {
            "speaker": "B",
            "chinese": "我去学校。",
            "pinyin": "Wǒ qù xuéxiào.",
            "vietnamese": "Tôi đi đến trường."
          },
          {
            "speaker": "A",
            "chinese": "你去学校做什么？",
            "pinyin": "Nǐ qù xuéxiào zuò shénme?",
            "vietnamese": "Bạn đến trường làm gì?"
          },
          {
            "speaker": "B",
            "chinese": "我去学校看书。",
            "pinyin": "Wǒ qù xuéxiào kàn shū.",
            "vietnamese": "Tôi đến trường đọc sách."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk1_08",
    "dialogues": [
      {
        "lines": [
          {
            "speaker": "A",
            "chinese": "你想喝什么？",
            "pinyin": "Nǐ xiǎng hē shénme?",
            "vietnamese": "Bạn muốn uống gì?"
          },
          {
            "speaker": "B",
            "chinese": "我想喝茶。",
            "pinyin": "Wǒ xiǎng hē chá.",
            "vietnamese": "Tôi muốn uống trà."
          },
          {
            "speaker": "A",
            "chinese": "你想吃什么？",
            "pinyin": "Nǐ xiǎng chī shénme?",
            "vietnamese": "Bạn muốn ăn gì?"
          },
          {
            "speaker": "B",
            "chinese": "我想吃米饭。",
            "pinyin": "Wǒ xiǎng chī mǐfàn.",
            "vietnamese": "Tôi muốn ăn cơm."
          }
        ]
      },
      {
        "lines": [
          {
            "speaker": "A",
            "chinese": "下午你想做什么？",
            "pinyin": "Xiàwǔ nǐ xiǎng zuò shénme?",
            "vietnamese": "Buổi chiều bạn muốn làm gì?"
          },
          {
            "speaker": "B",
            "chinese": "下午我想去商店。",
            "pinyin": "Xiàwǔ wǒ xiǎng qù shāngdiàn.",
            "vietnamese": "Buổi chiều tôi muốn đi cửa hàng."
          },
          {
            "speaker": "A",
            "chinese": "你想买什么？",
            "pinyin": "Nǐ xiǎng mǎi shénme?",
            "vietnamese": "Bạn muốn mua gì?"
          },
          {
            "speaker": "B",
            "chinese": "我想买一个杯子。",
            "pinyin": "Wǒ xiǎng mǎi yí gè bēizi.",
            "vietnamese": "Tôi muốn mua một cái cốc."
          }
        ]
      },
      {
        "lines": [
          {
            "speaker": "A",
            "chinese": "你好！这个杯子多少钱？",
            "pinyin": "Nǐ hǎo! Zhège bēizi duōshao qián?",
            "vietnamese": "Chào bạn! Cái cốc này bao nhiêu tiền?"
          },
          {
            "speaker": "B",
            "chinese": "28块。",
            "pinyin": "Èrshíbā kuài.",
            "vietnamese": "28 đồng."
          },
          {
            "speaker": "A",
            "chinese": "那个杯子多少钱？",
            "pinyin": "Nàge bēizi duōshao qián?",
            "vietnamese": "Cái cốc kia bao nhiêu tiền?"
          },
          {
            "speaker": "B",
            "chinese": "那个杯子18块钱。",
            "pinyin": "Nàge bēizi yíshíbā kuài qián.",
            "vietnamese": "Cái cốc kia 18 đồng."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk1_09",
    "dialogues": [
      {
        "lines": [
          {
            "speaker": "A",
            "chinese": "小猫在哪儿？",
            "pinyin": "Xiǎo māo zài nǎr?",
            "vietnamese": "Con mèo nhỏ ở đâu?"
          },
          {
            "speaker": "B",
            "chinese": "小猫在那儿。",
            "pinyin": "Xiǎo māo zài nàr.",
            "vietnamese": "Con mèo nhỏ ở kia."
          },
          {
            "speaker": "A",
            "chinese": "小狗在哪儿？",
            "pinyin": "Xiǎo gǒu zài nǎr?",
            "vietnamese": "Con chó nhỏ ở đâu?"
          },
          {
            "speaker": "B",
            "chinese": "小狗在椅子下面。",
            "pinyin": "Xiǎo gǒu zài yǐzi xiàmiàn.",
            "vietnamese": "Con chó nhỏ ở dưới cái ghế."
          }
        ]
      },
      {
        "lines": [
          {
            "speaker": "A",
            "chinese": "你在哪儿工作？",
            "pinyin": "Nǐ zài nǎr gōngzuò?",
            "vietnamese": "Bạn làm việc ở đâu?"
          },
          {
            "speaker": "B",
            "chinese": "我在学校工作。",
            "pinyin": "Wǒ zài xuéxiào gōngzuò.",
            "vietnamese": "Tôi làm việc ở trường học."
          },
          {
            "speaker": "A",
            "chinese": "你儿子在哪儿工作？",
            "pinyin": "Nǐ érzi zài nǎr gōngzuò?",
            "vietnamese": "Con trai bạn làm việc ở đâu?"
          },
          {
            "speaker": "B",
            "chinese": "我儿子在医院工作，他是医生。",
            "pinyin": "Wǒ érzi zài yīyuàn gōngzuò, tā shì yīshēng.",
            "vietnamese": "Con trai tôi làm việc ở bệnh viện, anh ấy là bác sĩ."
          }
        ]
      },
      {
        "lines": [
          {
            "speaker": "A",
            "chinese": "你爸爸在家吗？",
            "pinyin": "Nǐ bàba zài jiā ma?",
            "vietnamese": "Bố bạn có ở nhà không?"
          },
          {
            "speaker": "B",
            "chinese": "不在家。",
            "pinyin": "Bú zài jiā.",
            "vietnamese": "Không ở nhà."
          },
          {
            "speaker": "A",
            "chinese": "他在哪儿呢？",
            "pinyin": "Tā zài nǎr ne?",
            "vietnamese": "Ông ấy ở đâu?"
          },
          {
            "speaker": "B",
            "chinese": "他在医院。",
            "pinyin": "Tā zài yīyuàn.",
            "vietnamese": "Ông ấy ở bệnh viện."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk1_10",
    "dialogues": [
      {
        "lines": [
          {
            "speaker": "A",
            "chinese": "桌子上有什么？",
            "pinyin": "Zhuōzi shang yǒu shénme?",
            "vietnamese": "Trên bàn có cái gì?"
          },
          {
            "speaker": "B",
            "chinese": "桌子上有一个电脑和一本书。",
            "pinyin": "Zhuōzi shang yǒu yí gè diànnǎo hé yì běn shū.",
            "vietnamese": "Trên bàn có một cái máy tính và một quyển sách."
          },
          {
            "speaker": "A",
            "chinese": "杯子在哪儿？",
            "pinyin": "Bēizi zài nǎr?",
            "vietnamese": "Cái cốc ở đâu?"
          },
          {
            "speaker": "B",
            "chinese": "杯子在桌子里。",
            "pinyin": "Bēizi zài zhuōzi lǐ.",
            "vietnamese": "Cái cốc ở trong bàn."
          }
        ]
      },
      {
        "lines": [
          {
            "speaker": "A",
            "chinese": "前面那个人叫什么名字？",
            "pinyin": "Qiánmiàn nàge rén jiào shénme míngzi?",
            "vietnamese": "Người phía trước kia tên là gì?"
          },
          {
            "speaker": "B",
            "chinese": "她叫王方，在医院工作。",
            "pinyin": "Tā jiào Wáng Fāng, zài yīyuàn gōngzuò.",
            "vietnamese": "Cô ấy tên là Vương Phương, làm việc ở bệnh viện."
          },
          {
            "speaker": "A",
            "chinese": "后面那个人呢？他叫什么名字？",
            "pinyin": "Hòumiàn nàge rén ne? Tā jiào shénme míngzi?",
            "vietnamese": "Người phía sau kia thì sao? Anh ấy tên là gì?"
          },
          {
            "speaker": "B",
            "chinese": "他叫谢朋，在商店工作。",
            "pinyin": "Tā jiào Xiè Péng, zài shāngdiàn gōngzuò.",
            "vietnamese": "Anh ấy tên là Tạ Bằng, làm việc ở cửa hàng."
          }
        ]
      },
      {
        "lines": [
          {
            "speaker": "A",
            "chinese": "这儿有人吗？",
            "pinyin": "Zhèr yǒu rén ma?",
            "vietnamese": "Chỗ này có người không?"
          },
          {
            "speaker": "B",
            "chinese": "没有。",
            "pinyin": "Méi yǒu.",
            "vietnamese": "Không có."
          },
          {
            "speaker": "A",
            "chinese": "我能坐这儿吗？",
            "pinyin": "Wǒ néng zuò zhèr ma?",
            "vietnamese": "Tôi có thể ngồi đây không?"
          },
          {
            "speaker": "B",
            "chinese": "请坐。",
            "pinyin": "Qǐng zuò.",
            "vietnamese": "Mời ngồi."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk1_11",
    "dialogues": [
      {
        "lines": [
          {
            "speaker": "A",
            "chinese": "现在几点？",
            "pinyin": "Xiànzài jǐ diǎn?",
            "vietnamese": "Bây giờ là mấy giờ?"
          },
          {
            "speaker": "B",
            "chinese": "现在十点十分。",
            "pinyin": "Xiànzài shí diǎn shí fēn.",
            "vietnamese": "Bây giờ là 10 giờ 10 phút."
          },
          {
            "speaker": "A",
            "chinese": "中午几点吃饭？",
            "pinyin": "Zhōngwǔ jǐ diǎn chī fàn?",
            "vietnamese": "Trưa mấy giờ ăn cơm?"
          },
          {
            "speaker": "B",
            "chinese": "十二点吃饭。",
            "pinyin": "Shí'èr diǎn chī fàn.",
            "vietnamese": "12 giờ ăn cơm."
          }
        ]
      },
      {
        "lines": [
          {
            "speaker": "A",
            "chinese": "爸爸什么时候回家？",
            "pinyin": "Bàba shénme shíhou huí jiā?",
            "vietnamese": "Bố khi nào về nhà?"
          },
          {
            "speaker": "B",
            "chinese": "下午五点。",
            "pinyin": "Xiàwǔ wǔ diǎn.",
            "vietnamese": "5 giờ chiều."
          },
          {
            "speaker": "A",
            "chinese": "我们什么时候去看电影？",
            "pinyin": "Wǒmen shénme shíhou qù kàn diànyǐng?",
            "vietnamese": "Khi nào chúng ta đi xem phim?"
          },
          {
            "speaker": "B",
            "chinese": "六点三十分。",
            "pinyin": "Liù diǎn sānshí fēn.",
            "vietnamese": "6 giờ 30 phút."
          }
        ]
      },
      {
        "lines": [
          {
            "speaker": "A",
            "chinese": "我星期一去北京。",
            "pinyin": "Wǒ xīngqīyī qù Běijīng.",
            "vietnamese": "Thứ hai tôi đi Bắc Kinh."
          },
          {
            "speaker": "B",
            "chinese": "你想在北京住几天？",
            "pinyin": "Nǐ xiǎng zài Běijīng zhù jǐ tiān?",
            "vietnamese": "Bạn muốn ở Bắc Kinh mấy ngày?"
          },
          {
            "speaker": "A",
            "chinese": "住三天。",
            "pinyin": "Zhù sān tiān.",
            "vietnamese": "Ở 3 ngày."
          },
          {
            "speaker": "B",
            "chinese": "星期五前能回家吗？",
            "pinyin": "Xīngqīwǔ qián néng huí jiā ma?",
            "vietnamese": "Trước thứ sáu có thể về nhà không?"
          },
          {
            "speaker": "A",
            "chinese": "能。",
            "pinyin": "Néng.",
            "vietnamese": "Có thể."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk1_12",
    "dialogues": [
      {
        "lines": [
          {
            "speaker": "A",
            "chinese": "昨天北京的天气怎么样？",
            "pinyin": "Zuótiān Běijīng de tiānqì zěnmeyàng?",
            "vietnamese": "Hôm qua thời tiết Bắc Kinh thế nào?"
          },
          {
            "speaker": "B",
            "chinese": "太热了。",
            "pinyin": "Tài rè le.",
            "vietnamese": "Nóng quá."
          },
          {
            "speaker": "A",
            "chinese": "明天呢？明天天气怎么样？",
            "pinyin": "Míngtiān ne? Míngtiān tiānqì zěnmeyàng?",
            "vietnamese": "Ngày mai thì sao? Thời tiết ngày mai thế nào?"
          },
          {
            "speaker": "B",
            "chinese": "明天天气很好，不冷不热。",
            "pinyin": "Míngtiān tiānqì hěn hǎo, bù lěng bú rè.",
            "vietnamese": "Thời tiết ngày mai rất tốt, không lạnh không nóng."
          }
        ]
      },
      {
        "lines": [
          {
            "speaker": "A",
            "chinese": "今天会下雨吗？",
            "pinyin": "Jīntiān huì xià yǔ ma?",
            "vietnamese": "Hôm nay có mưa không?"
          },
          {
            "speaker": "B",
            "chinese": "今天不会下雨。",
            "pinyin": "Jīntiān bú huì xià yǔ.",
            "vietnamese": "Hôm nay sẽ không mưa."
          },
          {
            "speaker": "A",
            "chinese": "王小姐今天会来吗？",
            "pinyin": "Wáng xiǎojiě jīntiān huì lái ma?",
            "vietnamese": "Cô Vương hôm nay có đến không?"
          },
          {
            "speaker": "B",
            "chinese": "不会来，天气太冷了。",
            "pinyin": "Bú huì lái, tiānqì tài lěng le.",
            "vietnamese": "Không đến, thời tiết lạnh quá."
          }
        ]
      },
      {
        "lines": [
          {
            "speaker": "A",
            "chinese": "你身体怎么样？",
            "pinyin": "Nǐ shēntǐ zěnmeyàng?",
            "vietnamese": "Sức khỏe của bạn thế nào?"
          },
          {
            "speaker": "B",
            "chinese": "我身体不太好。天气太热了，不爱吃饭。",
            "pinyin": "Wǒ shēntǐ bú tài hǎo. Tiānqì tài rè le, bú ài chī fàn.",
            "vietnamese": "Sức khỏe tôi không tốt lắm. Thời tiết nóng quá, không muốn ăn cơm."
          },
          {
            "speaker": "A",
            "chinese": "你多吃些水果，多喝水。",
            "pinyin": "Nǐ duō chī xiē shuǐguǒ, duō hē shuǐ.",
            "vietnamese": "Bạn ăn nhiều hoa quả một chút, uống nhiều nước."
          },
          {
            "speaker": "B",
            "chinese": "谢谢你，医生。",
            "pinyin": "Xièxie nǐ, yīshēng.",
            "vietnamese": "Cảm ơn bác sĩ."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk1_13",
    "dialogues": [
      {
        "lines": [
          {
            "speaker": "A",
            "chinese": "喂，你在做什么呢？",
            "pinyin": "Wèi, nǐ zài zuò shénme ne?",
            "vietnamese": "Alo, bạn đang làm gì thế?"
          },
          {
            "speaker": "B",
            "chinese": "我在看书呢。",
            "pinyin": "Wǒ zài kàn shū ne.",
            "vietnamese": "Tôi đang đọc sách."
          },
          {
            "speaker": "A",
            "chinese": "大卫也在看书吗？",
            "pinyin": "Dàwèi yě zài kàn shū ma?",
            "vietnamese": "David cũng đang đọc sách à?"
          },
          {
            "speaker": "B",
            "chinese": "他没看书，他在学做中国菜呢。",
            "pinyin": "Tā méi kàn shū, tā zài xué zuò Zhōngguó cài ne.",
            "vietnamese": "Cậu ấy không đọc sách, cậu ấy đang học làm món ăn Trung Quốc."
          }
        ]
      },
      {
        "lines": [
          {
            "speaker": "A",
            "chinese": "昨天上午你在做什么呢？",
            "pinyin": "Zuótiān shàngwǔ nǐ zài zuò shénme ne?",
            "vietnamese": "Sáng hôm qua bạn đang làm gì?"
          },
          {
            "speaker": "B",
            "chinese": "我在睡觉呢。你呢？",
            "pinyin": "Wǒ zài shuìjiào ne. Nǐ ne?",
            "vietnamese": "Tôi đang ngủ. Còn bạn?"
          },
          {
            "speaker": "A",
            "chinese": "我在家看电视呢。你喜欢看电视吗？",
            "pinyin": "Wǒ zài jiā kàn diànshì ne. Nǐ xǐhuan kàn diànshì ma?",
            "vietnamese": "Tôi đang ở nhà xem tivi. Bạn thích xem tivi không?"
          },
          {
            "speaker": "B",
            "chinese": "我不喜欢看电视，我喜欢看电影。",
            "pinyin": "Wǒ bù xǐhuan kàn diànshì, wǒ xǐhuan kàn diànyǐng.",
            "vietnamese": "Tôi không thích xem tivi, tôi thích xem phim."
          }
        ]
      },
      {
        "lines": [
          {
            "speaker": "A",
            "chinese": "82304155，这是李老师的电话吗？",
            "pinyin": "Bā-èr-sān-líng-sì-yāo-wǔ-wǔ, zhè shì Lǐ lǎoshī de diànhuà ma?",
            "vietnamese": "82304155, đây là số điện thoại của cô Lý phải không?"
          },
          {
            "speaker": "B",
            "chinese": "不是。她的电话是82304156。",
            "pinyin": "Bú shì. Tā de diànhuà shì bā-èr-sān-líng-sì-yāo-wǔ-liù.",
            "vietnamese": "Không phải. Số điện thoại của cô ấy là 82304156."
          },
          {
            "speaker": "A",
            "chinese": "好，我现在给她打电话。",
            "pinyin": "Hǎo, wǒ xiànzài gěi tā dǎ diànhuà.",
            "vietnamese": "Được, bây giờ tôi gọi cho cô ấy."
          },
          {
            "speaker": "B",
            "chinese": "她在工作呢，你下午打吧。",
            "pinyin": "Tā zài gōngzuò ne, nǐ xiàwǔ dǎ ba.",
            "vietnamese": "Cô ấy đang làm việc, chiều bạn hãy gọi nhé."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk1_14",
    "dialogues": [
      {
        "lines": [
          {
            "speaker": "A",
            "chinese": "昨天上午你去哪儿了？",
            "pinyin": "Zuótiān shàngwǔ nǐ qù nǎr le?",
            "vietnamese": "Sáng hôm qua bạn đã đi đâu?"
          },
          {
            "speaker": "B",
            "chinese": "我去商店买东西了。",
            "pinyin": "Wǒ qù shāngdiàn mǎi dōngxi le.",
            "vietnamese": "Tôi đi cửa hàng mua đồ rồi."
          },
          {
            "speaker": "A",
            "chinese": "你买什么了？",
            "pinyin": "Nǐ mǎi shénme le?",
            "vietnamese": "Bạn đã mua gì?"
          },
          {
            "speaker": "B",
            "chinese": "我买了一点儿苹果。",
            "pinyin": "Wǒ mǎi le yìdiǎnr píngguǒ.",
            "vietnamese": "Tôi đã mua một ít táo."
          }
        ]
      },
      {
        "lines": [
          {
            "speaker": "A",
            "chinese": "你看见张先生了吗？",
            "pinyin": "Nǐ kànjiàn Zhāng xiānsheng le ma?",
            "vietnamese": "Bạn có nhìn thấy ông Trương không?"
          },
          {
            "speaker": "B",
            "chinese": "看见了，他去学开车了。",
            "pinyin": "Kànjiàn le, tā qù xué kāi chē le.",
            "vietnamese": "Thấy rồi, ông ấy đi học lái xe rồi."
          },
          {
            "speaker": "A",
            "chinese": "他什么时候能回来？",
            "pinyin": "Tā shénme shíhou néng huílái?",
            "vietnamese": "Khi nào ông ấy có thể quay lại?"
          },
          {
            "speaker": "B",
            "chinese": "40分钟后回来。",
            "pinyin": "Sìshí fēnzhōng hòu huílái.",
            "vietnamese": "40 phút sau sẽ quay lại."
          }
        ]
      },
      {
        "lines": [
          {
            "speaker": "A",
            "chinese": "王方的衣服太漂亮了！",
            "pinyin": "Wáng Fāng de yīfu tài piàoliang le!",
            "vietnamese": "Quần áo của Vương Phương đẹp quá!"
          },
          {
            "speaker": "B",
            "chinese": "是啊，她买了不少衣服。",
            "pinyin": "Shì a, tā mǎi le bù shǎo yīfu.",
            "vietnamese": "Đúng vậy, cô ấy đã mua không ít quần áo."
          },
          {
            "speaker": "A",
            "chinese": "你买什么了？",
            "pinyin": "Nǐ mǎi shénme le?",
            "vietnamese": "Bạn đã mua gì?"
          },
          {
            "speaker": "B",
            "chinese": "我没买，这些都是王方的东西。",
            "pinyin": "Wǒ méi mǎi, zhèxiē dōu shì Wáng Fāng de dōngxi.",
            "vietnamese": "Tôi không mua, những thứ này đều là đồ của Vương Phương."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk1_15",
    "dialogues": [
      {
        "lines": [
          {
            "speaker": "A",
            "chinese": "你和李小姐是什么时候认识的？",
            "pinyin": "Nǐ hé Lǐ xiǎojiě shì shénme shíhou rènshi de?",
            "vietnamese": "Bạn và cô Lý quen nhau khi nào?"
          },
          {
            "speaker": "B",
            "chinese": "我们是2011年9月认识的。",
            "pinyin": "Wǒmen shì èr-líng-yāo-yāo nián jiǔ yuè rènshi de.",
            "vietnamese": "Chúng tôi quen nhau vào tháng 9 năm 2011."
          },
          {
            "speaker": "A",
            "chinese": "你们在哪儿认识的？",
            "pinyin": "Nǐmen zài nǎr rènshi de?",
            "vietnamese": "Các bạn quen nhau ở đâu?"
          },
          {
            "speaker": "B",
            "chinese": "我们是在学校认识的，她是我大学同学。",
            "pinyin": "Wǒmen shì zài xuéxiào rènshi de, tā shì wǒ dàxué tóngxué.",
            "vietnamese": "Chúng tôi quen nhau ở trường học, cô ấy là bạn học đại học của tôi."
          }
        ]
      },
      {
        "lines": [
          {
            "speaker": "A",
            "chinese": "你们是怎么来饭店的？",
            "pinyin": "Nǐmen shì zěnme lái fàndiàn de?",
            "vietnamese": "Các bạn đến khách sạn bằng cách nào?"
          },
          {
            "speaker": "B",
            "chinese": "我们是坐出租车来的。",
            "pinyin": "Wǒmen shì zuò chūzūchē lái de.",
            "vietnamese": "Chúng tôi ngồi taxi đến."
          },
          {
            "speaker": "A",
            "chinese": "李先生呢？",
            "pinyin": "Lǐ xiānsheng ne?",
            "vietnamese": "Còn ông Lý?"
          },
          {
            "speaker": "B",
            "chinese": "他是和朋友一起开车来的。",
            "pinyin": "Tā shì hé péngyou yìqǐ kāi chē lái de.",
            "vietnamese": "Ông ấy cùng bạn lái xe đến."
          }
        ]
      },
      {
        "lines": [
          {
            "speaker": "A",
            "chinese": "很高兴认识您！李小姐。",
            "pinyin": "Hěn gāoxìng rènshi nín! Lǐ xiǎojiě.",
            "vietnamese": "Rất vui được làm quen với cô! Cô Lý."
          },
          {
            "speaker": "B",
            "chinese": "认识你我也很高兴。",
            "pinyin": "Rènshi nǐ wǒ yě hěn gāoxìng.",
            "vietnamese": "Quen biết bạn tôi cũng rất vui."
          },
          {
            "speaker": "A",
            "chinese": "听张先生说，您是坐飞机来北京的？",
            "pinyin": "Tīng Zhāng xiānsheng shuō, nín shì zuò fēijī lái Běijīng de?",
            "vietnamese": "Nghe ông Trương nói, cô ngồi máy bay đến Bắc Kinh à?"
          },
          {
            "speaker": "B",
            "chinese": "是的。",
            "pinyin": "Shì de.",
            "vietnamese": "Đúng vậy."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk2_01",
    "dialogues": [
      {
        "title": "谈去北京旅游 (Nói về du lịch Bắc Kinh)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "我要去北京旅游，你觉得什么时候去最好？",
            "pinyin": "Wǒ yào qù Běijīng lǚyóu, nǐ juéde shénme shíhou qù zuì hǎo?",
            "vietnamese": "Tôi muốn đi du lịch Bắc Kinh, bạn thấy khi nào đi là tốt nhất?"
          },
          {
            "speaker": "B",
            "chinese": "九月去北京旅游最好。",
            "pinyin": "Jiǔ yuè qù Běijīng lǚyóu zuì hǎo.",
            "vietnamese": "Tháng 9 đi du lịch Bắc Kinh là tốt nhất."
          },
          {
            "speaker": "A",
            "chinese": "为什么？",
            "pinyin": "Wèishénme?",
            "vietnamese": "Tại sao?"
          },
          {
            "speaker": "B",
            "chinese": "九月的北京，天气不冷也不热。",
            "pinyin": "Jiǔ yuè de Běijīng, tiānqì bù lěng yě bú rè.",
            "vietnamese": "Bắc Kinh vào tháng 9, thời tiết không lạnh cũng không nóng."
          }
        ]
      },
      {
        "title": "谈运动 (Nói về thể thao)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "你喜欢什么运动？",
            "pinyin": "Nǐ xǐhuan shénme yùndòng?",
            "vietnamese": "Bạn thích môn thể thao nào?"
          },
          {
            "speaker": "B",
            "chinese": "我最喜欢踢足球。",
            "pinyin": "Wǒ zuì xǐhuan tī zúqiú.",
            "vietnamese": "Tôi thích nhất là đá bóng."
          },
          {
            "speaker": "A",
            "chinese": "下午我们一起去踢足球吧。",
            "pinyin": "Xiàwǔ wǒmen yìqǐ qù tī zúqiú ba.",
            "vietnamese": "Buổi chiều chúng ta cùng đi đá bóng nhé."
          },
          {
            "speaker": "B",
            "chinese": "好啊！",
            "pinyin": "Hǎo a!",
            "vietnamese": "Được thôi!"
          }
        ]
      },
      {
        "title": "谈买新椅子 (Nói về việc mua ghế mới)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "我们要不要买几个新的椅子？",
            "pinyin": "Wǒmen yào bú yào mǎi jǐ gè xīn de yǐzi?",
            "vietnamese": "Chúng ta có cần mua vài cái ghế mới không?"
          },
          {
            "speaker": "B",
            "chinese": "好啊。什么时候去买？",
            "pinyin": "Hǎo a. Shénme shíhou qù mǎi?",
            "vietnamese": "Được chứ. Khi nào đi mua?"
          },
          {
            "speaker": "A",
            "chinese": "明天下午怎么样？你明天几点能回来？",
            "pinyin": "Míngtiān xiàwǔ zěnmeyàng? Nǐ míngtiān jǐ diǎn néng huílái?",
            "vietnamese": "Chiều mai thì sao? Ngày mai mấy giờ bạn có thể về?"
          },
          {
            "speaker": "B",
            "chinese": "三点多。",
            "pinyin": "Sān diǎn duō.",
            "vietnamese": "Hơn 3 giờ."
          }
        ]
      },
      {
        "title": "谈猫 (Nói về thú cưng)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "桌子下面有个猫。",
            "pinyin": "Zhuōzi xiàmiàn yǒu gè māo.",
            "vietnamese": "Dưới bàn có một con mèo."
          },
          {
            "speaker": "B",
            "chinese": "那是我的猫，它叫花花。",
            "pinyin": "Nà shì wǒ de māo, tā jiào Huāhua.",
            "vietnamese": "Đó là mèo của tôi, nó tên là Hoa Hoa."
          },
          {
            "speaker": "A",
            "chinese": "它很漂亮。",
            "pinyin": "Tā hěn piàoliang.",
            "vietnamese": "Nó rất đẹp."
          },
          {
            "speaker": "B",
            "chinese": "是啊，我觉得它的眼睛最漂亮。",
            "pinyin": "Shì a, wǒ juéde tā de yǎnjing zuì piàoliang.",
            "vietnamese": "Đúng vậy, tôi thấy đôi mắt của nó là đẹp nhất."
          },
          {
            "speaker": "A",
            "chinese": "它多大了？",
            "pinyin": "Tā duō dà le?",
            "vietnamese": "Nó bao nhiêu tuổi rồi?"
          },
          {
            "speaker": "B",
            "chinese": "六个多月。",
            "pinyin": "Liù gè duō yuè.",
            "vietnamese": "Hơn 6 tháng."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk2_02",
    "dialogues": [
      {
        "title": "谈早起 (Nói về việc dậy sớm)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "你每天早上几点起床？",
            "pinyin": "Nǐ měitiān zǎoshang jǐ diǎn qǐchuáng?",
            "vietnamese": "Mỗi sáng bạn thức dậy lúc mấy giờ?"
          },
          {
            "speaker": "B",
            "chinese": "六点多。",
            "pinyin": "Liù diǎn duō.",
            "vietnamese": "Hơn 6 giờ."
          },
          {
            "speaker": "A",
            "chinese": "你比我早起一个小时。",
            "pinyin": "Nǐ bǐ wǒ zǎo qǐ yí gè xiǎoshí.",
            "vietnamese": "Bạn dậy sớm hơn tôi một tiếng đồng hồ."
          },
          {
            "speaker": "B",
            "chinese": "我每天早上去跑步。",
            "pinyin": "Wǒ měitiān zǎoshang qù pǎobù.",
            "vietnamese": "Mỗi sáng tôi đều đi chạy bộ."
          }
        ]
      },
      {
        "title": "谈生病 (Nói về ốm đau)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "吃药了吗？现在身体怎么样？",
            "pinyin": "Chī yào le ma? Xiànzài shēntǐ zěnmeyàng?",
            "vietnamese": "Uống thuốc chưa? Bây giờ sức khỏe thế nào rồi?"
          },
          {
            "speaker": "B",
            "chinese": "吃了。现在好多了。",
            "pinyin": "Chī le. Xiànzài hǎo duō le.",
            "vietnamese": "Uống rồi. Bây giờ đỡ hơn nhiều rồi."
          },
          {
            "speaker": "A",
            "chinese": "什么时候能出院？",
            "pinyin": "Shénme shíhou néng chū yuàn?",
            "vietnamese": "Khi nào có thể xuất viện?"
          },
          {
            "speaker": "B",
            "chinese": "医生说下个星期。",
            "pinyin": "Yīshēng shuō xià gè xīngqī.",
            "vietnamese": "Bác sĩ nói tuần sau."
          }
        ]
      },
      {
        "title": "谈身高 và 年龄 (Nói về chiều cao và tuổi tác)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "大卫今年多大？",
            "pinyin": "Dàwèi jīnnián duō dà?",
            "vietnamese": "David năm nay bao nhiêu tuổi?"
          },
          {
            "speaker": "B",
            "chinese": "二十多岁。",
            "pinyin": "Èrshí duō suì.",
            "vietnamese": "Hơn 20 tuổi."
          },
          {
            "speaker": "A",
            "chinese": "他多高？",
            "pinyin": "Tā duō gāo?",
            "vietnamese": "Cậu ấy cao bao nhiêu?"
          },
          {
            "speaker": "B",
            "chinese": "一米八几。",
            "pinyin": "Yì mǐ bā jǐ.",
            "vietnamese": "Hơn 1 mét 8."
          },
          {
            "speaker": "A",
            "chinese": "你怎么知道这么多呀？",
            "pinyin": "Nǐ zěnme zhīdào zhème duō ya?",
            "vietnamese": "Sao bạn biết nhiều thế?"
          },
          {
            "speaker": "B",
            "chinese": "他是我同学。",
            "pinyin": "Tā shì wǒ tóngxué.",
            "vietnamese": "Cậu ấy là bạn học của tôi."
          }
        ]
      },
      {
        "title": "谈休息 (Nói về sự nghỉ ngơi)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "张老师星期六也不休息啊？",
            "pinyin": "Zhāng lǎoshī xīngqīliù yě bù xiūxi a?",
            "vietnamese": "Thầy Trương thứ bảy cũng không nghỉ ngơi à?"
          },
          {
            "speaker": "B",
            "chinese": "是啊，他这几天很忙，没有时间休息。",
            "pinyin": "Shì a, tā zhè jǐ tiān hěn máng, méiyǒu shíjiān xiūxi.",
            "vietnamese": "Đúng vậy, mấy ngày nay thầy ấy rất bận, không có thời gian nghỉ ngơi."
          },
          {
            "speaker": "A",
            "chinese": "那会很累吧？",
            "pinyin": "Nà huì hěn lèi ba?",
            "vietnamese": "Thế thì chắc mệt lắm nhỉ?"
          },
          {
            "speaker": "B",
            "chinese": "他每天回来都很累。",
            "pinyin": "Tā měitiān huílái dōu hěn lèi.",
            "vietnamese": "Mỗi ngày thầy ấy về đều rất mệt."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk2_03",
    "dialogues": [
      {
        "title": "谈手表 (Nói về đồng hồ)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "这块手表是你的吗？",
            "pinyin": "Zhè kuài shǒubiǎo shì nǐ de ma?",
            "vietnamese": "Chiếc đồng hồ này là của bạn phải không?"
          },
          {
            "speaker": "B",
            "chinese": "不是我的。是我爸爸的。",
            "pinyin": "Bú shì wǒ de. Shì wǒ bàba de.",
            "vietnamese": "Không phải của tôi. Là của bố tôi."
          },
          {
            "speaker": "A",
            "chinese": "多少钱买的？",
            "pinyin": "Duōshao qián mǎi de?",
            "vietnamese": "Mua bao nhiêu tiền?"
          },
          {
            "speaker": "B",
            "chinese": "三千多块。",
            "pinyin": "Sānqiān duō kuài.",
            "vietnamese": "Hơn 3.000 đồng."
          }
        ]
      },
      {
        "title": "谈报纸和牛奶 (Nói về báo và sữa)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "这是今天早上的报纸吗？",
            "pinyin": "Zhè shì jīntiān zǎoshang de bàozhǐ ma?",
            "vietnamese": "Đây là tờ báo sáng nay phải không?"
          },
          {
            "speaker": "B",
            "chinese": "不是，是昨天的。",
            "pinyin": "Bú shì, shì zuótiān de.",
            "vietnamese": "Không phải, là của hôm qua."
          },
          {
            "speaker": "A",
            "chinese": "你听，是不是送报纸的来了？",
            "pinyin": "Nǐ tīng, shì bú shì sòng bàozhǐ de lái le?",
            "vietnamese": "Bạn nghe xem, có phải người giao báo đến rồi không?"
          },
          {
            "speaker": "B",
            "chinese": "我看一下。不是，是送牛奶的。",
            "pinyin": "Wǒ kàn yíxià. Bú shì, shì sòng niúnǎi de.",
            "vietnamese": "Để tôi xem một chút. Không phải, là người giao sữa."
          }
        ]
      },
      {
        "title": "谈房间 (Nói về căn phòng)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "这是谁的房间？",
            "pinyin": "Zhè shì shéi de fángjiān?",
            "vietnamese": "Đây là phòng của ai?"
          },
          {
            "speaker": "B",
            "chinese": "这是我和我丈夫的，旁边那个小的房间是我女儿的。",
            "pinyin": "Zhè shì wǒ hé wǒ zhàngfu de, pángbiān nàge xiǎo de fángjiān shì wǒ nǚ'ér de.",
            "vietnamese": "Đây là phòng của tôi và chồng tôi, căn phòng nhỏ bên cạnh kia là của con gái tôi."
          },
          {
            "speaker": "A",
            "chinese": "你女儿的房间真漂亮！都是粉色的。",
            "pinyin": "Nǐ nǚ'ér de fángjiān zhēn piàoliang! Dōu shì fěnsè de.",
            "vietnamese": "Phòng của con gái bạn đẹp thật! Toàn là màu hồng."
          },
          {
            "speaker": "B",
            "chinese": "是啊，粉色是她最喜欢的颜色。",
            "pinyin": "Shì a, fěnsè shì tā zuì xǐhuan de yánsè.",
            "vietnamese": "Đúng vậy, màu hồng là màu con bé thích nhất."
          }
        ]
      },
      {
        "title": "谈杯子 (Nói về cái cốc)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "你看见我的杯子了吗？",
            "pinyin": "Nǐ kànjiàn wǒ de bēizi le ma?",
            "vietnamese": "Bạn có nhìn thấy cái cốc của tôi không?"
          },
          {
            "speaker": "B",
            "chinese": "这里有几个杯子，哪个是你的？",
            "pinyin": "Zhèlǐ yǒu jǐ gè bēizi, nǎge shì nǐ de?",
            "vietnamese": "Ở đây có mấy cái cốc, cái nào là của bạn?"
          },
          {
            "speaker": "A",
            "chinese": "左边那个红色的是我的。",
            "pinyin": "Zuǒbian nàge hóngsè de shì wǒ de.",
            "vietnamese": "Cái màu đỏ bên trái kia là của tôi."
          },
          {
            "speaker": "B",
            "chinese": "给你。",
            "pinyin": "Gěi nǐ.",
            "vietnamese": "Của bạn đây."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk2_04",
    "dialogues": [
      {
        "title": "谈生日礼物 (Nói về quà sinh nhật)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "生日快乐！这是送给你的。",
            "pinyin": "Shēngrì kuàilè! Zhè shì sòng gěi nǐ de.",
            "vietnamese": "Chúc mừng sinh nhật! Đây là quà tặng cho bạn."
          },
          {
            "speaker": "B",
            "chinese": "是什么？是一本书吗？",
            "pinyin": "Shì shénme? Shì yì běn shū ma?",
            "vietnamese": "Là cái gì vậy? Là một quyển sách à?"
          },
          {
            "speaker": "A",
            "chinese": "对，这本书是我写的。",
            "pinyin": "Duì, zhè běn shū shì wǒ xiě de.",
            "vietnamese": "Đúng, quyển sách này là do tôi viết."
          },
          {
            "speaker": "B",
            "chinese": "太谢谢你了！",
            "pinyin": "Tài xièxie nǐ le!",
            "vietnamese": "Quá cảm ơn bạn rồi!"
          }
        ]
      },
      {
        "title": "谈电话 (Nói về điện thoại)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "早上有你一个电话。",
            "pinyin": "Zǎoshang yǒu nǐ yí gè diànhuà.",
            "vietnamese": "Buổi sáng có một cuộc điện thoại gọi cho bạn."
          },
          {
            "speaker": "B",
            "chinese": "谁打来的？",
            "pinyin": "Shéi dǎ lái de?",
            "vietnamese": "Ai gọi đến vậy?"
          },
          {
            "speaker": "A",
            "chinese": "不知道，是儿子接的。",
            "pinyin": "Bù zhīdào, shì érzi jiē de.",
            "vietnamese": "Không biết, là con trai nghe máy."
          },
          {
            "speaker": "B",
            "chinese": "好，晚上我问一下儿子。",
            "pinyin": "Hǎo, wǎnshang wǒ wèn yíxià érzi.",
            "vietnamese": "Được, tối tôi sẽ hỏi con trai một chút."
          }
        ]
      },
      {
        "title": "谈踢足球 (Nói về việc đá bóng)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "你喜欢踢足球吗？",
            "pinyin": "Nǐ xǐhuan tī zúqiú ma?",
            "vietnamese": "Bạn có thích đá bóng không?"
          },
          {
            "speaker": "B",
            "chinese": "非常喜欢。",
            "pinyin": "Fēicháng xǐhuan.",
            "vietnamese": "Vô cùng thích."
          },
          {
            "speaker": "A",
            "chinese": "你是什么时候开始踢足球的？",
            "pinyin": "Nǐ shì shénme shíhou kāishǐ tī zúqiú de?",
            "vietnamese": "Bạn bắt đầu đá bóng từ khi nào?"
          },
          {
            "speaker": "B",
            "chinese": "我十一岁的时候开始踢足球，已经踢了十年了。",
            "pinyin": "Wǒ shíyī suì de shíhou kāishǐ tī zúqiú, yǐjīng tī le shí nián le.",
            "vietnamese": "Tôi bắt đầu đá bóng lúc 11 tuổi, đã đá được 10 năm rồi."
          }
        ]
      },
      {
        "title": "谈工作 (Nói về công việc)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "你在这儿工作多长时间了？",
            "pinyin": "Nǐ zài zhèr gōngzuò duō cháng shíjiān le?",
            "vietnamese": "Bạn làm việc ở đây bao lâu rồi?"
          },
          {
            "speaker": "B",
            "chinese": "已经两年多了，我是二零一一年来的。",
            "pinyin": "Yǐjīng liǎng nián duō le, wǒ shì èr-líng-yāo-yāo nián lái de.",
            "vietnamese": "Đã hơn hai năm rồi, tôi đến từ năm 2011."
          },
          {
            "speaker": "A",
            "chinese": "你认识谢先生吗？",
            "pinyin": "Nǐ rènshi Xiè xiānsheng ma?",
            "vietnamese": "Bạn có quen ông Tạ không?"
          },
          {
            "speaker": "B",
            "chinese": "认识，我们是大学同学，这个工作是他帮我介绍的。",
            "pinyin": "Rènshi, wǒmen shì dàxué tóngxué, zhège gōngzuò shì tā bāng wǒ jièshào de.",
            "vietnamese": "Quen chứ, chúng tôi là bạn đại học, công việc này là do anh ấy giúp tôi giới thiệu."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk2_05",
    "dialogues": [
      {
        "title": "谈吃晚饭 (Nói về bữa tối)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "晚上我们去饭馆吃饭，怎么样？",
            "pinyin": "Wǎnshang wǒmen qù fànguǎn chī fàn, zěnmeyàng?",
            "vietnamese": "Buổi tối chúng ta đi nhà hàng ăn cơm, được không?"
          },
          {
            "speaker": "B",
            "chinese": "我不想去外面吃，我想在家吃。",
            "pinyin": "Wǒ bù xiǎng qù wàimiàn chī, wǒ xiǎng zài jiā chī.",
            "vietnamese": "Tôi không muốn ra ngoài ăn, tôi muốn ăn ở nhà."
          },
          {
            "speaker": "A",
            "chinese": "那你准备做点儿什么呢？",
            "pinyin": "Nà nǐ zhǔnbèi zuò diǎnr shénme ne?",
            "vietnamese": "Thế bạn định nấu món gì?"
          },
          {
            "speaker": "B",
            "chinese": "就做你爱吃的鱼吧。",
            "pinyin": "Jiù zuò nǐ ài chī de yú ba.",
            "vietnamese": "Thì làm món cá bạn thích ăn đi."
          }
        ]
      },
      {
        "title": "谈买衣服 (Nói về việc mua quần áo)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "帮我看一下这件衣服怎么样。",
            "pinyin": "Bāng wǒ kàn yíxià zhè jiàn yīfu zěnmeyàng.",
            "vietnamese": "Giúp tôi xem thử bộ quần áo này thế nào."
          },
          {
            "speaker": "B",
            "chinese": "颜色还可以，就是有点儿大。",
            "pinyin": "Yánsè hái kěyǐ, jiùshì yǒu diǎnr dà.",
            "vietnamese": "Màu sắc cũng được, chỉ là hơi to một chút."
          },
          {
            "speaker": "A",
            "chinese": "这件小的怎么样？",
            "pinyin": "Zhè jiàn xiǎo de zěnmeyàng?",
            "vietnamese": "Chiếc nhỏ này thì sao?"
          },
          {
            "speaker": "B",
            "chinese": "这件不错，就买这件吧。",
            "pinyin": "Zhè jiàn búcuò, jiù mǎi zhè jiàn ba.",
            "vietnamese": "Chiếc này được đấy, mua chiếc này đi."
          }
        ]
      },
      {
        "title": "谈考试 (Nói về kỳ thi)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "今天去不去打球？",
            "pinyin": "Jīntiān qù bú qù dǎ qiú?",
            "vietnamese": "Hôm nay có đi đánh bóng không?"
          },
          {
            "speaker": "B",
            "chinese": "这两天有点儿累，不去打球了。",
            "pinyin": "Zhè liǎng tiān yǒu diǎnr lèi, bú qù dǎ qiú le.",
            "vietnamese": "Hai ngày nay hơi mệt, không đi đánh bóng nữa."
          },
          {
            "speaker": "A",
            "chinese": "你在做什么呢？是在想昨天的考试吗？",
            "pinyin": "Nǐ zài zuò shénme ne? Shì zài xiǎng zuótiān de kǎoshì ma?",
            "vietnamese": "Bạn đang làm gì thế? Đang nghĩ về bài thi hôm qua à?"
          },
          {
            "speaker": "B",
            "chinese": "是啊，我觉得听和说还可以，读和写不好，很多字我都不知道是什么意思。",
            "pinyin": "Shì a, wǒ juéde tīng hé shuō hái kěyǐ, dú hé xiě bù hǎo, hěnduō zì wǒ dōu bù zhīdào shì shénme yìsi.",
            "vietnamese": "Đúng vậy, tôi thấy nghe và nói còn tạm được, đọc và viết không tốt, rất nhiều chữ tôi đều không biết có ý nghĩa gì."
          }
        ]
      },
      {
        "title": "谈喝咖啡 (Nói về việc uống cà phê)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "休息一下吧，喝咖啡吗？",
            "pinyin": "Xiūxi yíxià ba, hē kāfēi ma?",
            "vietnamese": "Nghỉ ngơi một lát đi, uống cà phê không?"
          },
          {
            "speaker": "B",
            "chinese": "不喝了，我已经喝了两杯了。",
            "pinyin": "Bù hē le, wǒ yǐjīng hē le liǎng bēi le.",
            "vietnamese": "Không uống nữa, tôi đã uống 2 cốc rồi."
          },
          {
            "speaker": "A",
            "chinese": "是吗？咖啡喝多了对身体不好。",
            "pinyin": "Shì ma? Kāfēi hē duō le duì shēntǐ bù hǎo.",
            "vietnamese": "Vậy sao? Uống nhiều cà phê không tốt cho sức khỏe đâu."
          },
          {
            "speaker": "B",
            "chinese": "以后我少喝一点儿，每天喝一杯。",
            "pinyin": "Yǐhòu wǒ shǎo hē yìdiǎnr, měitiān hē yì bēi.",
            "vietnamese": "Sau này tôi sẽ uống ít lại, mỗi ngày uống 1 cốc thôi."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk2_06",
    "dialogues": [
      {
        "title": "门外 (Ngoài cửa)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "你知道小王在哪儿吗？",
            "pinyin": "Nǐ zhīdào Xiǎo Wáng zài nǎr ma?",
            "vietnamese": "Bạn có biết Tiểu Vương ở đâu không?"
          },
          {
            "speaker": "B",
            "chinese": "他在门外边呢。",
            "pinyin": "Tā zài mén wàibian ne.",
            "vietnamese": "Cậu ấy ở bên ngoài cửa kìa."
          },
          {
            "speaker": "A",
            "chinese": "他在做什么呢？",
            "pinyin": "Tā zài zuò shénme ne?",
            "vietnamese": "Cậu ấy đang làm gì vậy?"
          },
          {
            "speaker": "B",
            "chinese": "他在看他的新自行车。",
            "pinyin": "Tā zài kàn tā de xīn zìxíngchē.",
            "vietnamese": "Cậu ấy đang ngắm chiếc xe đạp mới của mình."
          }
        ]
      },
      {
        "title": "饭馆里 (Trong nhà hàng)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "今天的羊肉很好吃，你怎么不吃了？",
            "pinyin": "Jīntiān de yángròu hěn hǎochī, nǐ zěnme bù chī le?",
            "vietnamese": "Thịt cừu hôm nay rất ngon, sao bạn không ăn nữa?"
          },
          {
            "speaker": "B",
            "chinese": "这个星期天天都吃羊肉，不想吃了。",
            "pinyin": "Zhège xīngqī tiāntiān dōu chī yángròu, bù xiǎng chī le.",
            "vietnamese": "Tuần này ngày nào cũng ăn thịt cừu, không muốn ăn nữa."
          },
          {
            "speaker": "A",
            "chinese": "那你还想吃什么？",
            "pinyin": "Nà nǐ hái xiǎng chī shénme?",
            "vietnamese": "Vậy bạn còn muốn ăn gì?"
          },
          {
            "speaker": "B",
            "chinese": "来一点儿面条吧。",
            "pinyin": "Lái yìdiǎnr miàntiáo ba.",
            "vietnamese": "Cho một ít mì đi."
          }
        ]
      },
      {
        "title": "健身房里 (Ở phòng tập)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "昨天你们怎么都没去打篮球？",
            "pinyin": "Zuótiān nǐmen zěnme dōu méi qù dǎ lánqiú?",
            "vietnamese": "Hôm qua sao các bạn đều không đi đánh bóng rổ?"
          },
          {
            "speaker": "B",
            "chinese": "因为昨天下雨，所以我们都没去。我去游泳了。",
            "pinyin": "Yīnwèi zuótiān xià yǔ, suǒyǐ wǒmen dōu méi qù. Wǒ qù yóuyǒng le.",
            "vietnamese": "Bởi vì hôm qua trời mưa, cho nên chúng tôi đều không đi. Tôi đi bơi rồi."
          },
          {
            "speaker": "A",
            "chinese": "你经常游泳吗？",
            "pinyin": "Nǐ jīngcháng yóuyǒng ma?",
            "vietnamese": "Bạn có thường xuyên bơi không?"
          },
          {
            "speaker": "B",
            "chinese": "这个月我天天游泳，我现在七十公斤了。",
            "pinyin": "Zhège yuè wǒ tiāntiān yóuyǒng, wǒ xiànzài qīshí gōngjīn le.",
            "vietnamese": "Tháng này ngày nào tôi cũng bơi, bây giờ tôi 70kg rồi."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk2_07",
    "dialogues": [
      {
        "title": "家里 (Ở nhà)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "大卫回来了吗？",
            "pinyin": "Dàwèi huílái le ma?",
            "vietnamese": "David đã về chưa?"
          },
          {
            "speaker": "B",
            "chinese": "没有，他还在教室学习呢。",
            "pinyin": "Méiyǒu, tā hái zài jiàoshì xuéxí ne.",
            "vietnamese": "Chưa, cậu ấy vẫn đang ở phòng học học bài."
          },
          {
            "speaker": "A",
            "chinese": "已经九点多了，他怎么还在学习？",
            "pinyin": "Yǐjīng jiǔ diǎn duō le, tā zěnme hái zài xuéxí?",
            "vietnamese": "Đã hơn 9 giờ rồi, sao cậu ấy vẫn còn học?"
          },
          {
            "speaker": "B",
            "chinese": "明天有考试，他说今天要好好准备。",
            "pinyin": "Míngtiān yǒu kǎoshì, tā shuō jīntiān yào hǎohāo zhǔnbèi.",
            "vietnamese": "Ngày mai có bài thi, cậu ấy nói hôm nay phải chuẩn bị thật tốt."
          }
        ]
      },
      {
        "title": "去机场的路上 (Trên đường đi sân bay)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "你现在在哪儿呢？",
            "pinyin": "Nǐ xiànzài zài nǎr ne?",
            "vietnamese": "Bây giờ bạn đang ở đâu?"
          },
          {
            "speaker": "B",
            "chinese": "在去机场的路上。你已经到了吗？",
            "pinyin": "Zài qù jīchǎng de lù shang. Nǐ yǐjīng dào le ma?",
            "vietnamese": "Đang trên đường đến sân bay. Bạn đã đến chưa?"
          },
          {
            "speaker": "A",
            "chinese": "我下飞机了。你还有多长时间能到这儿？",
            "pinyin": "Wǒ xià fēijī le. Nǐ hái yǒu duō cháng shíjiān néng dào zhèr?",
            "vietnamese": "Tôi xuống máy bay rồi. Bạn còn bao lâu nữa thì đến đây?"
          },
          {
            "speaker": "B",
            "chinese": "二十分钟就到。",
            "pinyin": "Èrshí fēnzhōng jiù dào.",
            "vietnamese": "20 phút nữa là đến."
          }
        ]
      },
      {
        "title": "健身房里 (Ở phòng tập)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "你家离公司远吗？",
            "pinyin": "Nǐ jiā lí gōngsī yuǎn ma?",
            "vietnamese": "Nhà bạn cách công ty xa không?"
          },
          {
            "speaker": "B",
            "chinese": "很远，坐公共汽车要一个多小时呢！",
            "pinyin": "Hěn yuǎn, zuò gōnggòng qìchē yào yí gè duō xiǎoshí ne!",
            "vietnamese": "Rất xa, đi xe buýt mất hơn một tiếng lận!"
          },
          {
            "speaker": "A",
            "chinese": "坐公共汽车太慢了，你怎么不开车？",
            "pinyin": "Zuò gōnggòng qìchē tài màn le, nǐ zěnme bù kāi chē?",
            "vietnamese": "Đi xe buýt chậm quá, sao bạn không lái xe?"
          },
          {
            "speaker": "B",
            "chinese": "开车也不快，路上车太多了。",
            "pinyin": "Kāi chē yě bú kuài, lù shang chē tài duō le.",
            "vietnamese": "Lái xe cũng không nhanh, trên đường quá nhiều xe."
          }
        ]
      },
      {
        "title": "路上 (Trên đường)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "今天晚上我们一起吃饭吧，给你过生日。",
            "pinyin": "Jīntiān wǎnshang wǒmen yìqǐ chī fàn ba, gěi nǐ guò shēngrì.",
            "vietnamese": "Tối nay chúng ta cùng nhau ăn cơm nhé, đón sinh nhật cho bạn."
          },
          {
            "speaker": "B",
            "chinese": "今天？离我的生日还有一个多星期呢！",
            "pinyin": "Jīntiān? Lí wǒ de shēngrì hái yǒu yí gè duō xīngqī ne!",
            "vietnamese": "Hôm nay? Cách sinh nhật của tôi còn hơn một tuần nữa cơ mà!"
          },
          {
            "speaker": "A",
            "chinese": "下个星期我要去北京，今天过吧。",
            "pinyin": "Xià gè xīngqī wǒ yào qù Běijīng, jīntiān guò ba.",
            "vietnamese": "Tuần sau tôi phải đi Bắc Kinh rồi, hôm nay tổ chức luôn đi."
          },
          {
            "speaker": "B",
            "chinese": "好吧，离这儿不远有一个中国饭馆，走几分钟就到了。",
            "pinyin": "Hǎo ba, lí zhèr bù yuǎn yǒu yí gè Zhōngguó fànguǎn, zǒu jǐ fēnzhōng jiù dào le.",
            "vietnamese": "Được thôi, cách đây không xa có một nhà hàng Trung Quốc, đi bộ vài phút là đến."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk2_08",
    "dialogues": [
      {
        "title": "教室里 (Trong lớp học)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "我们下午去看电影，好吗？",
            "pinyin": "Wǒmen xiàwǔ qù kàn diànyǐng, hǎo ma?",
            "vietnamese": "Chiều nay chúng ta đi xem phim, được không?"
          },
          {
            "speaker": "B",
            "chinese": "今天下午我没有时间，明天下午再去吧。",
            "pinyin": "Jīntiān xiàwǔ wǒ méiyǒu shíjiān, míngtiān xiàwǔ zài qù ba.",
            "vietnamese": "Chiều nay tôi không có thời gian, chiều mai hẵng đi."
          },
          {
            "speaker": "A",
            "chinese": "那你明天看看今天晚上的报纸再告诉我。",
            "pinyin": "Nà nǐ míngtiān kàn kàn jīntiān wǎnshang de bàozhǐ zài gàosu wǒ.",
            "vietnamese": "Vậy ngày mai bạn xem tờ báo tối nay rồi nói cho tôi biết."
          },
          {
            "speaker": "B",
            "chinese": "好。",
            "pinyin": "Hǎo.",
            "vietnamese": "Được."
          }
        ]
      },
      {
        "title": "打电话 (Gọi điện thoại)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "喂，请问，是王先生吗？",
            "pinyin": "Wéi, qǐngwèn, shì Wáng xiānsheng ma?",
            "vietnamese": "Alo, xin hỏi, có phải ông Vương không?"
          },
          {
            "speaker": "B",
            "chinese": "他不在，去外地工作了。",
            "pinyin": "Tā bú zài, qù wàidì gōngzuò le.",
            "vietnamese": "Ông ấy không có đây, đi công tác tỉnh ngoài rồi."
          },
          {
            "speaker": "A",
            "chinese": "他什么时候回来？",
            "pinyin": "Tā shénme shíhou huílái?",
            "vietnamese": "Khi nào ông ấy về?"
          },
          {
            "speaker": "B",
            "chinese": "等他回来再打吧。你要告诉他什么事情？",
            "pinyin": "Děng tā huílái zài dǎ ba. Nǐ yào gàosu tā shénme shìqing?",
            "vietnamese": "Đợi ông ấy về hẵng gọi. Bạn muốn báo cho ông ấy việc gì?"
          },
          {
            "speaker": "A",
            "chinese": "我想让他去北京看一看。",
            "pinyin": "Wǒ xiǎng ràng tā qù Běijīng kàn yí kàn.",
            "vietnamese": "Tôi muốn bảo ông ấy đi Bắc Kinh xem sao."
          }
        ]
      },
      {
        "title": "宾馆前台 (Quầy lễ tân khách sạn)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "服务员，我房间的门打不开了。",
            "pinyin": "Fúwùyuán, wǒ fángjiān de mén dǎ bù kāi le.",
            "vietnamese": "Phục vụ, cửa phòng tôi không mở được nữa."
          },
          {
            "speaker": "B",
            "chinese": "您住哪个房间？",
            "pinyin": "Nín zhù nǎge fángjiān?",
            "vietnamese": "Ngài ở phòng nào?"
          },
          {
            "speaker": "A",
            "chinese": "三一七。",
            "pinyin": "Sān-yāo-qī.",
            "vietnamese": "317."
          },
          {
            "speaker": "B",
            "chinese": "好的，我叫人去看看。",
            "pinyin": "Hǎo de, wǒ jiào rén qù kàn kàn.",
            "vietnamese": "Vâng, tôi gọi người qua xem thử."
          }
        ]
      },
      {
        "title": "商店里 (Trong cửa hàng)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "你看看这几件衣服怎么样。",
            "pinyin": "Nǐ kàn kàn zhè jǐ jiàn yīfu zěnmeyàng.",
            "vietnamese": "Bạn xem mấy bộ quần áo này thế nào."
          },
          {
            "speaker": "B",
            "chinese": "这件白的有点儿长，那件黑的有点儿贵。",
            "pinyin": "Zhè jiàn bái de yǒu diǎnr cháng, nà jiàn hēi de yǒu diǎnr guì.",
            "vietnamese": "Chiếc màu trắng này hơi dài, chiếc màu đen kia hơi đắt."
          },
          {
            "speaker": "A",
            "chinese": "这件红的呢？这是今天刚来的。",
            "pinyin": "Zhè jiàn hóng de ne? Zhè shì jīntiān gāng lái de.",
            "vietnamese": "Chiếc màu đỏ này thì sao? Đây là hàng hôm nay mới về."
          },
          {
            "speaker": "B",
            "chinese": "让我想想再告诉你。",
            "pinyin": "Ràng wǒ xiǎng xiǎng zài gàosu nǐ.",
            "vietnamese": "Để tôi nghĩ chút rồi nói cho bạn."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk2_09",
    "dialogues": [
      {
        "title": "打电话 (Gọi điện thoại)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "你好！请问张欢在吗？",
            "pinyin": "Nǐ hǎo! Qǐngwèn Zhāng Huān zài ma?",
            "vietnamese": "Chào bạn! Xin hỏi Trương Hoan có đó không?"
          },
          {
            "speaker": "B",
            "chinese": "你打错了，我们这儿没有叫张欢的。",
            "pinyin": "Nǐ dǎ cuò le, wǒmen zhèr méiyǒu jiào Zhāng Huān de.",
            "vietnamese": "Bạn gọi nhầm rồi, chỗ chúng tôi không có ai tên Trương Hoan."
          },
          {
            "speaker": "A",
            "chinese": "对不起。",
            "pinyin": "Duìbuqǐ.",
            "vietnamese": "Xin lỗi."
          }
        ]
      },
      {
        "title": "谈跳舞 (Nói về khiêu vũ)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "您从几岁开始学习跳舞？",
            "pinyin": "Nín cóng jǐ suì kāishǐ xuéxí tiàowǔ?",
            "vietnamese": "Ngài bắt đầu học nhảy từ lúc mấy tuổi?"
          },
          {
            "speaker": "B",
            "chinese": "我第一次跳舞是在七岁的时候。",
            "pinyin": "Wǒ dì-yī cì tiàowǔ shì zài qī suì de shíhou.",
            "vietnamese": "Lần đầu tiên tôi khiêu vũ là lúc 7 tuổi."
          },
          {
            "speaker": "A",
            "chinese": "我女儿今年也七岁了。我希望她能跟您学跳舞，可以吗？",
            "pinyin": "Wǒ nǚ'ér jīnnián yě qī suì le. Wǒ xīwàng tā néng gēn nín xué tiàowǔ, kěyǐ ma?",
            "vietnamese": "Con gái tôi năm nay cũng 7 tuổi rồi. Tôi hy vọng con bé có thể học nhảy với ngài, được không?"
          },
          {
            "speaker": "B",
            "chinese": "没问题，非常欢迎。",
            "pinyin": "Méi wèntí, fēicháng huānyíng.",
            "vietnamese": "Không vấn đề gì, rất hoan nghênh."
          }
        ]
      },
      {
        "title": "路上 (Trên đường)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "你知道怎么去医院吗？",
            "pinyin": "Nǐ zhīdào zěnme qù yīyuàn ma?",
            "vietnamese": "Bạn có biết đường đến bệnh viện đi thế nào không?"
          },
          {
            "speaker": "B",
            "chinese": "知道，我们先坐公共汽车，然后换地铁，很方便。",
            "pinyin": "Zhīdào, wǒmen xiān zuò gōnggòng qìchē, ránhòu huàn dìtiě, hěn fāngbiàn.",
            "vietnamese": "Biết, chúng ta đi xe buýt trước, sau đó đổi sang tàu điện ngầm, rất thuận tiện."
          }
        ]
      },
      {
        "title": "教室里 (Trong lớp học)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "今天的考试怎么样？",
            "pinyin": "Jīntiān de kǎoshì zěnmeyàng?",
            "vietnamese": "Bài thi hôm nay thế nào?"
          },
          {
            "speaker": "B",
            "chinese": "题太多，我没做完。",
            "pinyin": "Tí tài duō, wǒ méi zuò wán.",
            "vietnamese": "Đề nhiều quá, tôi làm chưa xong."
          },
          {
            "speaker": "A",
            "chinese": "你听懂了没有？",
            "pinyin": "Nǐ tīng dǒng le méiyǒu?",
            "vietnamese": "Bạn nghe có hiểu không?"
          },
          {
            "speaker": "B",
            "chinese": "听懂了，可是说得不好。",
            "pinyin": "Tīng dǒng le, kěshì shuō de bù hǎo.",
            "vietnamese": "Nghe hiểu rồi, nhưng mà nói không tốt."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk2_10",
    "dialogues": [
      {
        "title": "家里 (Ở nhà)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "别找了，手机在桌子上呢。",
            "pinyin": "Bié zhǎo le, shǒujī zài zhuōzi shang ne.",
            "vietnamese": "Đừng tìm nữa, điện thoại trên bàn kìa."
          },
          {
            "speaker": "B",
            "chinese": "是吗？刚才怎么没看到？",
            "pinyin": "Shì ma? Gāngcái zěnme méi kàndào?",
            "vietnamese": "Vậy sao? Vừa nãy sao không nhìn thấy?"
          },
          {
            "speaker": "A",
            "chinese": "你洗脸了吗？",
            "pinyin": "Nǐ xǐ liǎn le ma?",
            "vietnamese": "Bạn rửa mặt chưa?"
          },
          {
            "speaker": "B",
            "chinese": "还没洗，我先去洗。",
            "pinyin": "Hái méi xǐ, wǒ xiān qù xǐ.",
            "vietnamese": "Vẫn chưa rửa, tôi đi rửa trước đây."
          }
        ]
      },
      {
        "title": "家里 (Ở nhà)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "洗衣服呢？",
            "pinyin": "Xǐ yīfu ne?",
            "vietnamese": "Đang giặt quần áo hả?"
          },
          {
            "speaker": "B",
            "chinese": "是啊，我想今天晚上穿这件衣服。",
            "pinyin": "Shì a, wǒ xiǎng jīntiān wǎnshang chuān zhè jiàn yīfu.",
            "vietnamese": "Đúng vậy, tôi muốn tối nay mặc chiếc áo này."
          },
          {
            "speaker": "A",
            "chinese": "明天是星期天，你还要去上班？",
            "pinyin": "Míngtiān shì xīngqītiān, nǐ hái yào qù shàngbān?",
            "vietnamese": "Ngày mai là chủ nhật, bạn vẫn phải đi làm à?"
          },
          {
            "speaker": "B",
            "chinese": "不去，明天去准备哥哥的生日。",
            "pinyin": "Bú qù, míngtiān qù zhǔnbèi gēge de shēngrì.",
            "vietnamese": "Không đi, ngày mai đi chuẩn bị sinh nhật của anh trai."
          }
        ]
      },
      {
        "title": "宿舍里 (Trong ký túc xá)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "你在做什么呢？",
            "pinyin": "Nǐ zài zuò shénme ne?",
            "vietnamese": "Bạn đang làm gì vậy?"
          },
          {
            "speaker": "B",
            "chinese": "我在看电视，你呢？",
            "pinyin": "Wǒ zài kàn diànshì, nǐ ne?",
            "vietnamese": "Tôi đang xem tivi, còn bạn?"
          },
          {
            "speaker": "A",
            "chinese": "我在学习，明天有考试，你要帮助我准备一下。",
            "pinyin": "Wǒ zài xuéxí, míngtiān yǒu kǎoshì, nǐ yào bāngzhù wǒ zhǔnbèi yíxià.",
            "vietnamese": "Tôi đang học, ngày mai có bài thi, bạn phải giúp tôi chuẩn bị một chút."
          },
          {
            "speaker": "B",
            "chinese": "好，你想让我怎么帮你？",
            "pinyin": "Hǎo, nǐ xiǎng ràng wǒ zěnme bāng nǐ?",
            "vietnamese": "Được, bạn muốn tôi giúp bạn thế nào?"
          }
        ]
      },
      {
        "title": "商店里 (Trong cửa hàng)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "我们买几个西瓜吧？",
            "pinyin": "Wǒmen mǎi jǐ gè xīguā ba?",
            "vietnamese": "Chúng ta mua mấy quả dưa hấu nhé?"
          },
          {
            "speaker": "B",
            "chinese": "不买了，家里还有一些苹果呢。",
            "pinyin": "Bù mǎi le, jiālǐ hái yǒu yìxiē píngguǒ ne.",
            "vietnamese": "Không mua nữa, trong nhà vẫn còn một ít táo mà."
          },
          {
            "speaker": "A",
            "chinese": "还要买几个鸡蛋。",
            "pinyin": "Hái yào mǎi jǐ gè jīdàn.",
            "vietnamese": "Còn phải mua mấy quả trứng gà nữa."
          },
          {
            "speaker": "B",
            "chinese": "好，你看，有人正在买鸡蛋呢，我们也去看看。",
            "pinyin": "Hǎo, nǐ kàn, yǒu rén zhèngzài mǎi jīdàn ne, wǒmen yě qù kàn kàn.",
            "vietnamese": "Được, bạn xem, đang có người mua trứng gà kìa, chúng ta cũng qua xem thử."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk2_11",
    "dialogues": [
      {
        "title": "谈唱歌 (Nói về ca hát)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "王方，昨天和你一起唱歌的人是谁？",
            "pinyin": "Wáng Fāng, zuótiān hé nǐ yìqǐ chàng gē de rén shì shéi?",
            "vietnamese": "Vương Phương, người hát cùng bạn hôm qua là ai?"
          },
          {
            "speaker": "B",
            "chinese": "一个朋友。",
            "pinyin": "Yí gè péngyou.",
            "vietnamese": "Một người bạn."
          },
          {
            "speaker": "A",
            "chinese": "什么朋友？是不是男朋友？",
            "pinyin": "Shénme péngyou? Shì bú shì nán péngyou?",
            "vietnamese": "Bạn gì? Có phải là bạn trai không?"
          },
          {
            "speaker": "B",
            "chinese": "不是不是，我同学介绍的，昨天第一次见。",
            "pinyin": "Bú shì bú shì, wǒ tóngxué jièshào de, zuótiān dì-yī cì jiàn.",
            "vietnamese": "Không phải không phải, bạn học của tôi giới thiệu, hôm qua mới gặp lần đầu."
          }
        ]
      },
      {
        "title": "谈家人 (Nói về người nhà)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "左边这个看报纸的女孩子是你姐姐吗？",
            "pinyin": "Zuǒbian zhège kàn bàozhǐ de nǚ háizi shì nǐ jiějie ma?",
            "vietnamese": "Cô gái đọc báo ở bên trái này là chị gái của bạn à?"
          },
          {
            "speaker": "B",
            "chinese": "是，右边写字的那个人是我哥哥。",
            "pinyin": "Shì, yòubian xiězì de nàge rén shì wǒ gēge.",
            "vietnamese": "Đúng vậy, người viết chữ ở bên phải kia là anh trai tôi."
          },
          {
            "speaker": "A",
            "chinese": "你哥哥多大？",
            "pinyin": "Nǐ gēge duō dà?",
            "vietnamese": "Anh trai bạn bao nhiêu tuổi?"
          },
          {
            "speaker": "B",
            "chinese": "二十五岁，他比我大三岁。",
            "pinyin": "Èrshíwǔ suì, tā bǐ wǒ dà sān suì.",
            "vietnamese": "25 tuổi, anh ấy lớn hơn tôi 3 tuổi."
          }
        ]
      },
      {
        "title": "商店里 (Trong cửa hàng)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "今天的西瓜怎么卖？",
            "pinyin": "Jīntiān de xīguā zěnme mài?",
            "vietnamese": "Dưa hấu hôm nay bán thế nào?"
          },
          {
            "speaker": "B",
            "chinese": "三块五一斤。",
            "pinyin": "Sān kuài wǔ yì jīn.",
            "vietnamese": "3 đồng rưỡi 1 cân (0.5kg)."
          },
          {
            "speaker": "A",
            "chinese": "比昨天便宜。",
            "pinyin": "Bǐ zuótiān piányi.",
            "vietnamese": "Rẻ hơn hôm qua."
          },
          {
            "speaker": "B",
            "chinese": "是，苹果也比昨天便宜一些，您来点儿吧。",
            "pinyin": "Shì, píngguǒ yě bǐ zuótiān piányi yìxiē, nín lái diǎnr ba.",
            "vietnamese": "Vâng, táo cũng rẻ hơn hôm qua một chút, ngài mua một ít nhé."
          }
        ]
      },
      {
        "title": "路上 (Trên đường)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "前边说话的那个人是谁？",
            "pinyin": "Qiánbian shuōhuà de nàge rén shì shéi?",
            "vietnamese": "Người đang nói chuyện ở phía trước kia là ai?"
          },
          {
            "speaker": "B",
            "chinese": "没看清，是张明吗？",
            "pinyin": "Méi kàn qīng, shì Zhāng Míng ma?",
            "vietnamese": "Nhìn không rõ, là Trương Minh à?"
          },
          {
            "speaker": "A",
            "chinese": "好像不是。",
            "pinyin": "Hǎoxiàng bú shì.",
            "vietnamese": "Hình như không phải."
          },
          {
            "speaker": "B",
            "chinese": "那个人姓李。",
            "pinyin": "Nàge rén xìng Lǐ.",
            "vietnamese": "Người kia họ Lý."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk2_12",
    "dialogues": [
      {
        "title": "教室里 (Trong lớp học)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "你每天起得这么早？",
            "pinyin": "Nǐ měitiān qǐ de zhème zǎo?",
            "vietnamese": "Ngày nào bạn cũng dậy sớm thế này à?"
          },
          {
            "speaker": "B",
            "chinese": "是，我每天六点起床。",
            "pinyin": "Shì, wǒ měitiān liù diǎn qǐchuáng.",
            "vietnamese": "Vâng, mỗi ngày tôi đều thức dậy lúc 6 giờ."
          },
          {
            "speaker": "A",
            "chinese": "你妻子呢？",
            "pinyin": "Nǐ qīzi ne?",
            "vietnamese": "Còn vợ bạn?"
          },
          {
            "speaker": "B",
            "chinese": "她比我起得晚，七点起床。",
            "pinyin": "Tā bǐ wǒ qǐ de wǎn, qī diǎn qǐchuáng.",
            "vietnamese": "Cô ấy dậy muộn hơn tôi, 7 giờ mới dậy."
          }
        ]
      },
      {
        "title": "路上 (Trên đường)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "今天天气怎么样？",
            "pinyin": "Jīntiān tiānqì zěnmeyàng?",
            "vietnamese": "Thời tiết hôm nay thế nào?"
          },
          {
            "speaker": "B",
            "chinese": "下雪了，很冷。",
            "pinyin": "Xià xuě le, hěn lěng.",
            "vietnamese": "Tuyết rơi rồi, rất lạnh."
          },
          {
            "speaker": "A",
            "chinese": "零下多少度？",
            "pinyin": "Líng xià duōshao dù?",
            "vietnamese": "Âm bao nhiêu độ?"
          },
          {
            "speaker": "B",
            "chinese": "零下十度。你要穿得多一点儿。",
            "pinyin": "Líng xià shí dù. Nǐ yào chuān de duō yìdiǎnr.",
            "vietnamese": "Âm 10 độ. Bạn phải mặc nhiều một chút."
          }
        ]
      },
      {
        "title": "饭馆里 (Trong nhà hàng)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "门开着呢，请进。",
            "pinyin": "Mén kāi zhe ne, qǐng jìn.",
            "vietnamese": "Cửa đang mở đấy, mời vào."
          },
          {
            "speaker": "B",
            "chinese": "谢谢。你弟弟在哪儿呢？",
            "pinyin": "Xièxie. Nǐ dìdi zài nǎr ne?",
            "vietnamese": "Cảm ơn. Em trai bạn đâu rồi?"
          },
          {
            "speaker": "A",
            "chinese": "他去买东西了。",
            "pinyin": "Tā qù mǎi dōngxi le.",
            "vietnamese": "Cậu ấy đi mua đồ rồi."
          },
          {
            "speaker": "B",
            "chinese": "那我们等他一下吧。",
            "pinyin": "Nà wǒmen děng tā yíxià ba.",
            "vietnamese": "Vậy chúng ta đợi cậu ấy một lát nhé."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk2_13",
    "dialogues": [
      {
        "title": "办公室里 (Trong văn phòng)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "门开着呢，请进。",
            "pinyin": "Mén kāi zhe ne, qǐng jìn.",
            "vietnamese": "Cửa đang mở, mời vào."
          },
          {
            "speaker": "B",
            "chinese": "请问，张先生在吗？",
            "pinyin": "Qǐngwèn, Zhāng xiānsheng zài ma?",
            "vietnamese": "Xin hỏi, ông Trương có ở đây không?"
          },
          {
            "speaker": "A",
            "chinese": "他出去了。你下午再来吧。",
            "pinyin": "Tā chūqù le. Nǐ xiàwǔ zài lái ba.",
            "vietnamese": "Ông ấy ra ngoài rồi. Buổi chiều bạn hẵng quay lại."
          },
          {
            "speaker": "B",
            "chinese": "好的，谢谢！",
            "pinyin": "Hǎo de, xièxie!",
            "vietnamese": "Vâng, cảm ơn!"
          }
        ]
      },
      {
        "title": "办公室里 (Trong văn phòng)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "那个拿铅笔的人是谁？",
            "pinyin": "Nàge ná qiānbǐ de rén shì shéi?",
            "vietnamese": "Người đang cầm bút chì kia là ai?"
          },
          {
            "speaker": "B",
            "chinese": "不是拿铅笔的，是拿书的。",
            "pinyin": "Bú shì ná qiānbǐ de, shì ná shū de.",
            "vietnamese": "Không phải người cầm bút chì, là người cầm sách."
          },
          {
            "speaker": "A",
            "chinese": "我是说，那个在笑的人。",
            "pinyin": "Wǒ shì shuō, nàge zài xiào de rén.",
            "vietnamese": "Ý tôi là, cái người đang cười kia kìa."
          },
          {
            "speaker": "B",
            "chinese": "那是我班的同学。",
            "pinyin": "Nà shì wǒ bān de tóngxué.",
            "vietnamese": "Đó là bạn cùng lớp của tôi."
          }
        ]
      },
      {
        "title": "路上 (Trên đường)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "请问，去宾馆怎么走？",
            "pinyin": "Qǐngwèn, qù bīnguǎn zěnme zǒu?",
            "vietnamese": "Xin hỏi, đến khách sạn đi đường nào?"
          },
          {
            "speaker": "B",
            "chinese": "一直往前走，到了路口往左走。",
            "pinyin": "Yìzhí wǎng qián zǒu, dào le lùkǒu wǎng zuǒ zǒu.",
            "vietnamese": "Cứ đi thẳng về phía trước, đến ngã tư thì rẽ trái."
          },
          {
            "speaker": "A",
            "chinese": "远不远？",
            "pinyin": "Yuǎn bù yuǎn?",
            "vietnamese": "Có xa không?"
          },
          {
            "speaker": "B",
            "chinese": "不远，就在右边。",
            "pinyin": "Bù yuǎn, jiù zài yòubian.",
            "vietnamese": "Không xa, ở ngay bên phải."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk2_14",
    "dialogues": [
      {
        "title": "教室里 (Trong lớp học)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "你看过那个电影吗？",
            "pinyin": "Nǐ kàn guo nàge diànyǐng ma?",
            "vietnamese": "Bạn đã từng xem bộ phim đó chưa?"
          },
          {
            "speaker": "B",
            "chinese": "没看过，听说很有意思。",
            "pinyin": "Méi kàn guo, tīngshuō hěn yǒu yìsi.",
            "vietnamese": "Chưa xem, nghe nói rất thú vị."
          },
          {
            "speaker": "A",
            "chinese": "那我们下个星期一起去看吧。",
            "pinyin": "Nà wǒmen xià gè xīngqī yìqǐ qù kàn ba.",
            "vietnamese": "Vậy tuần sau chúng ta cùng đi xem nhé."
          },
          {
            "speaker": "B",
            "chinese": "可以，但是我女朋友也想去。",
            "pinyin": "Kěyǐ, dànshì wǒ nǚpéngyou yě xiǎng qù.",
            "vietnamese": "Được, nhưng bạn gái tôi cũng muốn đi."
          }
        ]
      },
      {
        "title": "办公室里 (Trong văn phòng)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "听说你去过中国，是吗？",
            "pinyin": "Tīngshuō nǐ qù guo Zhōngguó, shì ma?",
            "vietnamese": "Nghe nói bạn đã từng đi Trung Quốc phải không?"
          },
          {
            "speaker": "B",
            "chinese": "是，去过一次。",
            "pinyin": "Shì, qù guo yí cì.",
            "vietnamese": "Vâng, đã từng đi một lần."
          },
          {
            "speaker": "A",
            "chinese": "你去中国做什么了？",
            "pinyin": "Nǐ qù Zhōngguó zuò shénme le?",
            "vietnamese": "Bạn đi Trung Quốc làm gì vậy?"
          },
          {
            "speaker": "B",
            "chinese": "去旅游。虽然去了很多地方，但是没去过长城。",
            "pinyin": "Qù lǚyóu. Suīrán qù le hěnduō dìfang, dànshì méi qù guo Chángchéng.",
            "vietnamese": "Đi du lịch. Mặc dù đã đi rất nhiều nơi, nhưng chưa từng đi Trường Thành."
          }
        ]
      },
      {
        "title": "房间里 (Trong phòng)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "明天天气怎么样？",
            "pinyin": "Míngtiān tiānqì zěnmeyàng?",
            "vietnamese": "Thời tiết ngày mai thế nào?"
          },
          {
            "speaker": "B",
            "chinese": "虽然是晴天，但是很冷。",
            "pinyin": "Suīrán shì qíngtiān, dànshì hěn lěng.",
            "vietnamese": "Mặc dù là trời nắng, nhưng rất lạnh."
          },
          {
            "speaker": "A",
            "chinese": "那还能去打篮球吗？",
            "pinyin": "Nà hái néng qù dǎ lánqiú ma?",
            "vietnamese": "Vậy còn có thể đi đánh bóng rổ không?"
          },
          {
            "speaker": "B",
            "chinese": "可以，但是你要多穿点儿衣服。",
            "pinyin": "Kěyǐ, dànshì nǐ yào duō chuān diǎnr yīfu.",
            "vietnamese": "Có thể, nhưng bạn phải mặc nhiều quần áo một chút."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk2_15",
    "dialogues": [
      {
        "title": "房间里 (Trong phòng)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "新年就要到了，你准备做什么？",
            "pinyin": "Xīnnián jiù yào dào le, nǐ zhǔnbèi zuò shénme?",
            "vietnamese": "Năm mới sắp đến rồi, bạn dự định làm gì?"
          },
          {
            "speaker": "B",
            "chinese": "我我想去北京旅游，北京很不错。",
            "pinyin": "Wǒ xiǎng qù Běijīng lǚyóu, Běijīng hěn búcuò.",
            "vietnamese": "Tôi muốn đi du lịch Bắc Kinh, Bắc Kinh rất tuyệt."
          },
          {
            "speaker": "A",
            "chinese": "票买好了吗？",
            "pinyin": "Piào mǎi hǎo le ma?",
            "vietnamese": "Mua vé xong chưa?"
          },
          {
            "speaker": "B",
            "chinese": "还没有呢，明天去火车站买。",
            "pinyin": "Hái méiyǒu ne, míngtiān qù huǒchēzhàn mǎi.",
            "vietnamese": "Vẫn chưa, ngày mai đi ga tàu hỏa mua."
          }
        ]
      },
      {
        "title": "公司里 (Trong công ty)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "时间过得真快，新的一年快要到了！",
            "pinyin": "Shíjiān guò de zhēn kuài, xīn de yì nián kuàiyào dào le!",
            "vietnamese": "Thời gian trôi qua thật nhanh, một năm mới sắp đến rồi!"
          },
          {
            "speaker": "B",
            "chinese": "是啊，谢谢大家这一年对我的帮助。",
            "pinyin": "Shì a, xièxie dàjiā zhè yì nián duì wǒ de bāngzhù.",
            "vietnamese": "Đúng vậy, cảm ơn sự giúp đỡ của mọi người dành cho tôi trong năm nay."
          },
          {
            "speaker": "A",
            "chinese": "希望我们的公司明年更好！",
            "pinyin": "Xīwàng wǒmen de gōngsī míngnián gèng hǎo!",
            "vietnamese": "Hy vọng công ty của chúng ta năm sau sẽ càng tốt hơn!"
          }
        ]
      },
      {
        "title": "车站里 (Trong nhà ga)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "你妹妹怎么还没来？",
            "pinyin": "Nǐ mèimei zěnme hái méi lái?",
            "vietnamese": "Sao em gái bạn vẫn chưa đến?"
          },
          {
            "speaker": "B",
            "chinese": "可能下雨了，路上很慢。",
            "pinyin": "Kěnéng xià yǔ le, lù shang hěn màn.",
            "vietnamese": "Có thể trời mưa, trên đường đi rất chậm."
          },
          {
            "speaker": "A",
            "chinese": "今天阴天，还没下雨呢。",
            "pinyin": "Jīntiān yīn tiān, hái méi xià yǔ ne.",
            "vietnamese": "Hôm nay trời nhiều mây, vẫn chưa mưa đâu."
          },
          {
            "speaker": "B",
            "chinese": "那她可能在买东西呢。",
            "pinyin": "Nà tā kěnéng zài mǎi dōngxi ne.",
            "vietnamese": "Vậy có lẽ con bé đang đi mua đồ rồi."
          }
        ]
      }
    ]
  },
      {
    "topicId": "top_hsk3_01",
    "dialogues": [
      {
        "title": "1. 谈周末的打算 (Nói về dự định cuối tuần)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "周末你有什么打算？",
            "pinyin": "Zhōumò nǐ yǒu shénme dǎsuàn?",
            "vietnamese": "Cuối tuần bạn có dự định gì?"
          },
          {
            "speaker": "B",
            "chinese": "我早就想好了，请你吃饭，看电影，喝咖啡。",
            "pinyin": "Wǒ zǎo jiù xiǎng hǎo le, qǐng nǐ chī fàn, kàn diànyǐng, hē kāfēi.",
            "vietnamese": "Mình đã nghĩ xong từ sớm rồi, mời bạn ăn cơm, xem phim, uống cà phê."
          },
          {
            "speaker": "A",
            "chinese": "请我？",
            "pinyin": "Qǐng wǒ?",
            "vietnamese": "Mời mình á?"
          },
          {
            "speaker": "B",
            "chinese": "是啊，我已经找好饭馆了，电影票也买好了。",
            "pinyin": "Shì a, wǒ yǐjīng zhǎo hǎo fànguǎn le, diànyǐng piào yě mǎi hǎo le.",
            "vietnamese": "Đúng vậy, mình đã tìm xong nhà hàng rồi, vé xem phim cũng mua xong rồi."
          },
          {
            "speaker": "A",
            "chinese": "我还没想好要不要跟你去呢。",
            "pinyin": "Wǒ hái méi xiǎng hǎo yào bú yào gēn nǐ qù ne.",
            "vietnamese": "Mình còn chưa nghĩ xong có nên đi cùng bạn không đây."
          }
        ]
      },
      {
        "title": "2. 在家 (Ở nhà)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "你一直玩儿电脑游戏，作业写完了吗？",
            "pinyin": "Nǐ yìzhí wánr diànnǎo yóuxì, zuòyè xiě wán le ma?",
            "vietnamese": "Con cứ chơi game trên máy tính suốt, bài tập làm xong chưa?"
          },
          {
            "speaker": "B",
            "chinese": "都写完了。",
            "pinyin": "Dōu xiě wán le.",
            "vietnamese": "Đều làm xong cả rồi ạ."
          },
          {
            "speaker": "A",
            "chinese": "明天不是有考试吗？你怎么一点儿也不着急？",
            "pinyin": "Míngtiān bú shì yǒu kǎoshì ma? Nǐ zěnme yìdiǎnr yě bù zháojí?",
            "vietnamese": "Ngày mai không phải có bài thi sao? Sao con chẳng lo lắng chút nào vậy?"
          },
          {
            "speaker": "B",
            "chinese": "我早就复习好了。",
            "pinyin": "Wǒ zǎo jiù fùxí hǎo le.",
            "vietnamese": "Con đã ôn tập xong từ sớm rồi."
          },
          {
            "speaker": "A",
            "chinese": "那也不能一直玩儿啊。",
            "pinyin": "Nà yě bù néng yìzhí wánr a.",
            "vietnamese": "Thế cũng không thể cứ chơi suốt được."
          }
        ]
      },
      {
        "title": "3. 聊旅游计划 (Nói chuyện về kế hoạch du lịch)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "下个月我去旅游，你能跟我一起去吗？",
            "pinyin": "Xià gè yuè wǒ qù lǚyóu, nǐ néng gēn wǒ yìqǐ qù ma?",
            "vietnamese": "Tháng sau mình đi du lịch, bạn có thể đi cùng mình không?"
          },
          {
            "speaker": "B",
            "chinese": "我还没想好呢。你觉得哪儿最好玩儿？",
            "pinyin": "Wǒ hái méi xiǎng hǎo ne. Nǐ juéde nǎr zuì hǎowánr?",
            "vietnamese": "Mình còn chưa nghĩ xong nữa. Bạn thấy ở đâu chơi vui nhất?"
          },
          {
            "speaker": "A",
            "chinese": "南方啊，我们去年就是这个时候去的。",
            "pinyin": "Nánfāng a, wǒmen qùnián jiùshì zhège shíhou qù de.",
            "vietnamese": "Miền Nam á, năm ngoái chúng ta chính là đi vào lúc này đấy."
          },
          {
            "speaker": "B",
            "chinese": "南方太热了，北方好一些，不冷也不热。",
            "pinyin": "Nánfāng tài rè le, běifāng hǎo yìxiē, bù lěng yě bú rè.",
            "vietnamese": "Miền Nam nóng quá, miền Bắc tốt hơn một chút, không lạnh cũng không nóng."
          }
        ]
      },
      {
        "title": "4. 准备去旅游 (Chuẩn bị đi du lịch)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "水果、面包、茶都准备好了。我们还带什么？",
            "pinyin": "Shuǐguǒ, miànbāo, chá dōu zhǔnbèi hǎo le. Wǒmen hái dài shénme?",
            "vietnamese": "Hoa quả, bánh mì, trà đều chuẩn bị xong rồi. Chúng ta còn mang gì nữa không?"
          },
          {
            "speaker": "B",
            "chinese": "手机、电脑、地图，一个也不能少。",
            "pinyin": "Shǒujī, diànnǎo, dìtú, yí gè yě bù néng shǎo.",
            "vietnamese": "Điện thoại, máy tính, bản đồ, một cái cũng không thể thiếu."
          },
          {
            "speaker": "A",
            "chinese": "这些我昨天下午就准备好了。",
            "pinyin": "Zhèxiē wǒ zuótiān xiàwǔ jiù zhǔnbèi hǎo le.",
            "vietnamese": "Những thứ này chiều hôm qua mình đã chuẩn bị xong rồi."
          },
          {
            "speaker": "B",
            "chinese": "再多带几件衣服吧。",
            "pinyin": "Zài duō dài jǐ jiàn yīfu ba.",
            "vietnamese": "Mang thêm vài bộ quần áo nữa đi."
          },
          {
            "speaker": "A",
            "chinese": "我们是去旅游，不是搬家，还是少带一些吧。",
            "pinyin": "Wǒmen shì qù lǚyóu, bú shì bān jiā, háishì shǎo dài yìxiē ba.",
            "vietnamese": "Chúng ta là đi du lịch, không phải chuyển nhà, tốt nhất là mang ít một chút đi."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk3_02",
    "dialogues": [
      {
        "title": "1. 下山的路上 (Trên đường xuống núi)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "休息一下吧，怎么了？",
            "pinyin": "Xiūxi yíxià ba, zěnme le?",
            "vietnamese": "Nghỉ ngơi một chút đi, sao thế?"
          },
          {
            "speaker": "B",
            "chinese": "我现在腿 juga? 腿也疼，脚 cũng 疼。",
            "pinyin": "Wǒ xiànzài tuǐ yě téng, jiǎo yě téng.",
            "vietnamese": "Bây giờ chân mình cũng đau, bàn chân cũng đau."
          },
          {
            "speaker": "A",
            "chinese": "好，那边树 duō, wǒmen guòqù zuò yíxià ba.",
            "pinyin": "Hǎo, nàbiān shù duō, wǒmen guòqù zuò yíxià ba.",
            "vietnamese": "Được, bên kia nhiều cây, chúng ta qua đó ngồi một lát đi."
          },
          {
            "speaker": "B",
            "chinese": "上来的时候我怎么没觉得这么累？",
            "pinyin": "Shànglái de shíhou wǒ zěnme méi juéde zhème lèi?",
            "vietnamese": "Lúc lên đây sao mình không cảm thấy mệt thế này nhỉ?"
          },
          {
            "speaker": "A",
            "chinese": "上山容易下山难，你不知道？",
            "pinyin": "Shàng shān róngyì xià shān nán, nǐ bù zhīdào?",
            "vietnamese": "Lên núi dễ xuống núi khó, bạn không biết à?"
          }
        ]
      },
      {
        "title": "2. 在打电话 (Đang gọi điện thoại)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "喂，你好，请问周明在吗？",
            "pinyin": "Wéi, nǐ hǎo, qǐngwèn Zhōu Míng zài ma?",
            "vietnamese": "Alo, chào bạn, xin hỏi Châu Minh có đó không?"
          },
          {
            "speaker": "B",
            "chinese": "他出去了，你下午再打吧。",
            "pinyin": "Tā chūqù le, nǐ xiàwǔ zài dǎ ba.",
            "vietnamese": "Anh ấy ra ngoài rồi, chiều bạn hẵng gọi lại nhé."
          },
          {
            "speaker": "A",
            "chinese": "他去哪儿了？什么时候回来？",
            "pinyin": "Tā qù nǎr le? Shénme shíhou huílái?",
            "vietnamese": "Anh ấy đi đâu rồi? Khi nào về?"
          },
          {
            "speaker": "B",
            "chinese": "他出去办事了，下午回来。",
            "pinyin": "Tā chūqù bàn shì le, xiàwǔ huílái.",
            "vietnamese": "Anh ấy ra ngoài làm việc rồi, buổi chiều về."
          }
        ]
      },
      {
        "title": "3. 在办公室外面 (Bên ngoài văn phòng)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "雨下得真大，你怎么回去啊？",
            "pinyin": "Yǔ xià de zhēn dà, nǐ zěnme huíqù a?",
            "vietnamese": "Mưa to thật, bạn về bằng cách nào đây?"
          },
          {
            "speaker": "B",
            "chinese": "我叫了出租车，马上就来。",
            "pinyin": "Wǒ jiào le chūzūchē, mǎshàng jiù lái.",
            "vietnamese": "Mình gọi taxi rồi, sắp đến ngay."
          },
          {
            "speaker": "A",
            "chinese": "那好，你路上慢点儿。",
            "pinyin": "Nà hǎo, nǐ lù shang màn diǎnr.",
            "vietnamese": "Vậy thì tốt, trên đường đi chậm chút nhé."
          },
          {
            "speaker": "B",
            "chinese": "没关系，等我到了家给你打电话。",
            "pinyin": "Méi guānxi, děng wǒ dào le jiā gěi nǐ dǎ diànhuà.",
            "vietnamese": "Không sao, đợi mình về đến nhà sẽ gọi điện cho bạn."
          }
        ]
      },
      {
        "title": "4. 在家里 (Ở nhà)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "你看你，mini hán? 最近越来越胖了。",
            "pinyin": "Nǐ kàn nǐ, zuìjìn yuè lái yuè pàng le.",
            "vietnamese": "Mình xem cậu kìa, dạo này ngày càng béo lên rồi."
          },
          {
            "speaker": "B",
            "chinese": "谁说的？我觉得自己越来越瘦了。",
            "pinyin": "Shéi shuō de? Wǒ juéde zìjǐ yuè lái yuè shòu le.",
            "vietnamese": "Ai nói vậy? Mình thấy bản thân ngày càng gầy đi thì có."
          },
          {
            "speaker": "A",
            "chinese": "你看这件衣服，以前穿多好，现在都穿不上了。",
            "pinyin": "Nǐ kàn zhè jiàn yīfu, yǐqián chuān duō hǎo, xiànzài dōu chuān bú shàng le.",
            "vietnamese": "Cậu nhìn bộ quần áo này xem, trước đây mặc vừa biết bao, bây giờ đều không mặc vừa nữa rồi."
          },
          {
            "speaker": "B",
            "chinese": "那是衣服瘦了，不是我胖了。(那sì衣服瘦了，不是我胖了。)",
            "pinyin": "Nà shì yīfu shòu le, bú xì wǒ pàng le.",
            "vietnamese": "Đó là quần áo chật đi, không phải mình béo lên."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk3_03",
    "dialogues": [
      {
        "title": "1. 在小丽家 (Ở nhà Tiểu Lệ)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "明天是晴天还是阴天？",
            "pinyin": "Míngtiān shì qíngtiān háishì yīn tiān?",
            "vietnamese": "Ngày mai là ngày nắng hay ngày râm mát?"
          },
          {
            "speaker": "B",
            "chinese": "晴天，电视上说多云。",
            "pinyin": "Qíngtiān, diànshì shang shuō duō yún.",
            "vietnamese": "Nắng, trên tivi nói nhiều mây."
          },
          {
            "speaker": "A",
            "chinese": "怎么了？有事？",
            "pinyin": "Zěnme le? Yǒu shì?",
            "vietnamese": "Sao vậy? Có việc à?"
          },
          {
            "speaker": "B",
            "chinese": "没事，我们明天要去爬山。",
            "pinyin": "Méi shì, wǒmen míngtiān yào qù pá shān.",
            "vietnamese": "Không có gì, ngày mai chúng mình muốn đi leo núi."
          },
          {
            "speaker": "A",
            "chinese": "爬山的时候要小心点儿。",
            "pinyin": "Pá shān de shíhou yào xiǎoxīn diǎnr.",
            "vietnamese": "Lúc leo núi phải cẩn thận một chút."
          }
        ]
      },
      {
        "title": "2. 在商场 (Ở trung tâm thương mại)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "这条裤子怎么样？",
            "pinyin": "Zhè tiáo kùzi zěnmeyàng?",
            "vietnamese": "Chiếc quần này thế nào?"
          },
          {
            "speaker": "B",
            "chinese": "颜色还可以，就是有点儿长。",
            "pinyin": "Yánsè hái kěyǐ, jiùshì yǒu diǎnr cháng.",
            "vietnamese": "Màu sắc cũng được, chỉ là hơi dài một chút."
          },
          {
            "speaker": "A",
            "chinese": "你还记得你买的那件白衬衫吗？",
            "pinyin": "Nǐ hái jìde nǐ mǎi de nà jiàn bái chènshān ma?",
            "vietnamese": "Bạn còn nhớ chiếc áo sơ mi trắng bạn mua không?"
          },
          {
            "speaker": "B",
            "chinese": "记得，怎么了？",
            "pinyin": "Jìde, zěnme le?",
            "vietnamese": "Nhớ, sao thế?"
          },
          {
            "speaker": "A",
            "chinese": "穿那件衬衫，再配这条裤子，一定很好看。",
            "pinyin": "Chuān nà jiàn chènshān, zài pèi zhè tiáo kùzi, yídìng hěn hǎokàn.",
            "vietnamese": "Mặc chiếc sơ mi đó, kết hợp with chiếc quần này, chắc chắn rất đẹp."
          }
        ]
      },
      {
        "title": "3. 在水果店 (Ở tiệm trái cây)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "这些水果真新鲜。",
            "pinyin": "Zhèxiē shuǐguǒ zhēn xīnxiān.",
            "vietnamese": "Những loại trái cây này tươi thật."
          },
          {
            "speaker": "B",
            "chinese": "我们买西瓜还是苹果？",
            "pinyin": "Wǒmen mǎi xīguā háishì píngguǒ?",
            "vietnamese": "Chúng ta mua dưa hấu hay táo?"
          },
          {
            "speaker": "A",
            "chinese": "西瓜吧，你看，这儿的西瓜多好啊！",
            "pinyin": "Xīguā ba, nǐ kàn, zhèr de xīguā duō hǎo a!",
            "vietnamese": "Dưa hấu đi, bạn xem, dưa hấu ở đây ngon quá này!"
          },
          {
            "speaker": "B",
            "chinese": "好，买个大点儿的。",
            "pinyin": "Hǎo, mǎi gè dà diǎnr de.",
            "vietnamese": "Được, mua quả to một chút."
          }
        ]
      },
      {
        "title": "4. 在休息室 (Ở phòng nghỉ)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "桌子上放着很多饮料，你喝什么？",
            "pinyin": "Zhuōzi shang fàng zhe hěnduō yǐnliào, nǐ hē shénme?",
            "vietnamese": "Trên bàn đặt rất nhiều đồ uống, bạn uống gì?"
          },
          {
            "speaker": "B",
            "chinese": "茶或者咖啡都可以。",
            "pinyin": "Chá huòzhě kāfēi dōu kěyǐ.",
            "vietnamese": "Trà hoặc cà phê đều được."
          },
          {
            "speaker": "A",
            "chinese": "你喝茶吧，茶对身体好。",
            "pinyin": "Nǐ hē chá ba, chá duì shēntǐ hǎo.",
            "vietnamese": "Bạn uống trà đi, trà tốt cho sức khỏe."
          },
          {
            "speaker": "B",
            "chinese": "好，那就喝茶。",
            "pinyin": "Hǎo, nà jiù hē chá.",
            "vietnamese": "Được, vậy thì uống trà."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk3_04",
    "dialogues": [
      {
        "title": "1. 聊照片 (Nói chuyện về bức ảnh)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "这是你们比赛的照片吗？",
            "pinyin": "Zhè shì nǐmen bǐsài de zhàopiàn ma?",
            "vietnamese": "Đây là bức ảnh thi đấu của các bạn phải không?"
          },
          {
            "speaker": "B",
            "chinese": "是，这是 chúng ta thi đấu xong chụp (这是我们比赛后照的)。",
            "pinyin": "Shì, zhè shì wǒmen bǐsài hòu zhào de.",
            "vietnamese": "Đúng, đây là ảnh chúng mình chụp sau trận đấu."
          },
          {
            "speaker": "A",
            "chinese": "照得真不错，你们 đều cùng một khối lớp à？(你们都是一个年级的吗？)",
            "pinyin": "Zhào de zhēn búcuò, nǐmen dōu shì yí gè niánjí de ma?",
            "vietnamese": "Chụp đẹp thật đấy, các bạn đều cùng một khối à?"
          },
          {
            "speaker": "B",
            "chinese": "不是。那个又高又漂亮的女孩儿是二年级的。",
            "pinyin": "Bú shì. Nàge yòu gāo yòu piàoliang de nǚháir shì èr niánjí de.",
            "vietnamese": "Không phải. Cô gái vừa cao vừa đẹp kia là học sinh năm hai."
          }
        ]
      },
      {
        "title": "2. 在家里 (Ở nhà)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "你觉得小红怎么样？",
            "pinyin": "Nǐ juéde Xiǎo Hóng zěnmeyàng?",
            "vietnamese": "Bạn thấy Tiểu Hồng thế nào?"
          },
          {
            "speaker": "B",
            "chinese": "她又聪明又热情，也很努力。",
            "pinyin": "Tā yòu cōngming yòu rèqíng, yě hěn nǔlì.",
            "vietnamese": "Cô ấy vừa thông minh vừa nhiệt tình, cũng rất chăm chỉ."
          },
          {
            "speaker": "A",
            "chinese": "我看她总是笑着回答老师的问题。",
            "pinyin": "Wǒ kàn tā zǒngshì xiào zhe huídá lǎoshī de wèntí.",
            "vietnamese": "Mình thấy cô ấy luôn cười khi trả lời câu hỏi của giáo viên."
          },
          {
            "speaker": "B",
            "chinese": "她对每个人都笑，也常常对我笑。",
            "pinyin": "Tā duì měi gè rén dōu xiào, yě chángcháng duì wǒ xiào.",
            "vietnamese": "Cô ấy cười với mọi người, cũng thường cười với mình."
          }
        ]
      },
      {
        "title": "3. 在超市外面 (Bên ngoài siêu thị)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "我有点儿饿了，我们进超市买点儿东西吧。",
            "pinyin": "Wǒ yǒu diǎnr è le, wǒmen jìn chāoshì mǎi diǎnr dōngxi ba.",
            "vietnamese": "Mình hơi đói rồi, chúng ta vào siêu thị mua chút đồ đi."
          },
          {
            "speaker": "B",
            "chinese": "好啊，这家超市的蛋糕又便宜又好吃。",
            "pinyin": "Hǎo a, zhè jiā chāoshì de dàngāo yòu piányi yòu hǎochī.",
            "vietnamese": "Được thôi, bánh ngọt của siêu thị này vừa rẻ vừa ngon."
          },
          {
            "speaker": "A",
            "chinese": "一块蛋糕，两瓶牛奶，我们还买什么？",
            "pinyin": "Yí kuài dàngāo, liǎng píng niúnǎi, wǒmen hái mǎi shénme?",
            "vietnamese": "Một miếng bánh ngọt, hai chai sữa, chúng ta còn mua gì nữa không?"
          },
          {
            "speaker": "B",
            "chinese": "已经买了不少了，走吧。",
            "pinyin": "Yǐjīng mǎi le bù shǎo le, zǒu ba.",
            "vietnamese": "Đã mua không ít rồi, đi thôi."
          }
        ]
      },
      {
        "title": "4. 在饭馆 (Ở nhà hàng)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "你看，那个女孩儿是谁？",
            "pinyin": "Nǐ kàn, nàge nǚháir shì shéi?",
            "vietnamese": "Bạn nhìn xem, cô gái kia là ai?"
          },
          {
            "speaker": "B",
            "chinese": "哪个女孩儿？",
            "pinyin": "Nǎge nǚháir?",
            "vietnamese": "Cô gái nào?"
          },
          {
            "speaker": "A",
            "chinese": "就是那个笑着跟客人说话的女孩儿。",
            "pinyin": "Jiùshì nàge xiào zhe gēn kèrén shuōhuà de nǚháir.",
            "vietnamese": "Chính là cô gái đang cười nói chuyện with khách ấy."
          },
          {
            "speaker": "B",
            "chinese": "哦，她是我们饭馆新来的服务员，总是这么热情。",
            "pinyin": "Ò, tā shì wǒmen fànguǎn xīn lái de fúwùyuán, zǒngshì zhème rèqíng.",
            "vietnamese": "Ồ, cô ấy là phục vụ mới đến của nhà hàng chúng mình, luôn nhiệt tình như thế."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk3_05",
    "dialogues": [
      {
        "title": "1. 在家里 (Ở nhà)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "我昨天发烧，今天好多了。",
            "pinyin": "Wǒ zuótiān fāshāo, jīntiān hǎo duō le.",
            "vietnamese": "Hôm qua mình bị sốt, hôm nay đỡ hơn nhiều rồi."
          },
          {
            "speaker": "B",
            "chinese": "这几天天气不好，你要多穿点儿衣服。",
            "pinyin": "Zhè jǐ tiān tiānqì bù hǎo, nǐ yào duō chuān diǎnr yīfu.",
            "vietnamese": "Mấy ngày nay thời tiết không tốt, bạn phải mặc nhiều quần áo một chút."
          },
          {
            "speaker": "A",
            "chinese": "知道了。谢谢你为我做饭。",
            "pinyin": "Zhīdào le. Xièxie nǐ wèi wǒ zuò fàn.",
            "vietnamese": "Biết rồi. Cảm ơn bạn vì đã nấu cơm cho mình."
          },
          {
            "speaker": "B",
            "chinese": "不用谢，这段时间我会好好照顾你的。",
            "pinyin": "Búyòng xiè, zhè duàn shíjiān wǒ huì hǎohāo zhàogu nǐ de.",
            "vietnamese": "Không có gì, khoảng thời gian này mình sẽ chăm sóc bạn thật tốt."
          }
        ]
      },
      {
        "title": "2. 聊感冒 (Nói chuyện về việc bị cảm)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "你感冒好点儿了吗？",
            "pinyin": "Nǐ gǎnmào hǎo diǎnr le ma?",
            "vietnamese": "Bệnh cảm của bạn đỡ chút nào chưa?"
          },
          {
            "speaker": "B",
            "chinese": "好多了， battle/但是还咳嗽 (但是还咳嗽)。",
            "pinyin": "Hǎo duō le, dànshì hái késou.",
            "vietnamese": "Đỡ nhiều rồi, nhưng vẫn còn ho."
          },
          {
            "speaker": "A",
            "chinese": "你昨天不是去医院了吗？医生怎么说？",
            "pinyin": "Nǐ zuótiān bú shì qù yīyuàn le ma? Yīshēng zěnme shuō?",
            "vietnamese": "Hôm qua không phải bạn đã đi bệnh viện sao? Bác sĩ nói gì?"
          },
          {
            "speaker": "B",
            "chinese": "医生让我多喝水，多休息。",
            "pinyin": "Yīshēng ràng wǒ duō hē shuǐ, duō xiūxi.",
            "vietnamese": "Bác sĩ bảo mình uống nhiều nước, nghỉ ngơi nhiều."
          }
        ]
      },
      {
        "title": "3. 聊季节 (Nói chuyện về các mùa)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "一年有四个季节，你最喜欢哪个季节？",
            "pinyin": "Yì nián yǒu sì gè jìjié, nǐ zuì xǐhuan nǎge jìjié?",
            "vietnamese": "Một năm có bốn mùa, bạn thích mùa nào nhất?"
          },
          {
            "speaker": "B",
            "chinese": "当然是春天。春天天气不那么冷了，草和树都绿了，花也开了。",
            "pinyin": "Dāngrán shì chūntiān. Chūntiān tiānqì bú nàme lěng le, cǎo hé shù dōu lǜ le, huā yě kāi le.",
            "vietnamese": "Đương nhiên là mùa xuân. Thời tiết mùa xuân không còn lạnh như thế nữa, cỏ và cây đều xanh rồi, hoa cũng nở rồi."
          },
          {
            "speaker": "A",
            "chinese": "我最喜欢夏天，因为我可以穿漂亮的裙子了。",
            "pinyin": "Wǒ zuì xǐhuan xiàtiān, yīnwèi wǒ kěyǐ chuān piàoliang de qúnzi le.",
            "vietnamese": "Mình thích nhất là mùa hè, bởi vì mình có thể mặc những chiếc váy đẹp."
          }
        ]
      },
      {
        "title": "4. 聊胖瘦 (Nói chuyện về mập gầy)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "我最近越来越胖了。",
            "pinyin": "Wǒ zuìjìn yuè lái yuè pàng le.",
            "vietnamese": "Gần đây mình ngày càng béo lên rồi."
          },
          {
            "speaker": "B",
            "chinese": "谁说的？我觉得你越来越漂亮了。",
            "pinyin": "Shéi shuō de? Wǒ juéde nǐ yuè lái yuè piàoliang le.",
            "vietnamese": "Ai nói vậy? Mình thấy bạn ngày càng đẹp ra thì có."
          },
          {
            "speaker": "A",
            "chinese": "你看，这条裙子是qunian mua (去年买的)，今年就不能穿了。",
            "pinyin": "Nǐ kàn, zhè tiáo qúnzi shì qùnián mǎi de, jīnnián jiù bù néng chuān le.",
            "vietnamese": "Bạn xem, chiếc váy này là mua năm ngoái, năm nay đã không thể mặc được nữa rồi."
          },
          {
            "speaker": "B",
            "chinese": "那是因为你吃得太多了，少吃点儿吧。",
            "pinyin": "Nà shì yīnwèi nǐ chī de tài duō le, shǎo chī diǎnr ba.",
            "vietnamese": "Đó là bởi vì bạn ăn quá nhiều rồi, ăn ít lại đi."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk3_06",
    "dialogues": [
      {
        "title": "1. 在客厅 (Ở phòng khách - Tìm kính)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "我的眼镜呢？怎么突然找不到了？你看见了吗？",
            "pinyin": "Wǒ de yǎnjìng ne? Zěnme tūrán zhǎo bú dào le? Nǐ kànjiàn le ma?",
            "vietnamese": "Kính của tôi đâu rồi? Sao tự nhiên lại không tìm thấy nữa? Bạn có nhìn thấy không?"
          },
          {
            "speaker": "B",
            "chinese": "我没看见啊。",
            "pinyin": "Wǒ méi kànjiàn a.",
            "vietnamese": "Tôi không thấy."
          },
          {
            "speaker": "A",
            "chinese": "我离不开眼镜，没有眼镜，我一个字也看不清楚。",
            "pinyin": "Wǒ lí bù kāi yǎnjìng, méiyǒu yǎnjìng, wǒ yí gè zì yě kàn bù qīngchu.",
            "vietnamese": "Tôi không thể rời chiếc kính được, không có kính, một chữ tôi cũng không nhìn rõ."
          },
          {
            "speaker": "B",
            "chinese": "你去房间找找，是不是刚才放在桌子上了？",
            "pinyin": "Nǐ qù fángjiān zhǎo zhǎo, shì bú shì gāngcái fàng zài zhuōzi shang le?",
            "vietnamese": "Bạn vào phòng tìm xem, có phải vừa nãy để trên bàn rồi không?"
          },
          {
            "speaker": "A",
            "chinese": "我怎么看得到啊？你快过来帮忙啊。",
            "pinyin": "Wǒ zěnme kàn de dào a? Nǐ kuài guòlái bāngmáng a.",
            "vietnamese": "Tôi làm sao mà nhìn thấy được chứ? Bạn mau qua đây giúp một tay đi."
          },
          {
            "speaker": "B",
            "chinese": "好吧，我帮你找找。",
            "pinyin": "Hǎo ba, wǒ bāng nǐ zhǎo zhǎo.",
            "vietnamese": "Được rồi, tôi tìm giúp bạn."
          }
        ]
      },
      {
        "title": "2. 在打电话 (Đang gọi điện thoại)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "今天的作业你做完了吗？",
            "pinyin": "Jīntiān de zuòyè nǐ zuò wán le ma?",
            "vietnamese": "Bài tập hôm nay bạn làm xong chưa?"
          },
          {
            "speaker": "B",
            "chinese": "刚做完，你呢？",
            "pinyin": "Gāng zuò wán, nǐ ne?",
            "vietnamese": "Vừa làm xong, còn bạn?"
          },
          {
            "speaker": "A",
            "chinese": "今天这些题特别难，我看不懂，不会做，你能帮我吗？",
            "pinyin": "Jīntiān zhèxiē tí tèbié nán, wǒ kàn bù dǒng, bú huì zuò, nǐ néng bāng wǒ ma?",
            "vietnamese": "Mấy câu hỏi hôm nay đặc biệt khó, tôi đọc không hiểu, không biết làm, bạn có thể giúp tôi không?"
          },
          {
            "speaker": "B",
            "chinese": "电话里讲不明白，你来我家吧，我给你讲讲。",
            "pinyin": "Diànhuà lǐ jiǎng bù míngbai, nǐ lái wǒ jiā ba, wǒ gěi nǐ jiǎng jiǎng.",
            "vietnamese": "Qua điện thoại nói không rõ được, bạn đến nhà tôi đi, tôi giảng cho bạn."
          },
          {
            "speaker": "A",
            "chinese": "好啊，我锻炼完了就过去。",
            "pinyin": "Hǎo a, wǒ duànliàn wán le jiù guòqù.",
            "vietnamese": "Được thôi, tôi tập thể dục xong sẽ qua ngay."
          }
        ]
      },
      {
        "title": "3. 在休息室 (Ở phòng nghỉ)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "你怎么有点儿不高兴？",
            "pinyin": "Nǐ zěnme yǒu diǎnr bù gāoxìng?",
            "vietnamese": "Sao bạn có vẻ không vui vậy?"
          },
          {
            "speaker": "B",
            "chinese": "我想请小丽吃饭，但是找不到好饭馆。",
            "pinyin": "Wǒ xiǎng qǐng Xiǎo Lì chī fàn, dànshì zhǎo bú dào hǎo fànguǎn.",
            "vietnamese": "Tôi muốn mời Tiểu Lệ ăn cơm, nhưng không tìm được nhà hàng nào ngon."
          },
          {
            "speaker": "A",
            "chinese": "那nǐ qǐng tā tīng yīnyuèhuì ba, tā xǐhuan tīng yīnyuè.",
            "pinyin": "Nà nǐ qǐng tā tīng yīnyuèhuì ba, tā xǐhuan tīng yīnyuè.",
            "vietnamese": "Vậy bạn mời cô ấy đi nghe hòa nhạc đi, cô ấy thích nghe nhạc mà."
          },
          {
            "speaker": "B",
            "chinese": "音乐会票太贵了，买不到。",
            "pinyin": "Yīnyuèhuì piào tài guì le, mǎi bú dào.",
            "vietnamese": "Vé hòa nhạc đắt quá, mua không được."
          },
          {
            "speaker": "A",
            "chinese": "那你跟她去公园走走，聊聊天儿吧。",
            "pinyin": "Nà nǐ gēn tā qù gōngyuán zǒu zǒu, liáo liáo tiānr ba.",
            "vietnamese": "Vậy bạn cùng cô ấy ra công viên đi dạo, nói chuyện phiếm đi."
          },
          {
            "speaker": "B",
            "chinese": "只能这样了。",
            "pinyin": "Zhǐ néng zhèyàng le.",
            "vietnamese": "Chỉ đành vậy thôi."
          }
        ]
      },
      {
        "title": "4. 在客厅 (Ở phòng khách)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "你怎么还喝咖啡？",
            "pinyin": "Nǐ zěnme hái hē kāfēi?",
            "vietnamese": "Sao bạn vẫn còn uống cà phê?"
          },
          {
            "speaker": "B",
            "chinese": "怎么了？",
            "pinyin": "Zěnme le?",
            "vietnamese": "Sao thế?"
          },
          {
            "speaker": "A",
            "chinese": "你不是说晚上喝咖啡睡不着觉吗？",
            "pinyin": "Nǐ bú shì shuō wǎnshang hē kāfēi shuì bù zháo jiào ma?",
            "vietnamese": "Không phải bạn nói buổi tối uống cà phê sẽ không ngủ được sao?"
          },
          {
            "speaker": "B",
            "chinese": "没事。我只喝一杯。",
            "pinyin": "Méi shì. Wǒ zhǐ hē yì bēi.",
            "vietnamese": "Không sao. Tôi chỉ uống một cốc thôi."
          },
          {
            "speaker": "A",
            "chinese": "你还是喝杯牛奶吧，喝牛奶睡得更好。",
            "pinyin": "Nǐ háishì hē bēi niúnǎi ba, hē niúnǎi shuì de gèng hǎo.",
            "vietnamese": "Bạn vẫn là nên uống cốc sữa đi, uống sữa ngủ ngon hơn."
          },
          {
            "speaker": "B",
            "chinese": "好吧，牛奶呢？",
            "pinyin": "Hǎo ba, niúnǎi ne?",
            "vietnamese": "Được thôi, sữa đâu?"
          },
          {
            "speaker": "A",
            "chinese": "还没买呢。",
            "pinyin": "Hái méi mǎi ne.",
            "vietnamese": "Vẫn chưa mua."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk3_07",
    "dialogues": [
      {
        "title": "1. 在办公室 (Ở văn phòng)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "那个漂亮的新同事是谁？",
            "pinyin": "Nàge piàoliang de xīn tóngshì shì shéi?",
            "vietnamese": "Người đồng nghiệp mới xinh đẹp kia là ai vậy?"
          },
          {
            "speaker": "B",
            "chinese": "那是小丽。",
            "pinyin": "Nà shì Xiǎo Lì.",
            "vietnamese": "Đó là Tiểu Lệ."
          },
          {
            "speaker": "A",
            "chinese": "她刚来北京吗？",
            "pinyin": "Tā gāng lái Běijīng ma?",
            "vietnamese": "Cô ấy mới đến Bắc Kinh à?"
          },
          {
            "speaker": "B",
            "chinese": "不，她在北京工作三年了。",
            "pinyin": "Bù, tā zài Běijīng gōngzuò sān nián le.",
            "vietnamese": "Không, cô ấy làm việc ở Bắc Kinh 3 năm rồi."
          },
          {
            "speaker": "A",
            "chinese": "以前她在哪儿工作？",
            "pinyin": "Yǐqián tā zài nǎr gōngzuò?",
            "vietnamese": "Trước đây cô ấy làm việc ở đâu?"
          },
          {
            "speaker": "B",
            "chinese": "她在银行工作了两年以后来的 chúng ta công ty (来的我们公司)。",
            "pinyin": "Tā zài yínháng gōngzuò le liǎng nián yǐhòu lái de wǒmen gōngsī.",
            "vietnamese": "Cô ấy làm ở ngân hàng 2 năm rồi mới tới công ty chúng ta."
          }
        ]
      },
      {
        "title": "2. 在休息室 (Ở phòng nghỉ)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "周末你跟小丽去哪儿玩儿了？",
            "pinyin": "Zhōumò nǐ gēn Xiǎo Lì qù nǎr wánr le?",
            "vietnamese": "Cuối tuần bạn và Tiểu Lệ đi đâu chơi vậy?"
          },
          {
            "speaker": "B",
            "chinese": "我们去唱歌了。",
            "pinyin": "Wǒmen qù chàng gē le.",
            "vietnamese": "Chúng tôi đi hát."
          },
          {
            "speaker": "A",
            "chinese": "你们唱了多久？",
            "pinyin": "Nǐmen chàng le duō jiǔ?",
            "vietnamese": "Các bạn đã hát bao lâu?"
          },
          {
            "speaker": "B",
            "chinese": "Chúng tôi đã hát 2 tiếng đồng hồ (我们唱了两个小时歌)，晚上 hái qù tīng yīnyuèhuì le.",
            "pinyin": "Wǒmen chàng le liǎng gè xiǎoshí gē, wǎnshang hái qù tīng yīnyuèhuì le.",
            "vietnamese": "Chúng tôi hát 2 tiếng đồng hồ, buổi tối còn đi nghe hòa nhạc nữa."
          },
          {
            "speaker": "A",
            "chinese": "你们都对音乐感兴趣吗？",
            "pinyin": "Nǐmen dōu duì yīnyuè gǎn xìngqù ma?",
            "vietnamese": "Các bạn đều hứng thú với âm nhạc à?"
          },
          {
            "speaker": "B",
            "chinese": "她对音乐感兴趣，我对她感兴趣。",
            "pinyin": "Tā duì yīnyuè gǎn xìngqù, wǒ duì tā gǎn xìngqù.",
            "vietnamese": "Cô ấy hứng thú với âm nhạc, tôi hứng thú với cô ấy."
          }
        ]
      },
      {
        "title": "3. 在休息室 (Ở phòng nghỉ)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "我跟小丽下个月结婚，到时候欢迎你来。",
            "pinyin": "Wǒ gēn Xiǎo Lì xià gè yuè jiéhūn, dào shíhou huānyíng nǐ lái.",
            "vietnamese": "Tôi và Tiểu Lệ tháng sau kết hôn, đến lúc đó hoan nghênh bạn tới dự."
          },
          {
            "speaker": "B",
            "chinese": "结婚？你们不是刚认识吗？",
            "pinyin": "Jiéhūn? Nǐmen bú shì gāng rènshi ma?",
            "vietnamese": "Kết hôn? Không phải các bạn vừa mới quen nhau sao?"
          },
          {
            "speaker": "A",
            "chinese": "我跟她都认识五年了。",
            "pinyin": "Wǒ gēn tā dōu rènshi wǔ nián le.",
            "vietnamese": "Tôi và cô ấy đã quen nhau 5 năm rồi."
          },
          {
            "speaker": "B",
            "chinese": "真的吗？我怎么不知道。",
            "pinyin": "Zhēn de ma? Wǒ zěnme bù zhīdào.",
            "vietnamese": "Thật sao? Sao tôi không biết nhỉ."
          },
          {
            "speaker": "A",
            "chinese": "我们是大学同学。",
            "pinyin": "Wǒmen shì dàxué tóngxué.",
            "vietnamese": "Chúng tôi là bạn đại học."
          }
        ]
      },
      {
        "title": "4. 在公司门口 (Ở cửa công ty)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "你看看手表，怎么又迟到了？",
            "pinyin": "Nǐ kàn kàn shǒubiǎo, zěnme yòu chídào le?",
            "vietnamese": "Bạn nhìn đồng hồ xem, sao lại đến muộn nữa rồi?"
          },
          {
            "speaker": "B",
            "chinese": "没迟到啊。",
            "pinyin": "Méi chídào a.",
            "vietnamese": "Đâu có muộn."
          },
          {
            "speaker": "A",
            "chinese": "你不是说七点半来接我吗？你迟到了一刻钟。",
            "pinyin": "Nǐ bú shì shuō qī diǎn bàn lái jiē wǒ ma? Nǐ chídào le yí kè zhōng.",
            "vietnamese": "Không phải bạn nói 7 rưỡi đến đón tôi sao? Bạn đến muộn 15 phút rồi."
          },
          {
            "speaker": "B",
            "chinese": "现在不是差一刻八点吗？我早到了。",
            "pinyin": "Xiànzài bú shì chà yí kè bā diǎn ma? Wǒ zǎo dào le.",
            "vietnamese": "Bây giờ chẳng phải là 8 giờ kém 15 sao? Tôi đến sớm mà."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk3_08",
    "dialogues": [
      {
        "title": "1. 在休息室 (Ở phòng nghỉ)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "听说你又买房了？",
            "pinyin": "Tīngshuō nǐ yòu mǎi fáng le?",
            "vietnamese": "Nghe nói bạn lại mua nhà rồi?"
          },
          {
            "speaker": "B",
            "chinese": "是，新房在市中心。",
            "pinyin": "Shì, xīn fáng zài shì zhōngxīn.",
            "vietnamese": "Đúng vậy, nhà mới ở trung tâm thành phố."
          },
          {
            "speaker": "A",
            "chinese": "新房怎么样？你满意吗？",
            "pinyin": "Xīn fáng zěnmeyàng? Nǐ mǎnyì ma?",
            "vietnamese": "Nhà mới thế nào? Bạn có hài lòng không?"
          },
          {
            "speaker": "B",
            "chinese": "很满意，就是楼层太高。",
            "pinyin": "Hěn mǎnyì, jiùshì lóucéng tài gāo.",
            "vietnamese": "Rất hài lòng, chỉ là số tầng hơi cao."
          },
          {
            "speaker": "A",
            "chinese": "在第几层？有电梯吗？",
            "pinyin": "Zài dì jǐ céng? Yǒu diàntī ma?",
            "vietnamese": "Ở tầng mấy? Có thang máy không?"
          },
          {
            "speaker": "B",
            "chinese": "二十层，有电梯。",
            "pinyin": "Èrshí céng, yǒu diàntī.",
            "vietnamese": "Tầng 20, có thang máy."
          }
        ]
      },
      {
        "title": "2. 在家里 (Ở nhà)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "周末我们去哪儿玩儿？",
            "pinyin": "Zhōumò wǒmen qù nǎr wánr?",
            "vietnamese": "Cuối tuần chúng ta đi đâu chơi?"
          },
          {
            "speaker": "B",
            "chinese": "去动物园看熊猫吧。",
            "pinyin": "Qù dòngwùyuán kàn xióngmāo ba.",
            "vietnamese": "Đến thảo cầm viên xem gấu trúc đi."
          },
          {
            "speaker": "A",
            "chinese": "我有点儿害怕，动物园人太多了。",
            "pinyin": "Wǒ yǒu diǎnr hàipà, dòngwùyuán rén tài duō le.",
            "vietnamese": "Mình hơi sợ, ở thảo cầm viên đông người quá."
          },
          {
            "speaker": "B",
            "chinese": "那你想去哪儿？",
            "pinyin": "Nà nǐ xiǎng qù nǎr?",
            "vietnamese": "Thế bạn muốn đi đâu?"
          },
          {
            "speaker": "A",
            "chinese": "你去哪儿我就去哪儿。",
            "pinyin": "Nǐ qù nǎr wǒ jiù qù nǎr.",
            "vietnamese": "Bạn đi đâu thì mình đi đó."
          }
        ]
      },
      {
        "title": "3. 在咖啡店 (Ở quán cà phê)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "我们在这儿喝点儿什么吧。",
            "pinyin": "Wǒmen zài zhèr hē diǎnr shénme ba.",
            "vietnamese": "Chúng ta uống chút gì ở đây nhé."
          },
          {
            "speaker": "B",
            "chinese": "这儿真安静。",
            "pinyin": "Zhèr zhēn ānjìng.",
            "vietnamese": "Ở đây yên tĩnh thật."
          },
          {
            "speaker": "A",
            "chinese": "你喝什么？",
            "pinyin": "Nǐ hē shénme?",
            "vietnamese": "Bạn uống gì?"
          },
          {
            "speaker": "B",
            "chinese": "我喝可乐。",
            "pinyin": "Wǒ hē kělè.",
            "vietnamese": "Tôi uống cola."
          },
          {
            "speaker": "A",
            "chinese": "等一会儿，可乐马上就来。",
            "pinyin": "Děng yíhuìr, kělè mǎshàng jiù lái.",
            "vietnamese": "Đợi một lát, cola có ngay đây."
          }
        ]
      },
      {
        "title": "4. 在家里 (Ở nhà - Xem ảnh)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "这是你以前的老照片吗？",
            "pinyin": "Zhè shì nǐ yǐqián de lǎo zhàopiàn ma?",
            "vietnamese": "Đây là bức ảnh cũ của bạn trước kia à?"
          },
          {
            "speaker": "B",
            "chinese": "是，这是上大学的时候照的。",
            "pinyin": "Shì, zhè shì shàng dàxué de shíhou zhào de.",
            "vietnamese": "Phải, đây là chụp hồi học đại học."
          },
          {
            "speaker": "A",
            "chinese": "你现在几乎没变化。",
            "pinyin": "Nǐ xiànzài jīhū méi biànhuà.",
            "vietnamese": "Bạn bây giờ hầu như không thay đổi gì cả."
          },
          {
            "speaker": "B",
            "chinese": "怎么没变化？我现在越来越胖了。",
            "pinyin": "Zěnme méi biànhuà? Wǒ xiànzài yuè lái yuè pàng le.",
            "vietnamese": "Không thay đổi gì chứ? Tôi bây giờ ngày càng béo lên rồi."
          },
          {
            "speaker": "A",
            "chinese": "胖一点儿没关系，健康最重要。",
            "pinyin": "Pàng yìdiǎnr méi guānxi, jiànkāng zuì zhòngyào.",
            "vietnamese": "Béo một chút không sao, sức khỏe là quan trọng nhất."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk3_09",
    "dialogues": [
      {
        "title": "1. 在教室 (Ở lớp học)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "马可，你的中文越说越好了！",
            "pinyin": "Mǎkě, nǐ de Zhōngwén yuè shuō yuè hǎo le!",
            "vietnamese": "Marco, tiếng Trung của bạn càng ngày nói càng giỏi rồi!"
          },
          {
            "speaker": "B",
            "chinese": "哪里，我们班的安娜说得更好。",
            "pinyin": "Nǎlǐ, wǒmen bān de Ānnà shuō de gèng hǎo.",
            "vietnamese": "Đâu có, Anna lớp chúng mình nói còn giỏi hơn."
          },
          {
            "speaker": "A",
            "chinese": "是吗？",
            "pinyin": "Shì ma?",
            "vietnamese": "Vậy sao?"
          },
          {
            "speaker": "B",
            "chinese": "她的汉语说得跟中国人一样好。",
            "pinyin": "Tā de Hànyǔ shuō de gēn Zhōngguó rén yíyàng hǎo.",
            "vietnamese": "Tiếng Hán của cô ấy nói giỏi như người Trung Quốc vậy."
          }
        ]
      },
      {
        "title": "2. 在办公室 (Ở văn phòng)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "别担心，这次考试你一定能考好。",
            "pinyin": "Bié dānxīn, zhè cì kǎoshì nǐ yídìng néng kǎo hǎo.",
            "vietnamese": "Đừng lo lắng, kỳ thi lần này bạn nhất định có thể thi tốt."
          },
          {
            "speaker": "B",
            "chinese": "我还是有点儿担心。",
            "pinyin": "Wǒ háishì yǒu diǎnr dānxīn.",
            "vietnamese": "Tôi vẫn có chút lo lắng."
          },
          {
            "speaker": "A",
            "chinese": "放心吧，你复习得比较好。",
            "pinyin": "Fàngxīn ba, nǐ fùxí de bǐjiào hǎo.",
            "vietnamese": "Yên tâm đi, bạn ôn tập khá tốt mà."
          },
          {
            "speaker": "B",
            "chinese": "可是我昨天的数学没考好。",
            "pinyin": "Kěshì wǒ zuótiān de shùxué méi kǎo hǎo.",
            "vietnamese": "Nhưng hôm qua bài thi toán của tôi không tốt."
          },
          {
            "speaker": "A",
            "chinese": "数学已经考完了，你先别想了。",
            "pinyin": "Shùxué yǐjīng kǎo wán le, nǐ xiān bié xiǎng le.",
            "vietnamese": "Môn toán đã thi xong rồi, bạn tạm thời đừng nghĩ đến nữa."
          }
        ]
      },
      {
        "title": "3. 在教室 (Ở lớp học)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "照片上的这几个人是谁？",
            "pinyin": "Zhàopiàn shang de zhè jǐ gè rén shì shéi?",
            "vietnamese": "Mấy người trên bức ảnh này là ai vậy?"
          },
          {
            "speaker": "B",
            "chinese": "都是我的好朋友。",
            "pinyin": "Dōu shì wǒ de hǎo péngyou.",
            "vietnamese": "Đều là bạn tốt của tôi."
          },
          {
            "speaker": "A",
            "chinese": "中间这个女孩儿是谁？",
            "pinyin": "Zhōngjiān zhège nǚháir shì shéi?",
            "vietnamese": "Cô gái ở giữa này là ai?"
          },
          {
            "speaker": "B",
            "chinese": "她是我最了解的朋友，叫小丽。(Tā : 她是我最了解的朋友，叫小丽。)",
            "pinyin": "Tā shì wǒ zuì liǎojiě de péngyou, jiào Xiǎo Lì.",
            "vietnamese": "Cô ấy là người bạn mà tôi hiểu rõ nhất, tên là Tiểu Lệ."
          },
          {
            "speaker": "A",
            "chinese": "她长得真漂亮。",
            "pinyin": "Tā zhǎng de zhēn piàoliang.",
            "vietnamese": "Cô ấy trông xinh thật đấy."
          }
        ]
      },
      {
        "title": "4. 在办公室 (Ở văn phòng)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "这个周末有汉语比赛，你参加吗？",
            "pinyin": "Zhège zhōumò yǒu Hànyǔ bǐsài, nǐ cānjiā ma?",
            "vietnamese": "Cuối tuần này có cuộc thi tiếng Hán, bạn có tham gia không?"
          },
          {
            "speaker": "B",
            "chinese": "我想参加，但是没有时间。",
            "pinyin": "Wǒ xiǎng cānjiā, dànshì méiyǒu shíjiān.",
            "vietnamese": "Tôi muốn tham gia, nhưng không có thời gian."
          },
          {
            "speaker": "A",
            "chinese": "怎么了？有事吗？",
            "pinyin": "Zěnme le? Yǒu shì ma?",
            "vietnamese": "Sao vậy? Có việc à?"
          },
          {
            "speaker": "B",
            "chinese": "我要去北京看我妹妹，可能会影响比赛。",
            "pinyin": "Wǒ yào qù Běijīng kàn wǒ mèimei, kěnéng huì yǐngxiǎng bǐsài.",
            "vietnamese": "Tôi phải đi Bắc Kinh thăm em gái, có thể sẽ ảnh hưởng đến cuộc thi."
          },
          {
            "speaker": "A",
            "chinese": "那太遗憾了。",
            "pinyin": "Nà tài yíhàn le.",
            "vietnamese": "Vậy thì thật đáng tiếc."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk3_10",
    "dialogues": [
      {
        "title": "1. 在教室 (Ở lớp học)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "历史课真有意思。",
            "pinyin": "Lìshǐ kè zhēn yǒu yìsi.",
            "vietnamese": "Tiết Lịch sử thật thú vị."
          },
          {
            "speaker": "B",
            "chinese": "我觉得体育课更有意思。",
            "pinyin": "Wǒ juéde tǐyù kè gèng yǒu yìsi.",
            "vietnamese": "Mình thấy tiết Thể dục còn thú vị hơn."
          },
          {
            "speaker": "A",
            "chinese": "那数学呢？",
            "pinyin": "Nà shùxué ne?",
            "vietnamese": "Thế còn môn Toán thì sao?"
          },
          {
            "speaker": "B",
            "chinese": "数学比历史难多了，我听不懂。(Shùxué bǐ lìshǐ nán duō le, wǒ tīng bù dông. -> 数学比历史难多了，我听不懂。)",
            "pinyin": "Shùxué bǐ lìshǐ nán duō le, wǒ tīng bù dǒng.",
            "vietnamese": "Toán học khó hơn Lịch sử nhiều, mình nghe không hiểu."
          }
        ]
      },
      {
        "title": "2. 在宿舍 (Ở ký túc xá)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "你这辆自行车太旧了，该换一辆了。",
            "pinyin": "Nǐ zhè liàng zìxíngchē tài jiù le, gāi huàn yí liàng le.",
            "vietnamese": "Chiếc xe đạp này của cậu cũ quá rồi, nên đổi một chiếc đi."
          },
          {
            "speaker": "B",
            "chinese": "还能骑，不用换。",
            "pinyin": "Hái néng qí, búyòng huàn.",
            "vietnamese": "Vẫn còn đạp được, không cần đổi."
          },
          {
            "speaker": "A",
            "chinese": "骑旧车不安全。",
            "pinyin": "Qí jiù chē bù ānquán.",
            "vietnamese": "Đi xe cũ không an toàn đâu."
          },
          {
            "speaker": "B",
            "chinese": "我觉得挺方便的，去什么地方都可以。",
            "pinyin": "Wǒ juéde tǐng fāngbiàn de, qù shénme dìfang dōu kěyǐ.",
            "vietnamese": "Mình thấy khá tiện lợi mà, đi đến chỗ nào cũng được."
          }
        ]
      },
      {
        "title": "3. 在中介公司 (Ở công ty môi giới)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "我想在附近找个房子。",
            "pinyin": "Wǒ xiǎng zài fùjìn zhǎo gè fángzi.",
            "vietnamese": "Tôi muốn tìm một căn nhà ở khu vực gần đây."
          },
          {
            "speaker": "B",
            "chinese": "你对房子有什么要求吗？",
            "pinyin": "Nǐ duì fángzi yǒu shénme yāoqiú ma?",
            "vietnamese": "Anh đối với ngôi nhà có yêu cầu gì không?"
          },
          {
            "speaker": "A",
            "chinese": "主要看环境，环境要安静。",
            "pinyin": "Zhǔyào kàn huánjìng, huánjìng yào ānjìng.",
            "vietnamese": "Chủ yếu xem môi trường, môi trường phải yên tĩnh."
          },
          {
            "speaker": "B",
            "chinese": "这儿有几个房子，你看看。",
            "pinyin": "Zhèr yǒu jǐ gè fángzi, nǐ kàn kàn.",
            "vietnamese": "Ở đây có vài căn, anh xem thử đi."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk3_11",
    "dialogues": [
      {
        "title": "1. 在教室 (Ở phòng học)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "我去图书馆借本书。",
            "pinyin": "Wǒ qù túshūguǎn jiè běn shū.",
            "vietnamese": "Mình đi thư viện mượn quyển sách."
          },
          {
            "speaker": "B",
            "chinese": "帮我把这本词典还了吧。",
            "pinyin": "Bāng wǒ bǎ zhè běn cídiǎn huán le ba.",
            "vietnamese": "Giúp mình trả quyển từ điển này luôn nhé."
          },
          {
            "speaker": "A",
            "chinese": "好，等一会儿你离开教室的时候，别忘了把灯关了。",
            "pinyin": "Hǎo, děng yíhuìr nǐ líkāi jiàoshì de shíhou, bié wàngjì bǎ dēng guān le.",
            "vietnamese": "Được, lát nữa lúc bạn rời phòng học, đừng quên tắt đèn nhé."
          },
          {
            "speaker": "B",
            "chinese": "好的，放心吧。",
            "pinyin": "Hǎo de, fàngxīn ba.",
            "vietnamese": "Được, yên tâm đi."
          }
        ]
      },
      {
        "title": "2. 在会议室 (Ở phòng họp)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "会议结束后，别忘了把空调关了。",
            "pinyin": "Huìyì jiéshù hòu, bié wàngjì bǎ kōngtiáo guān le.",
            "vietnamese": "Sau khi họp xong, đừng quên tắt điều hòa."
          },
          {
            "speaker": "B",
            "chinese": "好的。王经理两点左右来了个电话。",
            "pinyin": "Hǎo de. Wáng jīnglǐ liǎng diǎn zuǒyòu lái le gè diànhuà.",
            "vietnamese": "Vâng. Giám đốc Vương gọi điện tới lúc khoảng 2 giờ."
          },
          {
            "speaker": "A",
            "chinese": "他已经到北京了？",
            "pinyin": "Tā yǐjīng dào Běijīng le?",
            "vietnamese": "Ông ấy đã đến Bắc Kinh rồi sao?"
          },
          {
            "speaker": "B",
            "chinese": "是dịch? 是的，他正坐地铁来我们公司呢。",
            "pinyin": "Shì de, tā zhèng zuò dìtiě lái wǒmen gōngsī ne.",
            "vietnamese": "Đúng vậy, ông ấy đang đi tàu điện ngầm đến công ty chúng ta."
          },
          {
            "speaker": "A",
            "chinese": "等他到了就告诉我。",
            "pinyin": "Děng tā dào le jiù gàosu wǒ.",
            "vietnamese": "Đợi ông ấy đến thì báo cho tôi."
          }
        ]
      },
      {
        "title": "3. 在客厅 (Ở phòng khách)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "还差一双筷子，你去拿一下。",
            "pinyin": "Hái chà yì shuāng kuàizi, nǐ qù ná yíxià.",
            "vietnamese": "Còn thiếu một đôi đũa, bạn đi lấy một chút đi."
          },
          {
            "speaker": "B",
            "chinese": "今天怎么做了这么多菜？",
            "pinyin": "Jīntiān zěnme zuò le zhème duō cài?",
            "vietnamese": "Hôm nay sao nấu nhiều món thế?"
          },
          {
            "speaker": "A",
            "chinese": "今天是你爸爸的生日。",
            "pinyin": "Jīntiān  shì nǐ bàba de shēngrì.",
            "vietnamese": "Hôm nay là sinh nhật của bố bạn."
          },
          {
            "speaker": "B",
            "chinese": "真的啊？我把爸爸的生日忘了。那我们今天喝点儿啤酒吧。",
            "pinyin": "Zhēn de a? Wǒ bǎ bàba de shēngrì wàng le. Nà wǒmen jīntiān hē diǎnr píjiǔ ba.",
            "vietnamese": "Thật á? Mình quên mất sinh nhật bố rồi. Vậy hôm nay chúng ta uống chút bia nhé."
          },
          {
            "speaker": "A",
            "chinese": "医生说你爸爸一口酒都不能喝，别让他看见酒瓶子。",
            "pinyin": "Yīshēng shuō nǐ bàba yì kǒu jiǔ dōu bù néng hē, bié ràng tā kànjiàn jiǔ píngzi.",
            "vietnamese": "Bác sĩ nói bố bạn một ngụm rượu cũng không được uống, đừng để ông ấy nhìn thấy vỏ chai bia."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk3_12",
    "dialogues": [
      {
        "title": "1. 在家里 (Ở nhà)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "今天太阳从西边出来了吗？",
            "pinyin": "Jīntiān tàiyáng cóng xībian chūlái le ma?",
            "vietnamese": "Hôm nay mặt trời mọc đằng Tây à?"
          },
          {
            "speaker": "B",
            "chinese": "怎么了？",
            "pinyin": "Zěnme le?",
            "vietnamese": "Sao thế?"
          },
          {
            "speaker": "A",
            "chinese": "你怎么这么早就起床了？",
            "pinyin": "Nǐ zěnme zhème zǎo jiù qǐchuáng le?",
            "vietnamese": "Sao bạn dậy sớm thế này?"
          },
          {
            "speaker": "B",
            "chinese": "我还要去看我们老师呢。",
            "pinyin": "Wǒ hái yào qù kàn wǒmen lǎoshī ne.",
            "vietnamese": "Mình còn phải đi thăm giáo viên của bọn mình nữa."
          }
        ]
      },
      {
        "title": "2. 在家里 (Ở nhà - Tìm hộ chiếu)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "护照你找到了吗？",
            "pinyin": "Hùzhào nǐ zhǎodào le ma?",
            "vietnamese": "Hộ chiếu bạn tìm thấy chưa?"
          },
          {
            "speaker": "B",
            "chinese": "没有啊，我记得放在包里了。",
            "pinyin": "Méiyǒu a, wǒ jìde fàng zài bāo lǐ le.",
            "vietnamese": "Chưa, mình nhớ là để trong túi xách rồi mà."
          },
          {
            "speaker": "A",
            "chinese": "你的包在桌子上，我帮你看一下。",
            "pinyin": "Nǐ de bāo zài zhuōzi shang, wǒ bāng nǐ kàn yíxià.",
            "vietnamese": "Túi của bạn trên bàn, để mình xem giúp bạn."
          },
          {
            "speaker": "B",
            "chinese": "找到了吗？",
            "pinyin": "Zhǎodào le ma?",
            "vietnamese": "Tìm thấy chưa?"
          },
          {
            "speaker": "A",
            "chinese": "没有，你再找找，别生气了。",
            "pinyin": "Méiyǒu, nǐ zài zhǎo zhǎo, bié shēngqì le.",
            "vietnamese": "Không có, bạn tìm lại xem, đừng tức giận nữa."
          }
        ]
      },
      {
        "title": "3. 在出租车上 (Trên xe taxi)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "师傅，我去机场。",
            "pinyin": "Shīfu, wǒ qù jīchǎng.",
            "vietnamese": "Bác tài, cháu đến sân bay."
          },
          {
            "speaker": "B",
            "chinese": "好的。",
            "pinyin": "Hǎo de.",
            "vietnamese": "Được."
          },
          {
            "speaker": "A",
            "chinese": "飞机还有半个小时就起飞了，你能开快点儿吗？",
            "pinyin": "Fēijī hái yǒu bàn gè xiǎoshí jiù qǐfēi le, nǐ néng kāi kuài diǎnr ma?",
            "vietnamese": "Máy bay còn nửa tiếng nữa là cất cánh rồi, chú có thể lái nhanh một chút không?"
          },
          {
            "speaker": "B",
            "chinese": "没问题，你坐好。",
            "pinyin": "Méi wèntí, nǐ zuò hǎo.",
            "vietnamese": "Không vấn đề, cháu ngồi cẩn thận nhé."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk3_13",
    "dialogues": [
      {
        "title": "1. 在家里 (Ở nhà)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "你终于回来了！从哪儿买回来这么多东西啊？",
            "pinyin": "Nǐ zhōngyú huílái le! Cóng nǎr mǎi huílái zhème duō dōngxi a?",
            "vietnamese": "Cuối tuần bạn cũng về rồi! Từ đâu mua về nhiều đồ thế này? -> Cuối cùng bạn cũng về rồi! Từ đâu mua về nhiều đồ thế này?"
          },
          {
            "speaker": "B",
            "chinese": "都是从那边的商店买回来的。",
            "pinyin": "Dōu  shì cóng nàbiān de shāngdiàn mǎi huílái de.",
            "vietnamese": "Đều là mua từ cửa hàng bên kia về đấy."
          },
          {
            "speaker": "A",
            "chinese": "怎么还买红酒回来了？谁喝啊？",
            "pinyin": "Zěnme hái mǎi hóngjiǔ huílái le? Shéi hē a?",
            "vietnamese": "Sao lại mua cả rượu vang về? Ai uống?"
          },
          {
            "speaker": "B",
            "chinese": "这是给爷爷的礼物。",
            "pinyin": "Zhè shì gěi yéye de lǐwù.",
            "vietnamese": "Đây là quà cho ông nội."
          }
        ]
      },
      {
        "title": "2. 聊奶奶 (Nói chuyện về bà nội)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "刚才我遇到你奶奶了， she... 散步 (她正一边散步一边看风景呢)。",
            "pinyin": "Gāngcái wǒ yùdào nǐ nǎinai le, tā zhèng yìbiān sànbù yìbiān kàn fēngjǐng ne.",
            "vietnamese": "Vừa nãy mình gặp bà nội bạn, bà đang vừa đi dạo vừa ngắm phong cảnh."
          },
          {
            "speaker": "B",
            "chinese": "奶奶每天都在公园散步。",
            "pinyin": "Nǎinai  měitiān dōu zài gōngyuán sànbù.",
            "vietnamese": "Ngày nào bà nội cũng đi dạo ở công viên."
          },
          {
            "speaker": "A",
            "chinese": "她走得很慢吧？",
            "pinyin": "Tā zǒu de hěn màn ba?",
            "vietnamese": "Bà ấy đi chậm lắm nhỉ?"
          },
          {
            "speaker": "B",
            "chinese": "也不慢，她以前是体育老师。",
            "pinyin": "Yě  bù màn, tā yǐqián shì tǐyù lǎoshī.",
            "vietnamese": "Cũng không chậm đâu, trước đây bà là giáo viên thể dục mà."
          }
        ]
      },
      {
        "title": "3. 在办公室 (Ở văn phòng)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "校长，这是我的报告。",
            "pinyin": "Xiàozhǎng, zhè shì wǒ de bàogào.",
            "vietnamese": "Hiệu trưởng, đây là báo cáo của tôi."
          },
          {
            "speaker": "B",
            "chinese": "放在桌子上吧。",
            "pinyin": "Fàng zài zhuōzi shang ba.",
            "vietnamese": "Để trên bàn đi."
          },
          {
            "speaker": "A",
            "chinese": "您看还有什么问题吗？",
            "pinyin": "Nín kàn hái yǒu shénme wèntí ma?",
            "vietnamese": "Ngài xem còn vấn đề gì không ạ?"
          },
          {
            "speaker": "B",
            "chinese": "报告写得不错，不过，你应该再检查一下，别有错别字。",
            "pinyin": "Bàogào xiě de búcuò, búguò, nǐ yīnggāi zài jiǎnchá yíxià, bié yǒu cuòbiézì.",
            "vietnamese": "Báo cáo viết không tồi, nhưng mà, cậu nên kiểm tra lại một chút, đừng để có lỗi chính tả."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk3_14",
    "dialogues": [
      {
        "title": "1. 在家里 (Ở nhà)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "客人就要来了，你怎么还不打扫房间啊？",
            "pinyin": "Kèrén jiù yào lái le, nǐ zěnme hái bù dǎsǎo fángjiān a?",
            "vietnamese": "Khách sắp đến rồi, sao bạn vẫn chưa dọn dẹp phòng?"
          },
          {
            "speaker": "B",
            "chinese": "我正在洗澡呢，一会儿就打扫。",
            "pinyin": "Wǒ zhèngzài xǐzǎo ne, yíhuìr jiù dǎsǎo.",
            "vietnamese": "Mình đang tắm, lát nữa sẽ dọn ngay."
          },
          {
            "speaker": "A",
            "chinese": "你洗完澡先把杯子洗干净，然后把冰箱里的西瓜拿出来。",
            "pinyin": "Nǐ xǐ wán zǎo xiān bǎ bēizi xǐ gānjìng, ránhòu bǎ bīngxiāng lǐ de xīguā ná chūlái.",
            "vietnamese": "Tắm xong bạn rửa sạch cốc chén trước, sau đó lấy dưa hấu trong tủ lạnh ra nhé."
          },
          {
            "speaker": "B",
            "chinese": "好的。",
            "pinyin": "Hǎo de.",
            "vietnamese": "Được rồi."
          }
        ]
      },
      {
        "title": "2. 聊客人 (Nói chuyện về khách)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "外面刮风了，好像要下雨了。",
            "pinyin": "Wàimiàn guā fēng le, hǎoxiàng yào xià yǔ le.",
            "vietnamese": "Bên ngoài nổi gió rồi, hình như sắp mưa."
          },
          {
            "speaker": "B",
            "chinese": "叔叔和阿姨还没来呢。",
            "pinyin": "Shūshu hé āyí hái méi lái ne.",
            "vietnamese": "Chú và dì vẫn chưa tới."
          },
          {
            "speaker": "A",
            "chinese": "你给他们打个电话吧。",
            "pinyin": "Nǐ gěi tāmen dǎ gè diànhuà ba.",
            "vietnamese": "Bạn gọi điện cho họ đi."
          },
          {
            "speaker": "B",
            "chinese": "听，有声音了，可能是 họ tới (可能是他们来了)。",
            "pinyin": "Tīng, yǒu shēngyīn le, kěnéng shì tāmen lái le.",
            "vietnamese": "Nghe kìa, có tiếng rồi, có lẽ là họ tới rồi."
          }
        ]
      },
      {
        "title": "3. 在家里 (Ở nhà)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "怎么买这么多香蕉？",
            "pinyin": "Zěnme mǎi zhème duō xiāngjiāo?",
            "vietnamese": "Sao mua nhiều chuối thế?"
          },
          {
            "speaker": "B",
            "chinese": "刚才路过水果店，看到香蕉很便宜就买了一些。",
            "pinyin": "Gāngcái lùguò shuǐguǒ diàn, kàndào xiāngjiāo hěn piányi jiù mǎi le yìxiē.",
            "vietnamese": "Vừa nãy đi ngang qua cửa hàng hoa quả, thấy chuối rất rẻ nên mua một ít."
          },
          {
            "speaker": "A",
            "chinese": "我们吃不完啊，容易坏。",
            "pinyin": "Wǒmen chī bù wán a, róngyì huài.",
            "vietnamese": "Chúng ta ăn không hết đâu, dễ bị hỏng lắm."
          },
          {
            "speaker": "B",
            "chinese": "没关系，每天吃几个很快就吃完了。",
            "pinyin": "Méi guānxi, měitiān chī jǐ gè hěn kuài jiù chī wán le.",
            "vietnamese": "Không sao, mỗi ngày ăn vài quả là nhanh hết thôi."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk3_15",
    "dialogues": [
      {
        "title": "1. 聊学习 (Nói chuyện về học tập)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "你的汉语水平提高得真快。",
            "pinyin": "Nǐ de Hànyǔ shuǐpíng tígāo de zhēn kuài.",
            "vietnamese": "Trình độ tiếng Hán của bạn nâng cao nhanh thật."
          },
          {
            "speaker": "B",
            "chinese": "哪里，这半年来，除了上课，我还每天上网练习。",
            "pinyin": "Nǎlǐ, zhè bàn nián lái, chúle shàngkè, wǒ hái měitiān shàngwǎng liànxí.",
            "vietnamese": "Đâu có, nửa năm nay, ngoài việc lên lớp, ngày nào mình cũng lên mạng luyện tập."
          },
          {
            "speaker": "A",
            "chinese": "难怪你的听力和口语都那么好。",
            "pinyin": "Nánguài nǐ de tīnglì hé kǒuyǔ dōu nàme hǎo.",
            "vietnamese": "Thảo nào nghe và nói của bạn đều tốt như vậy."
          }
        ]
      },
      {
        "title": "2. 在教室 (Ở phòng học)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "老师，您看我的作文还有什么问题吗？",
            "pinyin": "Lǎoshī, nín kàn wǒ de zuòwén hái yǒu shénme wèntí ma?",
            "vietnamese": "Thưa thầy, thầy xem bài văn của em còn vấn đề gì không ạ?"
          },
          {
            "speaker": "B",
            "chinese": "除了这几个句子不太通顺，其他都没什么问题。",
            "pinyin": "Chúle zhè jǐ gè jùzi bú tài tōngshùn, qítā dōu méi shénme wèntí.",
            "vietnamese": "Ngoài vài câu này chưa được trôi chảy lắm, những phần khác đều không có vấn đề gì."
          },
          {
            "speaker": "A",
            "chinese": "谢谢老师，我回去再改改。",
            "pinyin": "Xièxie lǎoshī, wǒ huíqù zài gǎi gǎi.",
            "vietnamese": "Cảm ơn thầy, em về sẽ sửa lại."
          },
          {
            "speaker": "B",
            "chinese": "注意词语的用法。",
            "pinyin": "Zhùyì  cíyǔ de yòngfǎ.",
            "vietnamese": "Chú ý cách sử dụng từ ngữ."
          }
        ]
      },
      {
        "title": "3. 在办公室 (Ở văn phòng)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "经理，这是我上个月的工作总结。",
            "pinyin": "Jīnglǐ, zhè shì wǒ shàng gè yuè de gōngzuò zǒngjié.",
            "vietnamese": "Giám đốc, đây là tổng kết công việc tháng trước của tôi."
          },
          {
            "speaker": "B",
            "chinese": "放这儿吧。你对新的工作环境适应了吗？",
            "pinyin": "Fàng zhèr ba. Nǐ duì xīn de gōngzuò huánjìng shìyìng le ma?",
            "vietnamese": "Cứ để ở đây. Cậu đã quen với môi trường làm việc mới chưa?"
          },
          {
            "speaker": "A",
            "chinese": "刚开始有些不习惯，不过现在好多了。",
            "pinyin": "Gāng kāishǐ yǒuxiē bù xíguàn, búguò xiànzài hǎo duō le.",
            "vietnamese": "Lúc mới bắt đầu có chút không quen, nhưng bây giờ thì tốt hơn nhiều rồi."
          },
          {
            "speaker": "B",
            "chinese": "要对自己有要求，除了完成工作，还要多学习。",
            "pinyin": "Yào duì zìjǐ yǒu yāoqiú, chúle wánchéng gōngzuò, hái yào duō xuéxí.",
            "vietnamese": "Phải có yêu cầu đối với bản thân, ngoài việc hoàn thành công việc, còn phải học hỏi nhiều hơn."
          },
          {
            "speaker": "A",
            "chinese": "好的，我会注意的。",
            "pinyin": "Hǎo de, wǒ huì zhùyì de.",
            "vietnamese": "Vâng, tôi sẽ chú ý ạ."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk3_16",
    "dialogues": [
      {
        "title": "1. 在公司 (Ở công ty)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "我现在累得下了班就想睡觉。",
            "pinyin": "Wǒ xiànzài lèi de xià le bān jiù xiǎng shuìjiào.",
            "vietnamese": "Bây giờ tôi mệt đến mức tan làm xong chỉ muốn ngủ."
          },
          {
            "speaker": "B",
            "chinese": "你怎么这么累？",
            "pinyin": "Nǐ zěnme zhème lèi?",
            "vietnamese": "Sao bạn lại mệt thế này?"
          },
          {
            "speaker": "A",
            "chinese": "每天要坐两个多小时的地铁来上班，能不累吗？",
            "pinyin": "Měitiān yào zuò liǎng gè duō xiǎoshí de dìtiě lái shàngbān, néng bú lèi ma?",
            "vietnamese": "Mỗi ngày phải ngồi tàu điện ngầm hơn 2 tiếng đồng hồ để đến làm, có thể không mệt sao?"
          },
          {
            "speaker": "B",
            "chinese": "如果有钱，就在公司附近买个房子。",
            "pinyin": "Rúguǒ yǒu qián, jiù zài gōngsī fùjìn mǎi gè fángzi.",
            "vietnamese": "Nếu có tiền, thì mua một căn nhà ở gần công ty đi."
          }
        ]
      },
      {
        "title": "2. 在家里 (Ở nhà)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "你看这双皮鞋怎么样？(Nǐ rènwéi zhè shuāng píxié zěnmeyàng? -> 你认为这双皮鞋怎么样？)",
            "pinyin": "Nǐ rènwéi zhè shuāng píxié zěnmeyàng?",
            "vietnamese": "Bạn thấy đôi giày da này thế nào?"
          },
          {
            "speaker": "B",
            "chinese": "颜色还可以，但是有点儿小。",
            "pinyin": "Yánsè hái kěyǐ, dànshì yǒu diǎnr xiǎo.",
            "vietnamese": "Màu sắc cũng được, nhưng hơi nhỏ một chút."
          },
          {
            "speaker": "A",
            "chinese": "那换一双大点儿的吧。",
            "pinyin": "Nà huàn yì shuāng dà diǎnr de ba.",
            "vietnamese": "Vậy đổi một đôi to hơn chút đi."
          },
          {
            "speaker": "B",
            "chinese": "这双怎么样？",
            "pinyin": "Zhè shuāng zěnmeyàng?",
            "vietnamese": "Đôi này thì sao?"
          },
          {
            "speaker": "A",
            "chinese": "挺好的，就买这双吧。",
            "pinyin": "Tǐng hǎo de, jiù mǎi zhè shuāng ba.",
            "vietnamese": "Rất tốt, mua đôi này đi."
          }
        ]
      },
      {
        "title": "3. 聊孩子 (Nói chuyện về con cái)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "你女儿长得真可爱，鼻子和嘴都很像你。",
            "pinyin": "Nǐ nǚ'ér zhǎng de zhēn kě'ài, bízi hé zuǐ dōu hěn xiàng nǐ.",
            "vietnamese": "Con gái bạn trông đáng yêu thật, mũi và miệng đều rất giống bạn."
          },
          {
            "speaker": "B",
            "chinese": "是，但是她的头发像她爸爸。",
            "pinyin": "Shì, dànshì tā de tóufa xiàng tā bàba.",
            "vietnamese": "Ừ, nhưng tóc của con bé lại giống bố nó."
          },
          {
            "speaker": "A",
            "chinese": "她今年多大了？",
            "pinyin": "Tā  jīnnián duō dà le?",
            "vietnamese": "Con bé năm nay bao nhiêu tuổi rồi?"
          },
          {
            "speaker": "B",
            "chinese": "两岁了，现在有十公斤了。",
            "pinyin": "Liǎng suì le, xiànzài yǒu shí gōngjīn le.",
            "vietnamese": "Hai tuổi rồi, bây giờ được 10kg rồi."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk3_17",
    "dialogues": [
      {
        "title": "1. 在公司 (Ở công ty)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "你怎么请假了？",
            "pinyin": "Nǐ zěnme qǐng jià le?",
            "vietnamese": "Sao bạn lại xin nghỉ phép thế?"
          },
          {
            "speaker": "B",
            "chinese": "我有点儿发烧，想去医院看看。",
            "pinyin": "Wǒ yǒu diǎnr fāshāo, xiǎng qù yīyuàn kàn kàn.",
            "vietnamese": "Tôi hơi sốt, muốn đến viện khám thử. -> Tôi hơi sốt, muốn đến bệnh viện khám thử."
          },
          {
            "speaker": "A",
            "chinese": "严重吗？",
            "pinyin": "Yánzhòng ma?",
            "vietnamese": "Có nghiêm trọng không?"
          },
          {
            "speaker": "B",
            "chinese": "医生说没什么大问题，但是必须多喝水，多休息。",
            "pinyin": "Yīshēng shuō méi shénme dà wèntí, dànshì bìxū duō hē shuǐ, duō xiūxi.",
            "vietnamese": "Bác sĩ nói không có vấn đề gì lớn, nhưng bắt buộc phải uống nhiều nước, nghỉ ngơi nhiều."
          },
          {
            "speaker": "A",
            "chinese": "那你好好休息，谁都有办法看好你的病，就是你自己得多注意。",
            "pinyin": "Nà nǐ hǎohāo xiūxi, shéi dōu yǒu bànfǎ kànhǎo nǐ de bìng, jiùshì nǐ zìjǐ děi duō zhùyì.",
            "vietnamese": "Vậy bạn nghỉ ngơi cho tốt, ai cũng có cách chữa khỏi bệnh cho bạn, chỉ là bản thân bạn phải chú ý nhiều hơn."
          }
        ]
      },
      {
        "title": "2. 在饭馆 (Ở nhà hàng)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "这里的菜真好吃，我已经吃饱了。",
            "pinyin": "Zhèlǐ de cài zhēn hǎochī, wǒ yǐjīng chī bǎo le.",
            "vietnamese": "Đồ ăn ở đây ngon thật, mình đã ăn no rồi."
          },
          {
            "speaker": "B",
            "chinese": "我也吃饱了。你喝点儿什么？",
            "pinyin": "Wǒ yě chī bǎo le. Nǐ hē diǎnr shénme?",
            "vietnamese": "Mình cũng no rồi. Bạn uống chút gì không?"
          },
          {
            "speaker": "A",
            "chinese": "我有点儿渴，想喝口水。",
            "pinyin": "Wǒ  yǒu diǎnr kě, xiǎng hē kǒu shuǐ.",
            "vietnamese": "Mình hơi khát, muốn uống ngụm nước."
          },
          {
            "speaker": "B",
            "chinese": "服务员，请给我们两杯水。",
            "pinyin": "Fúwùyuán, qǐng gěi wǒmen liǎng bēi shuǐ.",
            "vietnamese": "Phục vụ, làm ơn cho chúng tôi hai cốc nước."
          }
        ]
      },
      {
        "title": "3. 聊爱好 (Nói chuyện về sở thích)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "你的爱好是什么？",
            "pinyin": "Nǐ de àihào  shì shénme?",
            "vietnamese": "Sở thích của bạn là gì?"
          },
          {
            "speaker": "B",
            "chinese": "我以前喜欢唱歌，后来为了健康，决定多运动。",
            "pinyin": "Wǒ yǐqián xǐhuan chàng gē, hòulái wèi le jiànkāng, juédìng duō yùndòng.",
            "vietnamese": "Trước đây mình thích hát, sau này vì sức khỏe, đã quyết định vận động nhiều hơn."
          },
          {
            "speaker": "A",
            "chinese": "那你现在经常做什么运动？",
            "pinyin": "Nà nǐ xiànzài jīngcháng zuò shénme yùndòng?",
            "vietnamese": "Vậy bây giờ bạn thường xuyên tập môn thể thao nào?"
          },
          {
            "speaker": "B",
            "chinese": "根据天气情况选择。如果是冬天，我就去滑雪。",
            "pinyin": "Gēnjù tiānqì qíngkuàng xuǎnzé. Rúguǒ  shì dōngtiān, wǒ jiù qù huáxuě.",
            "vietnamese": "Lựa chọn căn cứ vào tình hình thời tiết. Nếu là mùa đông, mình sẽ đi trượt tuyết."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk3_18",
    "dialogues": [
      {
        "title": "1. 在家里 (Ở nhà)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "爸，妈，我想去国外留学。",
            "pinyin": "Bà, mā, wǒ xiǎng qù guówài liúxué.",
            "vietnamese": "Bố, mẹ, con muốn đi du học nước ngoài."
          },
          {
            "speaker": "B",
            "chinese": "去哪个国家？你决定了吗？",
            "pinyin": "Qù nǎge guójiā? Nǐ juédìng le ma?",
            "vietnamese": "Đi nước nào? Con đã quyết định chưa?"
          },
          {
            "speaker": "A",
            "chinese": "决定了。我已经准备好了所有的材料。",
            "pinyin": "Juédìng le. Wǒ  yǐjīng zhǔnbèi hǎo le suǒyǒu de cáiliào.",
            "vietnamese": "Quyết định rồi ạ. Con đã chuẩn bị xong tất cả hồ sơ rồi."
          },
          {
            "speaker": "B",
            "chinese": "只要你努力学习，我相信他们会同意的。",
            "pinyin": "Zhǐyào nǐ nǔlì xuéxí, wǒ xiāngxìn tāmen huì tóngyì de.",
            "vietnamese": "Chỉ cần con nỗ lực học tập, mẹ tin là họ sẽ đồng ý."
          }
        ]
      },
      {
        "title": "2. 在公司 (Ở công ty)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "这次出差的机会很好，你为什么不去？",
            "pinyin": "Zhè cì chūchāi de jīhuì hěn hǎo, nǐ wèishénme bú qù?",
            "vietnamese": "Cơ hội đi công tác lần này rất tốt, sao cậu không đi?"
          },
          {
            "speaker": "B",
            "chinese": "我觉得自己的工作成绩还不够好。",
            "pinyin": "Wǒ juéde zìjǐ de gōngzuò chéngjì hái bú gòu hǎo.",
            "vietnamese": "Tôi cảm thấy thành tích công việc của mình vẫn chưa đủ tốt."
          },
          {
            "speaker": "A",
            "chinese": "你一直很认真地工作，大家都看得到。",
            "pinyin": "Nǐ yìzhí hěn rènzhēn de gōngzuò, dàjiā dōu kàn de dào.",
            "vietnamese": "Cậu luôn làm việc một cách rất nghiêm túc, mọi người đều nhìn thấy."
          },
          {
            "speaker": "B",
            "chinese": "谢谢你的鼓励，我会抓住下一次机会的。",
            "pinyin": "Xièxie nǐ de gǔlì, wǒ huì zhuāzhù xià yí cì jīhuì de.",
            "vietnamese": "Cảm ơn sự khích lệ của anh, tôi sẽ nắm bắt cơ hội lần sau."
          }
        ]
      },
      {
        "title": "3. 聊文化 (Nói chuyện về văn hóa)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "这种茶有什么特点？",
            "pinyin": "Zhè zhǒng chá  yǒu shénme tèdiǎn?",
            "vietnamese": "Loại trà này có đặc điểm gì?"
          },
          {
            "speaker": "B",
            "chinese": "它的味道有点儿奇怪，不是每个人都喜欢。",
            "pinyin": "Tā de wèidào yǒu diǎnr qíguài, bú  shì měi gè rén dōu xǐhuan.",
            "vietnamese": "Hương vị của nó hơi kỳ lạ, không phải ai cũng thích."
          },
          {
            "speaker": "A",
            "chinese": "我尝尝。嗯，确实很特别。",
            "pinyin": "Wǒ cháng cháng. Èn, quèshí hěn tèbié.",
            "vietnamese": "Để tôi nếm thử. Ừm, quả thực rất đặc biệt."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk3_19",
    "dialogues": [
      {
        "title": "1. 在看照片 (Đang xem ảnh)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "你没看出来吗？这是小丽。",
            "pinyin": "Zhè  shì Xiǎo Lì.",
            "vietnamese": "Bạn không nhìn ra sao? Đây là Tiểu Lệ."
          },
          {
            "speaker": "B",
            "chinese": "她的头发怎么变短了？",
            "pinyin": "Tā de tóufa zěnme biàn duǎn le?",
            "vietnamese": "Tóc của cô ấy sao lại ngắn đi rồi?"
          },
          {
            "speaker": "A",
            "chinese": "She just cut it yesterday... (她昨天刚去剪的。你看，她的脸是不是显得更小了？)",
            "pinyin": "Tā zuótiān gāng qù jiǎn de. Nǐ kàn, tā de liǎn shì bú shì xiǎnde gèng xiǎo le?",
            "vietnamese": "Cô ấy vừa đi cắt hôm qua. Bạn xem, mặt cô ấy có phải trông càng nhỏ hơn không?"
          },
          {
            "speaker": "B",
            "chinese": "确实是，不过还是很漂亮。",
            "pinyin": "Quèshí shì, búguò háishì hěn piàoliang.",
            "vietnamese": "Quả thật là vậy, nhưng mà vẫn rất xinh đẹp."
          }
        ]
      },
      {
        "title": "2. 在路上 (Trên đường)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "前边那两位穿蓝衣服的人是谁？",
            "pinyin": "Qiánbian nà liǎng wèi chuān lán yīfu de rén  shì shéi?",
            "vietnamese": "Hai người mặc áo xanh lam phía trước kia là ai vậy?"
          },
          {
            "speaker": "B",
            "chinese": "是我的同事。",
            "pinyin": "Shì wǒ de tóngshì.",
            "vietnamese": "Là đồng nghiệp của tôi."
          },
          {
            "speaker": "A",
            "chinese": "她们长得好像啊。",
            "pinyin": "Tāmen zhǎng de hǎo xiàng a.",
            "vietnamese": "Bọn họ trông giống nhau quá."
          },
          {
            "speaker": "B",
            "chinese": "当然，她们是姐妹。",
            "pinyin": "Dāngrán, tāmen  shì jiěmèi.",
            "vietnamese": "Đương nhiên, họ là chị em mà."
          }
        ]
      },
      {
        "title": "3. 聊旅行 (Nói chuyện về du lịch)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "你们坐船经过黄河的时候，看到了什么？",
            "pinyin": "Nǐmen zuò chuán jīngguò Huánghé de shíhou, kàndào le shénme?",
            "vietnamese": "Lúc các bạn ngồi thuyền đi qua Hoàng Hà, đã nhìn thấy gì?"
          },
          {
            "speaker": "B",
            "chinese": "我们看到了很多美丽的鸟。",
            "pinyin": "Wǒmen kàndào le hěnduō měilì de niǎo.",
            "vietnamese": "Chúng mình đã nhìn thấy rất nhiều những chú chim xinh đẹp."
          },
          {
            "speaker": "A",
            "chinese": "秋天的风景一定很美吧？",
            "pinyin": "Qiūtiān de fēngjǐng yídìng hěn měi ba?",
            "vietnamese": "Phong cảnh mùa thu chắc chắn là rất đẹp nhỉ?"
          },
          {
            "speaker": "B",
            "chinese": "是的，美得让人想哭。",
            "pinyin": "Shì de, měi de ràng rén xiǎng kū.",
            "vietnamese": "Đúng vậy, đẹp đến mức khiến người ta muốn khóc."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk3_20",
    "dialogues": [
      {
        "title": "1. 在学校 (Ở trường học)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "你的汉语成绩怎么提高得这么快？",
            "pinyin": "Nǐ de Hànyǔ chéngjì zěnme tígāo de zhème kuài?",
            "vietnamese": "Thành tích tiếng Hán của bạn sao lại nâng cao nhanh thế?"
          },
          {
            "speaker": "B",
            "chinese": "我被同桌影响了，他每天都努力学习。",
            "pinyin": "Wǒ bèi tóngzhuō yǐngxiǎng le, tā měitiān dōu nǔlì xuéxí.",
            "vietnamese": "Tôi bị người bạn cùng bàn ảnh hưởng rồi, cậu ấy ngày nào cũng nỗ lực học tập."
          },
          {
            "speaker": "A",
            "chinese": "看来有一个好同桌的作用很大。",
            "pinyin": "Kànlái  yǒu yí gè hǎo tóngzhuō de zuòyòng hěn dà.",
            "vietnamese": "Xem ra tác dụng của việc có một người bạn cùng bàn tốt là rất lớn."
          },
          {
            "speaker": "B",
            "chinese": "是啊，遇到不认识的词，他总是教我怎么查。",
            "pinyin": "Shì a, yùdào bù rènshi de cí, tā zǒngshì jiāo wǒ zěnme chá.",
            "vietnamese": "Đúng vậy, khi gặp từ không biết, cậu ấy luôn dạy tôi cách tra cứu."
          }
        ]
      },
      {
        "title": "2. 在家里 (Ở nhà)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "我的照相机怎么坏了？",
            "pinyin": "Wǒ de zhàoxiàngjī zěnme huài le?",
            "vietnamese": "Máy ảnh của con sao lại hỏng rồi?"
          },
          {
            "speaker": "B",
            "chinese": "是是不是被弟弟弄坏了？",
            "pinyin": "Shì bú shì bèi dìdi nòng huài le?",
            "vietnamese": "Có phải bị em trai làm hỏng rồi không?"
          },
          {
            "speaker": "A",
            "chinese": "我刚才发现它在地上。",
            "pinyin": "Wǒ gāngcái fāxiàn tā zài dì shang.",
            "vietnamese": "Vừa nãy con phát hiện nó nằm trên mặt đất."
          },
          {
            "speaker": "B",
            "chinese": "别着急，明天带去修一下就能解决。",
            "pinyin": "Bié zháojí, míngtiān dài qù xiū yíxià jiù néng jiějué.",
            "vietnamese": "Đừng sốt ruột, ngày mai đem đi sửa một chút là có thể giải quyết được."
          }
        ]
      },
      {
        "title": "3. 聊信用卡 (Nói chuyện về thẻ tín dụng)",
        "lines": [
          {
            "speaker": "A",
            "chinese": "你了解信用卡的作用吗？",
            "pinyin": "Nǐ liǎojiě xìnyòngkǎ de zuòyòng ma?",
            "vietnamese": "Bạn có hiểu rõ tác dụng của thẻ tín dụng không?"
          },
          {
            "speaker": "B",
            "chinese": "当然，只有用信用卡，才能在这个网站买东西。",
            "pinyin": "Dāngrán, zhǐyǒu yòng xìnyòngkǎ, cái néng zài zhège wǎngzhàn mǎi dōngxi.",
            "vietnamese": "Đương nhiên, chỉ có dùng thẻ tín dụng, mới có thể mua đồ trên trang web này."
          },
          {
            "speaker": "A",
            "chinese": "但是如果卡被别人拿走，就不安全了。",
            "pinyin": "Dànshì rúguǒ kǎ bèi biérén ná zǒu, jiù bù ānquán le.",
            "vietnamese": "Nhưng nếu thẻ bị người khác lấy mất, thì không an toàn rồi."
          },
          {
            "speaker": "B",
            "chinese": "放心吧，发现卡丢了，马上给银行打电话就行。",
            "pinyin": "Fàngxīn ba, fāxiàn kǎ diū le, mǎshàng gěi yínháng dǎ diànhuà jiù xíng.",
            "vietnamese": "Yên tâm đi, phát hiện mất thẻ, lập tức gọi điện cho ngân hàng là được."
          }
        ]
      }
    ]
  }
];
