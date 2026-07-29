export interface GrammarExample {
  chinese: string;
  pinyin: string;
  vietnamese: string;
}

export interface GrammarPoint {
  title: string;
  examples: GrammarExample[];
}

export interface TopicGrammar {
  topicId: string;
  grammarPoints: GrammarPoint[];
}

export const TOPIC_GRAMMARS: TopicGrammar[] = [
  {
    "topicId": "top_hsk1_01",
    "grammarPoints": [
      {
        "title": "Cấu trúc chào hỏi: [Đại từ nhân xưng] + 好",
        "examples": [
          {
            "chinese": "你好！",
            "pinyin": "Nǐ hǎo!",
            "vietnamese": "Xin chào!"
          },
          {
            "chinese": "您好！",
            "pinyin": "Nín hǎo!",
            "vietnamese": "Chào ngài/ông/bà!"
          },
          {
            "chinese": "你们好！",
            "pinyin": "Nǐmen hǎo!",
            "vietnamese": "Chào các bạn!"
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk1_02",
    "grammarPoints": [
      {
        "title": "Cấu trúc phủ định với 不: 不 + [Động từ/Tính từ]",
        "examples": [
          {
            "chinese": "不谢！",
            "pinyin": "Bú xiè!",
            "vietnamese": "Không có gì!"
          },
          {
            "chinese": "不客气！",
            "pinyin": "Bú kèqi!",
            "vietnamese": "Đừng khách sáo!"
          },
          {
            "chinese": "不对不起",
            "pinyin": "Bú duìbuqǐ",
            "vietnamese": "Không thể nói kết hợp thế này, nhưng từ vựng giới hạn nên dùng bù với tính/động từ khác nếu có. Trong bài chỉ có 不谢 và 不客气, tạm mượn thêm: 不好 - Bù hǎo - Không tốt"
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk1_03",
    "grammarPoints": [
      {
        "title": "Câu hỏi với đại từ nghi vấn 什么 (Cái gì): Chủ ngữ + Động từ + 什么 (+ Danh từ)?",
        "examples": [
          {
            "chinese": "你叫什么名字？",
            "pinyin": "Nǐ jiào shénme míngzi?",
            "vietnamese": "Bạn tên là gì?"
          },
          {
            "chinese": "你是什么人？",
            "pinyin": "Nǐ shì shénme rén?",
            "vietnamese": "Bạn là người gì/như thế nào?"
          },
          {
            "chinese": "什么名字？",
            "pinyin": "Shénme míngzi?",
            "vietnamese": "Tên gì?"
          }
        ]
      },
      {
        "title": "Câu hỏi xác nhận với 吗: Câu trần thuật + 吗?",
        "examples": [
          {
            "chinese": "你是老师吗？",
            "pinyin": "Nǐ shì lǎoshī ma?",
            "vietnamese": "Bạn là giáo viên phải không?"
          },
          {
            "chinese": "你是学生吗？",
            "pinyin": "Nǐ shì xuésheng ma?",
            "vietnamese": "Bạn là học sinh phải không?"
          },
          {
            "chinese": "你是中国人吗？",
            "pinyin": "Nǐ shì Zhōngguó rén ma?",
            "vietnamese": "Bạn là người Trung Quốc phải không?"
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk1_04",
    "grammarPoints": [
      {
        "title": "Trợ từ sở hữu 的: Đại từ/Danh từ + 的 + Danh từ",
        "examples": [
          {
            "chinese": "我的汉语老师",
            "pinyin": "Wǒ de Hànyǔ lǎoshī",
            "vietnamese": "Giáo viên tiếng Trung của tôi"
          },
          {
            "chinese": "我的同学",
            "pinyin": "Wǒ de tóngxué",
            "vietnamese": "Bạn học của tôi - *Có thể lược bỏ 的 khi chỉ quan hệ thân thuộc*"
          },
          {
            "chinese": "我的朋友",
            "pinyin": "Wǒ de péngyou",
            "vietnamese": "Bạn của tôi"
          }
        ]
      },
      {
        "title": "Câu hỏi tỉnh lược với 呢: Đại từ/Danh từ + 呢?",
        "examples": [
          {
            "chinese": "你呢？",
            "pinyin": "Nǐ ne?",
            "vietnamese": "Còn bạn thì sao?"
          },
          {
            "chinese": "她呢？",
            "pinyin": "Tā ne?",
            "vietnamese": "Còn cô ấy thì sao?"
          },
          {
            "chinese": "他呢？",
            "pinyin": "Tā ne?",
            "vietnamese": "Còn anh ấy thì sao?"
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk1_05",
    "grammarPoints": [
      {
        "title": "Câu chữ 有 (Có) biểu thị sự sở hữu: Chủ ngữ + 有 + Tân ngữ",
        "examples": [
          {
            "chinese": "我家有三口人。",
            "pinyin": "Wǒ jiā yǒu sān kǒu rén.",
            "vietnamese": "Nhà tôi có ba người."
          },
          {
            "chinese": "李老师有女儿。",
            "pinyin": "Lǐ lǎoshī yǒu nǚ'ér.",
            "vietnamese": "Cô Lý có con gái."
          },
          {
            "chinese": "她有几口人？",
            "pinyin": "Tā yǒu jǐ kǒu rén?",
            "vietnamese": "Cô ấy có mấy người [trong nhà]?"
          }
        ]
      },
      {
        "title": "Hỏi số lượng với 几 (dưới 10) và hỏi tuổi với 多大",
        "examples": [
          {
            "chinese": "你家有几口人？",
            "pinyin": "Nǐ jiā yǒu jǐ kǒu rén?",
            "vietnamese": "Nhà bạn có mấy người?"
          },
          {
            "chinese": "你女儿几岁了？",
            "pinyin": "Nǐ nǚ'ér jǐ suì le?",
            "vietnamese": "Con gái bạn mấy tuổi rồi?"
          },
          {
            "chinese": "李老师多大了？",
            "pinyin": "Lǐ lǎoshī duōdà le?",
            "vietnamese": "Cô Lý bao nhiêu tuổi rồi?"
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk1_06",
    "grammarPoints": [
      {
        "title": "Động từ năng nguyện 会 (Biết thông qua học tập): Chủ ngữ + 会 + Động từ",
        "examples": [
          {
            "chinese": "我会说汉语。",
            "pinyin": "Wǒ huì shuō Hànyǔ.",
            "vietnamese": "Tôi biết nói tiếng Hán."
          },
          {
            "chinese": "我会做中国菜。",
            "pinyin": "Wǒ huì zuò Zhōngguó cài.",
            "vietnamese": "Tôi biết làm món Trung Quốc."
          },
          {
            "chinese": "我会写汉字。",
            "pinyin": "Wǒ huì xiě Hànzì.",
            "vietnamese": "Tôi biết viết chữ Hán."
          }
        ]
      },
      {
        "title": "Câu hỏi cách thức với 怎么: 怎么 + Động từ",
        "examples": [
          {
            "chinese": "这个字怎么写？",
            "pinyin": "Zhège zì zěnme xiě?",
            "vietnamese": "Chữ này viết như thế nào?"
          },
          {
            "chinese": "这个字怎么读？",
            "pinyin": "Zhège zì zěnme dú?",
            "vietnamese": "Chữ này đọc như thế nào?"
          },
          {
            "chinese": "中国菜怎么做？",
            "pinyin": "Zhōngguó cài zěnme zuò?",
            "vietnamese": "Món Trung Quốc làm như thế nào?"
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk1_07",
    "grammarPoints": [
      {
        "title": "Câu liên động với 去: 主语 + 去 + Nơi chốn + Động từ (Đi đâu làm gì)",
        "examples": [
          {
            "chinese": "我去学校看书。",
            "pinyin": "Wǒ qù xuéxiào kàn shū.",
            "vietnamese": "Tôi đi đến trường đọc sách."
          },
          {
            "chinese": "你去学校做什么？",
            "pinyin": "Nǐ qù xuéxiào zuò shénme?",
            "vietnamese": "Bạn đi đến trường làm gì?"
          },
          {
            "chinese": "明天我去学校。",
            "pinyin": "Míngtiān wǒ qù xuéxiào.",
            "vietnamese": "Ngày mai tôi đi đến trường - *Lược bỏ hành động sau*"
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk1_08",
    "grammarPoints": [
      {
        "title": "Động từ năng nguyện 想 (Muốn): Chủ ngữ + 想 + Động từ",
        "examples": [
          {
            "chinese": "我想喝茶。",
            "pinyin": "Wǒ xiǎng hē chá.",
            "vietnamese": "Tôi muốn uống trà."
          },
          {
            "chinese": "我想吃米饭。",
            "pinyin": "Wǒ xiǎng chī mǐfàn.",
            "vietnamese": "Tôi muốn ăn cơm."
          },
          {
            "chinese": "我想买一个杯子。",
            "pinyin": "Wǒ xiǎng mǎi yí gè bēizi.",
            "vietnamese": "Tôi muốn mua một cái cốc."
          }
        ]
      },
      {
        "title": "Cấu trúc hỏi giá cả với 多少: Chủ ngữ + 多少 + 钱",
        "examples": [
          {
            "chinese": "这个杯子多少钱？",
            "pinyin": "Zhège bēizi duōshao qián?",
            "vietnamese": "Cái cốc này bao nhiêu tiền?"
          },
          {
            "chinese": "那个杯子多少钱？",
            "pinyin": "Nàge bēizi duōshao qián?",
            "vietnamese": "Cái cốc kia bao nhiêu tiền?"
          },
          {
            "chinese": "多少钱买？",
            "pinyin": "Duōshao qián mǎi?",
            "vietnamese": "Mua bao nhiêu tiền?"
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk1_09",
    "grammarPoints": [
      {
        "title": "Giới từ 在 chỉ địa điểm: Chủ ngữ + 在 + Nơi chốn + Động từ",
        "examples": [
          {
            "chinese": "我在学校工作。",
            "pinyin": "Wǒ zài xuéxiào gōngzuò.",
            "vietnamese": "Tôi làm việc ở trường."
          },
          {
            "chinese": "他在医院工作。",
            "pinyin": "Tā zài yīyuàn gōngzuò.",
            "vietnamese": "Cậu ấy làm việc ở bệnh viện."
          },
          {
            "chinese": "你在哪儿工作？",
            "pinyin": "Nǐ zài nǎr gōngzuò?",
            "vietnamese": "Bạn làm việc ở đâu?"
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk1_10",
    "grammarPoints": [
      {
        "title": "Câu tồn tại với 有: Nơi chốn/Vị trí + 有 + Danh từ",
        "examples": [
          {
            "chinese": "桌子上有一个电脑。",
            "pinyin": "Zhuōzi shang yǒu yí gè diànnǎo.",
            "vietnamese": "Trên bàn có một cái máy tính."
          },
          {
            "chinese": "桌子里有一个杯子。",
            "pinyin": "Zhuōzi lǐ yǒu yí gè bēizi.",
            "vietnamese": "Trong bàn có một cái cốc."
          },
          {
            "chinese": "这儿有人吗？",
            "pinyin": "Zhèr yǒu rén ma?",
            "vietnamese": "Ở đây có người không?"
          }
        ]
      },
      {
        "title": "Động từ năng nguyện 能 (Có thể, được phép): Chủ ngữ + 能 + Động từ",
        "examples": [
          {
            "chinese": "我能坐这儿吗？",
            "pinyin": "Wǒ néng zuò zhèr ma?",
            "vietnamese": "Tôi có thể ngồi đây không?"
          },
          {
            "chinese": "你能坐这儿。",
            "pinyin": "Nǐ néng zuò zhèr.",
            "vietnamese": "Bạn có thể ngồi đây."
          },
          {
            "chinese": "他不能坐这儿。",
            "pinyin": "Tā bù néng zuò zhèr.",
            "vietnamese": "Anh ấy không thể ngồi đây."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk1_11",
    "grammarPoints": [
      {
        "title": "Trạng ngữ chỉ thời gian đứng trước hoặc sau chủ ngữ",
        "examples": [
          {
            "chinese": "现在十点十分。",
            "pinyin": "Xiànzài shí diǎn shí fēn.",
            "vietnamese": "Bây giờ là 10 giờ 10 phút."
          },
          {
            "chinese": "我星期一去北京。",
            "pinyin": "Wǒ xīngqīyī qù Běijīng.",
            "vietnamese": "Thứ hai tôi đi Bắc Kinh."
          },
          {
            "chinese": "中午几点吃饭？",
            "pinyin": "Zhōngwǔ jǐ diǎn chī fàn?",
            "vietnamese": "Trưa mấy giờ ăn cơm?"
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk1_12",
    "grammarPoints": [
      {
        "title": "Hỏi tình trạng với 怎么样: Danh từ + 怎么样?",
        "examples": [
          {
            "chinese": "天气怎么样？",
            "pinyin": "Tiānqì zěnmeyàng?",
            "vietnamese": "Thời tiết thế nào?"
          },
          {
            "chinese": "你身体怎么样？",
            "pinyin": "Nǐ shēntǐ zěnmeyàng?",
            "vietnamese": "Sức khỏe bạn thế nào?"
          },
          {
            "chinese": "北京的天气怎么样？",
            "pinyin": "Běijīng de tiānqì zěnmeyàng?",
            "vietnamese": "Thời tiết Bắc Kinh thế nào?"
          }
        ]
      },
      {
        "title": "Cấu trúc cảm thán 太...了 (Quá... rồi)",
        "examples": [
          {
            "chinese": "太热了。",
            "pinyin": "Tài rè le.",
            "vietnamese": "Nóng quá."
          },
          {
            "chinese": "太冷了。",
            "pinyin": "Tài lěng le.",
            "vietnamese": "Lạnh quá."
          },
          {
            "chinese": "不太好。",
            "pinyin": "Bú tài hǎo.",
            "vietnamese": "Không tốt lắm - *Dạng phủ định không có 了*"
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk1_13",
    "grammarPoints": [
      {
        "title": "Cấu trúc chỉ hành động đang diễn ra: 在/正在 + Động từ + 呢",
        "examples": [
          {
            "chinese": "你在做什么呢？",
            "pinyin": "Nǐ zài zuò shénme ne?",
            "vietnamese": "Bạn đang làm gì thế?"
          },
          {
            "chinese": "我在看书呢。",
            "pinyin": "Wǒ zài kàn shū ne.",
            "vietnamese": "Tôi đang đọc sách."
          },
          {
            "chinese": "他在学做中国菜呢。",
            "pinyin": "Tā zài xué zuò Zhōngguó cài ne.",
            "vietnamese": "Cậu ấy đang học làm món Trung Quốc."
          }
        ]
      },
      {
        "title": "Giới từ 给 (Cho ai đó): 主语 + 给 + Tân ngữ + Động từ",
        "examples": [
          {
            "chinese": "我给她打电话。",
            "pinyin": "Wǒ gěi tā dǎ diànhuà.",
            "vietnamese": "Tôi gọi điện thoại cho cô ấy."
          },
          {
            "chinese": "大卫给她打电话。",
            "pinyin": "Dàwèi gěi tā dǎ diànhuà.",
            "vietnamese": "David gọi điện thoại cho cô ấy."
          },
          {
            "chinese": "你给我打电话吧。",
            "pinyin": "Nǐ gěi wǒ dǎ diànhuà ba.",
            "vietnamese": "Bạn gọi điện cho tôi nhé."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk1_14",
    "grammarPoints": [
      {
        "title": "Trợ từ động thái 了 (Đứng sau động từ chỉ hành động đã hoàn thành)",
        "examples": [
          {
            "chinese": "我买了一点儿苹果。",
            "pinyin": "Wǒ mǎi le yìdiǎnr píngguǒ.",
            "vietnamese": "Tôi đã mua một ít táo."
          },
          {
            "chinese": "她买了不少衣服。",
            "pinyin": "Tā mǎi le bù shǎo yīfu.",
            "vietnamese": "Cô ấy đã mua không ít quần áo."
          },
          {
            "chinese": "他去学开车了。",
            "pinyin": "Tā qù xué kāi chē le.",
            "vietnamese": "Ông ấy đi học lái xe rồi."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk1_15",
    "grammarPoints": [
      {
        "title": "Cấu trúc nhấn mạnh 是... 的 (Nhấn mạnh thời gian, địa điểm, phương thức của hành động đã xảy ra)",
        "examples": [
          {
            "chinese": "我们是在学校认识的。",
            "pinyin": "Wǒmen shì zài xuéxiào rènshi de.",
            "vietnamese": "Chúng tôi quen nhau ở trường học. -> Nhấn mạnh địa điểm"
          },
          {
            "chinese": "我们是坐出租车来的。",
            "pinyin": "Wǒmen shì zuò chūzūchē lái de.",
            "vietnamese": "Chúng tôi đến bằng taxi. -> Nhấn mạnh phương thức"
          },
          {
            "chinese": "您是坐飞机来北京的？",
            "pinyin": "Nín shì zuò fēijī lái Běijīng de?",
            "vietnamese": "Ngài đến Bắc Kinh bằng máy bay à?"
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk2_01",
    "grammarPoints": [
      {
        "title": "Phó từ chỉ mức độ 最 (Nhất): 最 + Tính từ / Động từ tâm lý",
        "examples": [
          {
            "chinese": "九月去最好。",
            "pinyin": "Jiǔ yuè qù zuì hǎo.",
            "vietnamese": "Tháng 9 đi là tốt nhất."
          },
          {
            "chinese": "我最喜欢踢足球。",
            "pinyin": "Wǒ zuì xǐhuan tī zúqiú.",
            "vietnamese": "Tôi thích đá bóng nhất."
          },
          {
            "chinese": "我觉得它的眼睛最漂亮。",
            "pinyin": "Wǒ juéde tā de yǎnjing zuì piàoliang.",
            "vietnamese": "Tôi thấy mắt của nó đẹp nhất."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk2_02",
    "grammarPoints": [
      {
        "title": "Đại từ 每 (Mỗi): 每 + Lượng từ/Danh từ (+ 都) + Động từ",
        "examples": [
          {
            "chinese": "我每天早上都去跑步。",
            "pinyin": "Wǒ měitiān zǎoshang dōu qù pǎobù.",
            "vietnamese": "Mỗi sáng tôi đều đi chạy bộ."
          },
          {
            "chinese": "他每天回来都很累。",
            "pinyin": "Tā měitiān huílái dōu hěn lèi.",
            "vietnamese": "Mỗi ngày cậu ấy về đều rất mệt."
          },
          {
            "chinese": "我每天六点起床。",
            "pinyin": "Wǒ měitiān liù diǎn qǐchuáng.",
            "vietnamese": "Tôi thức dậy lúc 6 giờ mỗi ngày."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk2_03",
    "grammarPoints": [
      {
        "title": "Cụm từ chữ 的 (Lược bỏ danh từ trung tâm khi đã rõ nghĩa)",
        "examples": [
          {
            "chinese": "左边那个红色的是我的。",
            "pinyin": "Zuǒbian nàge hóngsè de shì wǒ de.",
            "vietnamese": "Cái màu đỏ bên trái kia là [cốc] của tôi."
          },
          {
            "chinese": "不是我的，是我爸爸的。",
            "pinyin": "Bú shì wǒ de, shì wǒ bàba de.",
            "vietnamese": "Không phải [đồng hồ] của tôi, là của bố tôi."
          },
          {
            "chinese": "不是今天的，是昨天的。",
            "pinyin": "Bú shì jīntiān de, shì zuótiān de.",
            "vietnamese": "Không phải [báo] của hôm nay, là của hôm qua."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk2_04",
    "grammarPoints": [
      {
        "title": "Phó từ 已经... 了 (Đã... rồi)",
        "examples": [
          {
            "chinese": "已经踢了十年了。",
            "pinyin": "Yǐjīng tī le shí nián le.",
            "vietnamese": "Đã đá được 10 năm rồi."
          },
          {
            "chinese": "已经两年多了。",
            "pinyin": "Yǐjīng liǎng nián duō le.",
            "vietnamese": "Đã hơn hai năm rồi."
          },
          {
            "chinese": "她已经开始工作了。",
            "pinyin": "Tā yǐjīng kāishǐ gōngzuò le.",
            "vietnamese": "Cô ấy đã bắt đầu làm việc rồi."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk2_05",
    "grammarPoints": [
      {
        "title": "Phó từ 就 (Nhấn mạnh kết luận hoặc sự lựa chọn)",
        "examples": [
          {
            "chinese": "就做你爱吃的鱼吧。",
            "pinyin": "Jiù zuò nǐ ài chī de yú ba.",
            "vietnamese": "Thì làm món cá bạn thích ăn đi."
          },
          {
            "chinese": "就买这件吧。",
            "pinyin": "Jiù mǎi zhè jiàn ba.",
            "vietnamese": "Mua chiếc này đi."
          },
          {
            "chinese": "就喝咖啡吧。",
            "pinyin": "Jiù hē kāfēi ba.",
            "vietnamese": "Uống cà phê thôi."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk2_06",
    "grammarPoints": [
      {
        "title": "Cấu trúc nguyên nhân - kết quả: 因为... 所以... (Bởi vì... Cho nên...)",
        "examples": [
          {
            "chinese": "因为昨天下雨，所以我们都没去。",
            "pinyin": "Yīnwèi zuótiān xià yǔ, suǒyǐ wǒmen dōu méi qù.",
            "vietnamese": "Bởi vì hôm qua trời mưa, cho nên chúng tôi đều không đi."
          },
          {
            "chinese": "因为肉很好吃，所以我吃很多。",
            "pinyin": "Yīnwèi ròu hěn hǎochī, suǒyǐ wǒ chī hěnduō.",
            "vietnamese": "Vì thịt ngon nên tôi ăn nhiều."
          },
          {
            "chinese": "因为不经常游泳，所以我没去。",
            "pinyin": "Yīnwèi bù jīngcháng yóuyǒng, suǒyǐ wǒ méi qù.",
            "vietnamese": "Vì không thường xuyên bơi, nên tôi không đi."
          }
        ]
      },
      {
        "title": "Đại từ nghi vấn 怎么 (Sao lại, tại sao - hỏi nguyên nhân/sự ngạc nhiên)",
        "examples": [
          {
            "chinese": "你怎么不吃了？",
            "pinyin": "Nǐ zěnme bù chī le?",
            "vietnamese": "Sao bạn không ăn nữa?"
          },
          {
            "chinese": "你们怎么都没去？",
            "pinyin": "Nǐmen zěnme dōu méi qù?",
            "vietnamese": "Sao các bạn đều không đi?"
          },
          {
            "chinese": "你怎么不知道？",
            "pinyin": "Nǐ zěnme bù zhīdào?",
            "vietnamese": "Sao bạn lại không biết?"
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk2_07",
    "grammarPoints": [
      {
        "title": "Giới từ 离 chỉ khoảng cách: A + 离 + B + Tính từ (远/近)",
        "examples": [
          {
            "chinese": "你家离公司远吗？",
            "pinyin": "Nǐ jiā lí gōngsī yuǎn ma?",
            "vietnamese": "Nhà bạn cách công ty xa không?"
          },
          {
            "chinese": "离这儿不远有一个饭馆。",
            "pinyin": "Lí zhèr bù yuǎn yǒu yí gè fànguǎn.",
            "vietnamese": "Cách đây không xa có một nhà hàng."
          },
          {
            "chinese": "机场离公司很远。",
            "pinyin": "Jīchǎng lí gōngsī hěn yuǎn.",
            "vietnamese": "Sân bay cách công ty rất xa."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk2_08",
    "grammarPoints": [
      {
        "title": "Phó từ 再 (Lại, hẵng - Biểu thị hành động sẽ xảy ra trong tương lai)",
        "examples": [
          {
            "chinese": "明天下午再去吧。",
            "pinyin": "Míngtiān xiàwǔ zài qù ba.",
            "vietnamese": "Chiều mai hẵng đi."
          },
          {
            "chinese": "看看报纸再告诉我。",
            "pinyin": "Kàn kàn bàozhǐ zài gàosu wǒ.",
            "vietnamese": "Xem báo rồi hẵng bảo tôi."
          },
          {
            "chinese": "等他回来再打吧。",
            "pinyin": "Děng tā huílái zài dǎ ba.",
            "vietnamese": "Đợi ông ấy về hẵng gọi."
          }
        ]
      },
      {
        "title": "Động từ kiêm ngữ 让 (Để, bảo, nhường): 主语 + 让 + Tân ngữ + Động từ",
        "examples": [
          {
            "chinese": "让我想想再告诉你。",
            "pinyin": "Ràng wǒ xiǎng xiǎng zài gàosu nǐ.",
            "vietnamese": "Để tôi nghĩ chút rồi nói cho bạn."
          },
          {
            "chinese": "我想让他去北京看一看。",
            "pinyin": "Wǒ xiǎng ràng tā qù Běijīng kàn yí kàn.",
            "vietnamese": "Tôi muốn bảo ông ấy đi Bắc Kinh xem sao."
          },
          {
            "chinese": "让他找服务员。",
            "pinyin": "Ràng tā zhǎo fúwùyuán.",
            "vietnamese": "Bảo anh ấy tìm phục vụ."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk2_09",
    "grammarPoints": [
      {
        "title": "Giới từ 从 (Từ): 从 + Thời gian/Địa điểm",
        "examples": [
          {
            "chinese": "您从几岁开始学习跳舞？",
            "pinyin": "Nín cóng jǐ suì kāishǐ xuéxí tiàowǔ?",
            "vietnamese": "Ngài bắt đầu học nhảy từ mấy tuổi?"
          },
          {
            "chinese": "我从七岁开始跳舞。",
            "pinyin": "Wǒ cóng qī suì kāishǐ tiàowǔ.",
            "vietnamese": "Tôi bắt đầu khiêu vũ từ năm 7 tuổi."
          },
          {
            "chinese": "从医院去上班。",
            "pinyin": "Cóng yīyuàn qù shàngbān.",
            "vietnamese": "Đi làm từ bệnh viện."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk2_10",
    "grammarPoints": [
      {
        "title": "Cấu trúc khuyên ngăn 别... 了 (Đừng... nữa)",
        "examples": [
          {
            "chinese": "别找了。",
            "pinyin": "Bié zhǎo le.",
            "vietnamese": "Đừng tìm nữa."
          },
          {
            "chinese": "别洗衣服了。",
            "pinyin": "Bié xǐ yīfu le.",
            "vietnamese": "Đừng giặt quần áo nữa."
          },
          {
            "chinese": "别买西瓜了。",
            "pinyin": "Bié mǎi xīguā le.",
            "vietnamese": "Đừng mua dưa hấu nữa."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk2_11",
    "grammarPoints": [
      {
        "title": "Câu so sánh hơn với 比: A + 比 + B + Tính từ (+ Số lượng)",
        "examples": [
          {
            "chinese": "他比我大三岁。",
            "pinyin": "Tā bǐ wǒ dà sān suì.",
            "vietnamese": "Cậu ấy lớn hơn tôi 3 tuổi."
          },
          {
            "chinese": "今天的西瓜比昨天便宜。",
            "pinyin": "Jīntiān de xīguā bǐ zuótiān piányi.",
            "vietnamese": "Dưa hấu hôm nay rẻ hơn hôm qua."
          },
          {
            "chinese": "苹果也比昨天便宜一些。",
            "pinyin": "Píngguǒ yě bǐ zuótiān piányi yìxiē.",
            "vietnamese": "Táo cũng rẻ hơn hôm qua một chút."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk2_12",
    "grammarPoints": [
      {
        "title": "Bổ ngữ trạng thái với 得: Động từ + 得 + Tính từ / Cụm từ (Đánh giá mức độ của hành động)",
        "examples": [
          {
            "chinese": "你每天起得这么早？",
            "pinyin": "Nǐ měitiān qǐ de zhème zǎo?",
            "vietnamese": "Bạn thức dậy sớm thế này à?"
          },
          {
            "chinese": "她比我起得晚。",
            "pinyin": "Tā bǐ wǒ qǐ de wǎn.",
            "vietnamese": "Cô ấy dậy muộn hơn tôi."
          },
          {
            "chinese": "你穿得太少了。",
            "pinyin": "Nǐ chuān de tài shǎo le.",
            "vietnamese": "Bạn mặc ít quá."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk2_13",
    "grammarPoints": [
      {
        "title": "Trợ từ động thái 着 biểu thị trạng thái đang duy trì: Chủ ngữ + Động từ + 着",
        "examples": [
          {
            "chinese": "门开着呢。",
            "pinyin": "Mén kāi zhe ne.",
            "vietnamese": "Cửa đang mở."
          },
          {
            "chinese": "那个拿铅笔的人是谁？",
            "pinyin": "Nàge ná zhe qiānbǐ de rén shì shéi?",
            "vietnamese": "Người đang cầm bút chì kia là ai? - *Trong bài là 拿 nhưng mở rộng chuẩn ngữ pháp là 拿着*"
          },
          {
            "chinese": "他笑着说话。",
            "pinyin": "Tā xiào zhe shuōhuà.",
            "vietnamese": "Anh ấy cười nói chuyện."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk2_14",
    "grammarPoints": [
      {
        "title": "Trợ từ động thái 过 biểu thị sự việc đã từng trải qua trong quá khứ: Động từ + 过",
        "examples": [
          {
            "chinese": "你看过那个电影吗？",
            "pinyin": "Nǐ kàn guo nàge diànyǐng ma?",
            "vietnamese": "Bạn đã xem phim đó chưa?"
          },
          {
            "chinese": "听说你去过中国。",
            "pinyin": "Tīngshuō nǐ qù guo Zhōngguó.",
            "vietnamese": "Nghe nói bạn đã từng đi Trung Quốc."
          },
          {
            "chinese": "我没去过长城。",
            "pinyin": "Wǒ méi qù guo Chángchéng.",
            "vietnamese": "Tôi chưa từng đi Trường Thành."
          }
        ]
      },
      {
        "title": "Cấu trúc nhượng bộ 虽然... 但是... (Mặc dù... Nhưng...)",
        "examples": [
          {
            "chinese": "虽然去了很多地方，但是没去过长城。",
            "pinyin": "Suīrán qù le hěnduō dìfang, dànshì méi qù guo Chángchéng.",
            "vietnamese": "Mặc dù đi nhiều nơi, nhưng chưa đi Trường Thành."
          },
          {
            "chinese": "虽然是晴天，但是很冷。",
            "pinyin": "Suīrán shì qíngtiān, dànshì hěn lěng.",
            "vietnamese": "Mặc dù trời nắng, nhưng rất lạnh."
          },
          {
            "chinese": "虽然很有意思，但是我没看过。",
            "pinyin": "Suīrán hěn yǒu yìsi, dànshì wǒ méi kàn guo.",
            "vietnamese": "Mặc dù rất thú vị, nhưng tôi chưa từng xem."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk2_15",
    "grammarPoints": [
      {
        "title": "Cấu trúc chỉ sự việc sắp xảy ra: 就要 / 快要 ... 了 (Sắp... rồi)",
        "examples": [
          {
            "chinese": "新年就要到了。",
            "pinyin": "Xīnnián jiù yào dào le.",
            "vietnamese": "Năm mới sắp đến rồi."
          },
          {
            "chinese": "新的一年快要到了！",
            "pinyin": "Xīn de yì nián kuàiyào dào le!",
            "vietnamese": "Một năm mới sắp đến rồi!"
          },
          {
            "chinese": "她快要买票了。",
            "pinyin": "Tā kuàiyào mǎi piào le.",
            "vietnamese": "Cô ấy sắp mua vé rồi."
          }
        ]
      }
    ]
  },
      {
    "topicId": "top_hsk3_01",
    "grammarPoints": [
      {
        "title": "1. Bổ ngữ kết quả 好 (Động từ + 好 - Biểu thị hành động đã hoàn thành và đạt kết quả tốt)",
        "examples": [
          {
            "chinese": "我早就想好了。",
            "pinyin": "",
            "vietnamese": "Tôi đã nghĩ xong từ sớm rồi."
          },
          {
            "chinese": "电影票买好了。",
            "pinyin": "",
            "vietnamese": "Vé xem phim mua xong rồi."
          },
          {
            "chinese": "饭早就做好了。",
            "pinyin": "",
            "vietnamese": "Cơm đã nấu xong từ lâu rồi."
          }
        ]
      },
      {
        "title": "2. Cấu trúc phủ định hoàn toàn (一 + Lượng từ + Danh từ + 也/都 + 不/没 + Động từ)",
        "examples": [
          {
            "chinese": "我一个苹果也没吃。",
            "pinyin": "",
            "vietnamese": "Tôi chưa ăn một quả táo nào cả."
          },
          {
            "chinese": "昨天我一件衣服都没买。",
            "pinyin": "",
            "vietnamese": "Hôm qua tôi không mua một bộ quần áo nào."
          },
          {
            "chinese": "手机、电脑、地图，一个也不能少。",
            "pinyin": "",
            "vietnamese": "Điện thoại, máy tính, bản đồ, một cái cũng không thể thiếu."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk3_02",
    "grammarPoints": [
      {
        "title": "1. Bổ ngữ xu hướng đơn (Động từ + 来 / 去)",
        "examples": [
          {
            "chinese": "你快过来吧。",
            "pinyin": "",
            "vietnamese": "Bạn mau qua đây đi."
          },
          {
            "chinese": "他走进去了。",
            "pinyin": "",
            "vietnamese": "Anh ấy đi vào trong rồi."
          },
          {
            "chinese": "爸爸买回来很多苹果。",
            "pinyin": "",
            "vietnamese": "Bố mua về rất nhiều táo."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk3_03",
    "grammarPoints": [
      {
        "title": "1. Câu hỏi lựa chọn hoặc trần thuật với 还是 và 或者",
        "examples": [
          {
            "chinese": "你喝茶还是喝咖啡？",
            "pinyin": "",
            "vietnamese": "Bạn uống trà hay uống cà phê? - Dùng trong câu hỏi"
          },
          {
            "chinese": "明天是晴天还是阴天？",
            "pinyin": "",
            "vietnamese": "Ngày mai là ngày nắng hay ngày râm mát? - Dùng trong câu hỏi"
          },
          {
            "chinese": "喝茶或者咖啡都可以。",
            "pinyin": "",
            "vietnamese": "Uống trà hoặc cà phê đều được. - Dùng trong câu trần thuật"
          }
        ]
      },
      {
        "title": "2. Câu tồn tại với trợ từ 着 (Nơi chốn + Động từ + 着 + Danh từ)",
        "examples": [
          {
            "chinese": "桌子上放着很多饮料。",
            "pinyin": "",
            "vietnamese": "Trên bàn đặt rất nhiều đồ uống."
          },
          {
            "chinese": "门上写着他的名字。",
            "pinyin": "",
            "vietnamese": "Trên cửa viết tên của anh ấy."
          },
          {
            "chinese": "房间里坐着几个人。",
            "pinyin": "",
            "vietnamese": "Trong phòng có mấy người đang ngồi."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk3_04",
    "grammarPoints": [
      {
        "title": "1. Liên từ diễn tả 2 đặc điểm cùng tồn tại (又... 又... - Vừa... Vừa...)",
        "examples": [
          {
            "chinese": "这个西瓜又大又甜。",
            "pinyin": "",
            "vietnamese": "Quả dưa hấu này vừa to vừa ngọt."
          },
          {
            "chinese": "她又聪明又热情。",
            "pinyin": "",
            "vietnamese": "Cô ấy vừa thông minh vừa nhiệt tình."
          },
          {
            "chinese": "这家超市的蛋糕又便宜又好吃。",
            "pinyin": "",
            "vietnamese": "Bánh của siêu thị này vừa rẻ vừa ngon."
          }
        ]
      },
      {
        "title": "2. Hai hành động diễn ra cùng lúc (Động từ 1 + 着 + Động từ 2)",
        "examples": [
          {
            "chinese": "她总是笑着跟客人说话。",
            "pinyin": "",
            "vietnamese": "Cô ấy luôn cười khi nói chuyện với khách."
          },
          {
            "chinese": "他喜欢听着音乐看书。",
            "pinyin": "",
            "vietnamese": "Anh ấy thích vừa nghe nhạc vừa đọc sách."
          },
          {
            "chinese": "他们站着聊天儿。",
            "pinyin": "",
            "vietnamese": "Họ đứng nói chuyện phiếm."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk3_05",
    "grammarPoints": [
      {
        "title": "1. Trợ từ 了 biểu thị sự thay đổi trạng thái (Đặt cuối câu)",
        "examples": [
          {
            "chinese": "春天来了。",
            "pinyin": "",
            "vietnamese": "Mùa xuân đến rồi."
          },
          {
            "chinese": "草和树都绿了。",
            "pinyin": "",
            "vietnamese": "Cỏ và cây đều xanh rồi."
          },
          {
            "chinese": "我今年二十岁了。",
            "pinyin": "",
            "vietnamese": "Năm nay tôi 20 tuổi rồi."
          }
        ]
      },
      {
        "title": "2. Cấu trúc chỉ sự tăng tiến (越来越 + Tính từ / Động từ tâm lý)",
        "examples": [
          {
            "chinese": "我最近越来越胖了。",
            "pinyin": "",
            "vietnamese": "Dạo này tôi ngày càng béo lên."
          },
          {
            "chinese": "天气越来越热了。",
            "pinyin": "",
            "vietnamese": "Thời tiết ngày càng nóng."
          },
          {
            "chinese": "我越来越喜欢运动。",
            "pinyin": "",
            "vietnamese": "Tôi ngày càng thích thể thao."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk3_06",
    "grammarPoints": [
      {
        "title": "1. Bổ ngữ khả năng (Động từ + 得 / 不 + Bổ ngữ kết quả/xu hướng)",
        "examples": [
          {
            "chinese": "我一个字也看不清楚。",
            "pinyin": "",
            "vietnamese": "Tôi một chữ cũng không nhìn rõ được..."
          },
          {
            "chinese": "今天的作业太多，我做不完。",
            "pinyin": "",
            "vietnamese": "Bài tập hôm nay nhiều quá, tôi làm không xong."
          },
          {
            "chinese": "老师说的话，你听得懂吗？",
            "pinyin": "",
            "vietnamese": "Lời cô giáo nói, bạn nghe có hiểu không?"
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk3_07",
    "grammarPoints": [
      {
        "title": "1. Bổ ngữ thời lượng (Động từ + 了 + Thời gian)",
        "examples": [
          {
            "chinese": "我学了一年汉语。",
            "pinyin": "",
            "vietnamese": "Tôi đã học tiếng Hán một năm."
          },
          {
            "chinese": "我们唱了两个小时歌。",
            "pinyin": "",
            "vietnamese": "Chúng tôi đã hát 2 tiếng đồng hồ."
          },
          {
            "chinese": "她 zài 北京工作了三年。",
            "pinyin": "Tā zài Běijīng gōngzuò le sān nián.",
            "vietnamese": "She has worked in Beijing for three years. -> 她 zài 北京工作了三年。"
          }
        ]
      },
      {
        "title": "2. Cấu trúc hứng thú (对... 感感兴趣 -> 对... 感兴趣)",
        "examples": [
          {
            "chinese": "他对音乐感兴趣。",
            "pinyin": "",
            "vietnamese": "Anh ấy có hứng thú với âm nhạc."
          },
          {
            "chinese": "我对历史不感兴趣。",
            "pinyin": "",
            "vietnamese": "Tôi không có hứng thú với lịch sử."
          },
          {
            "chinese": "你对什么感兴趣？",
            "pinyin": "",
            "vietnamese": "Bạn có hứng thú với cái gì?"
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk3_08",
    "grammarPoints": [
      {
        "title": "1. Đại từ nghi vấn phiếm chỉ (Dùng 2 đại từ nghi vấn giống nhau để chỉ cùng một đối tượng)",
        "examples": [
          {
            "chinese": "你去哪儿我就去哪儿。",
            "pinyin": "",
            "vietnamese": "Bạn đi đâu tôi đi đó."
          },
          {
            "chinese": "什么好吃我就吃什么。",
            "pinyin": "",
            "vietnamese": "Cái gì ngon thì tôi ăn cái đó."
          },
          {
            "chinese": "谁有钱我就跟谁借。",
            "pinyin": "",
            "vietnamese": "Ai có tiền thì tôi mượn người đó."
          }
        ]
      },
      {
        "title": "2. Phó từ chỉ sự lặp lại 又 và 再",
        "examples": [
          {
            "chinese": "昨天他没来，今天又没来。",
            "pinyin": "",
            "vietnamese": "Hôm qua anh ấy không đến, hôm nay lại không đến. -> 又: Đã xảy ra"
          },
          {
            "chinese": "你明天再来吧。",
            "pinyin": "",
            "vietnamese": "Ngày mai bạn lại đến nhé. -> 再: Chưa xảy ra"
          },
          {
            "chinese": "听说你又买房了？",
            "pinyin": "",
            "vietnamese": "Nghe nói bạn lại mua nhà rồi? -> 又: Đã xảy ra"
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk3_09",
    "grammarPoints": [
      {
        "title": "1. Cấu trúc so sánh bằng (A 跟 / 和 B 一样 + Tính từ)",
        "examples": [
          {
            "chinese": "她的汉语说得跟中国人一样好。",
            "pinyin": "",
            "vietnamese": "Tiếng Hán của cô ấy nói giỏi như người Trung Quốc."
          },
          {
            "chinese": "这本书和那本书一样贵。",
            "pinyin": "",
            "vietnamese": "Quyển sách này đắt giống như quyển sách kia."
          },
          {
            "chinese": "哥哥跟弟弟一样高。",
            "pinyin": "",
            "vietnamese": "Anh trai cao bằng em trai."
          }
        ]
      },
      {
        "title": "2. Cấu trúc tiến triển đồng thời (越 A 越 B - Càng... càng...)",
        "examples": [
          {
            "chinese": "你的中文越说越好了。",
            "pinyin": "",
            "vietnamese": "Tiếng Trung của bạn càng nói càng giỏi."
          },
          {
            "chinese": "山越高，路越难走。",
            "pinyin": "",
            "vietnamese": "Núi càng cao, đường càng khó đi."
          },
          {
            "chinese": "雨下得越大，tiếng Trung? 天气越冷。",
            "pinyin": "Yǔ xià de yuè dà, tiānqì yuè lěng.",
            "vietnamese": "Mưa càng to, thời tiết càng lạnh."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk3_10",
    "grammarPoints": [
      {
        "title": "1. Câu so sánh hơn với cụm từ chỉ mức độ (A 比 B + Tính từ + 多了 / 一点儿)",
        "examples": [
          {
            "chinese": "数学比历史难多了。",
            "pinyin": "",
            "vietnamese": "Toán học khó hơn Lịch sử nhiều."
          },
          {
            "chinese": "今天比昨天冷一点儿。",
            "pinyin": "",
            "vietnamese": "Hôm nay lạnh hơn hôm qua một chút."
          },
          {
            "chinese": "这个苹果比那个大得多。",
            "pinyin": "",
            "vietnamese": "Quả táo này to hơn quả táo kia nhiều."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk3_11",
    "grammarPoints": [
      {
        "title": "1. Câu chữ 把 cơ bản (Chủ ngữ + 把 + Tân ngữ + Động từ + Kết quả/Xu hướng/了)",
        "examples": [
          {
            "chinese": "别忘了把空调关了。",
            "pinyin": "",
            "vietnamese": "Đừng quên tắt điều hòa."
          },
          {
            "chinese": "请把这本书还给图书馆。",
            "pinyin": "",
            "vietnamese": "Xin hãy trả quyển sách này cho thư viện."
          },
          {
            "chinese": "我把爸爸的生日忘了。",
            "pinyin": "",
            "vietnamese": "Tôi quên mất sinh nhật của bố rồi."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk3_12",
    "grammarPoints": [
      {
        "title": "1. Câu chữ 把 với giới từ (Chủ ngữ + 把 + Tân ngữ + Động từ + 在/到 + Nơi chốn)",
        "examples": [
          {
            "chinese": "把重要的东西放在我这儿吧。",
            "pinyin": "",
            "vietnamese": "Hãy để những đồ quan trọng ở chỗ tôi."
          },
          {
            "chinese": "我把照片发到你的手机上了。",
            "pinyin": "",
            "vietnamese": "Tôi đã gửi ảnh đến điện thoại của bạn rồi."
          },
          {
            "chinese": "请把车开到学校门口。",
            "pinyin": "",
            "vietnamese": "Xin hãy lái xe đến cổng trường."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk3_13",
    "grammarPoints": [
      {
        "title": "1. Cấu trúc hai hành động song song (一边... 一边... - Vừa... vừa...)",
        "examples": [
          {
            "chinese": "她正一边散步一边看风景。",
            "pinyin": "",
            "vietnamese": "Bà ấy đang vừa đi dạo vừa ngắm phong cảnh."
          },
          {
            "chinese": "爸爸喜欢一边喝茶一边看报纸。",
            "pinyin": "",
            "vietnamese": "Bố thích vừa uống trà vừa đọc báo."
          },
          {
            "chinese": "我们一边吃饭一边聊天儿。",
            "pinyin": "",
            "vietnamese": "Chúng tôi vừa ăn cơm vừa nói chuyện."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk3_14",
    "grammarPoints": [
      {
        "title": "1. Cấu trúc diễn tả trình tự (先... 然后... - Trước tiên... sau đó...)",
        "examples": [
          {
            "chinese": "先把杯子洗干净，然后把西瓜拿出来。",
            "pinyin": "",
            "vietnamese": "Rửa sạch cốc trước, sau đó lấy dưa hấu ra."
          },
          {
            "chinese": "我们先吃饭，然后去看电影。",
            "pinyin": "",
            "vietnamese": "Chúng ta ăn cơm trước, sau đó đi xem phim."
          },
          {
            "chinese": "你先做作业，然后再玩游戏。",
            "pinyin": "",
            "vietnamese": "Con làm bài tập trước, sau đó hẵng chơi game."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk3_15",
    "grammarPoints": [
      {
        "title": "1. Cấu trúc ngoại trừ (除了... (以外)，都/还/也... - Ngoài... ra, thì đều/còn...)",
        "examples": [
          {
            "chinese": "除了这几个句子不太通顺，其他都没什么问题。",
            "pinyin": "",
            "vietnamese": "Ngoài vài câu này chưa được trôi chảy, những phần khác đều không có vấn đề gì."
          },
          {
            "chinese": "除了上课，我还每天上网练习。",
            "pinyin": "",
            "vietnamese": "Ngoài việc lên lớp, ngày nào tôi cũng lên mạng luyện tập."
          },
          {
            "chinese": "除了小王，大家都来了。",
            "pinyin": "",
            "vietnamese": "Ngoài Tiểu Vương ra, mọi người đều đến rồi."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk3_16",
    "grammarPoints": [
      {
        "title": "1. Bổ ngữ trạng thái chỉ mức độ (Động từ + 得 + Cụm từ/Mệnh đề)",
        "examples": [
          {
            "chinese": "我现在累得下了班就想睡觉。",
            "pinyin": "",
            "vietnamese": "Bây giờ tôi mệt đến mức tan làm xong chỉ muốn ngủ."
          },
          {
            "chinese": "她高兴得跳了起来。",
            "pinyin": "",
            "vietnamese": "Cô ấy vui đến mức nhảy cẫng lên."
          },
          {
            "chinese": "天气热得让人不想出门。",
            "pinyin": "",
            "vietnamese": "Thời tiết nóng đến mức khiến người ta không muốn ra khỏi nhà."
          }
        ]
      },
      {
        "title": "2. Câu điều kiện (如果... 就... - Nếu... thì...)",
        "examples": [
          {
            "chinese": "如果有钱，就在公司附近买个房子。",
            "pinyin": "",
            "vietnamese": "Nếu có tiền, thì mua một căn nhà ở gần công ty."
          },
          {
            "chinese": "如果明天下雨，我们就不去爬山了。",
            "pinyin": "",
            "vietnamese": "Nếu ngày mai trời mưa, chúng ta sẽ không đi leo núi nữa."
          },
          {
            "chinese": "如果你喜欢，我就给你买。",
            "pinyin": "",
            "vietnamese": "Nếu bạn thích, tôi sẽ mua cho bạn."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk3_17",
    "grammarPoints": [
      {
        "title": "1. Giới từ chỉ mục đích (为了 - Vì, để)",
        "examples": [
          {
            "chinese": "后来为了健康，决定多运动。",
            "pinyin": "",
            "vietnamese": "Sau này vì sức khỏe, đã quyết định vận động nhiều."
          },
          {
            "chinese": "为了考好ＨＳＫ，他每天学习十个小时。",
            "pinyin": "",
            "vietnamese": "Để thi tốt HSK, anh ấy mỗi ngày học 10 tiếng."
          },
          {
            "chinese": "父母为了孩子，什么都愿意做。",
            "pinyin": "Fùmǔ wèi le háizi, shénme dōu yuànyì zuò.",
            "vietnamese": "Parents would do anything for their children."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk3_18",
    "grammarPoints": [
      {
        "title": "1. Cấu trúc điều kiện đủ (导? 只要... 就... - Chỉ cần... thì...)",
        "examples": [
          {
            "chinese": "只要你努力学习，我相信他们会同意的。",
            "pinyin": "",
            "vietnamese": "Chỉ cần con nỗ lực học tập, mẹ tin là họ sẽ đồng ý."
          },
          {
            "chinese": "只要不下雨，我们就去踢足球。",
            "pinyin": "",
            "vietnamese": "Chỉ cần trời không mưa, chúng tôi sẽ đi đá bóng."
          },
          {
            "chinese": "只要有时间，我就看书。",
            "pinyin": "",
            "vietnamese": "Chỉ cần có thời gian, tôi liền đọc sách."
          }
        ]
      },
      {
        "title": "2. Trợ từ 地 làm trạng ngữ (Tính từ / Phó từ + 地 + Động từ)",
        "examples": [
          {
            "chinese": "你一直很认真地工作。",
            "pinyin": "",
            "vietnamese": "Cậu luôn làm việc một cách rất nghiêm túc."
          },
          {
            "chinese": "他高兴地对我说：“我考上了！”",
            "pinyin": "",
            "vietnamese": "Anh ấy vui vẻ nói với tôi: \"Tôi thi đỗ rồi!\""
          },
          {
            "chinese": "天慢慢地黑了。",
            "pinyin": "",
            "vietnamese": "Trời chầm chậm tối rồi."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk3_19",
    "grammarPoints": [
      {
        "title": "1. Bổ ngữ xu hướng kép (Động từ + 出来 / 过去 / 起来...)",
        "examples": [
          {
            "chinese": "你没看出来吗？",
            "pinyin": "",
            "vietnamese": "Bạn không nhìn ra sao?"
          },
          {
            "chinese": "他站起来回答老师的问题。",
            "pinyin": "",
            "vietnamese": "Anh ấy đứng lên trả lời câu hỏi của thầy giáo."
          },
          {
            "chinese": "请你把那本书拿过来。",
            "pinyin": "",
            "vietnamese": "Xin bạn hãy lấy quyển sách kia qua đây."
          }
        ]
      }
    ]
  },
  {
    "topicId": "top_hsk3_20",
    "grammarPoints": [
      {
        "title": "1. Câu bị động với chữ 被 (Chủ ngữ + 被 + (Tân ngữ) + Động từ + Thành phần khác)",
        "examples": [
          {
            "chinese": "我被同桌影响了。",
            "pinyin": "",
            "vietnamese": "Tôi bị người bạn cùng bàn ảnh hưởng rồi."
          },
          {
            "chinese": "我的照相机被弟弟弄坏了。",
            "pinyin": "",
            "vietnamese": "Máy ảnh của tôi bị em trai làm hỏng rồi."
          },
          {
            "chinese": "那个蛋糕被我吃了。",
            "pinyin": "",
            "vietnamese": "Cái bánh kem đó bị tôi ăn mất rồi."
          }
        ]
      },
      {
        "title": "2. Cấu trúc điều kiện duy nhất (只有... 才... - Chỉ có... mới...)",
        "examples": [
          {
            "chinese": "只有用信用卡，才能在这个网站买东西。",
            "pinyin": "",
            "vietnamese": "Chỉ có dùng thẻ tín dụng, mới có thể mua đồ trên trang web này."
          },
          {
            "chinese": "只有多听多说，才能学好汉语。",
            "pinyin": "",
            "vietnamese": "Chỉ có nghe nhiều nói nhiều, mới có thể học tốt tiếng Hán."
          },
          {
            "chinese": "只有你，才能帮我。",
            "pinyin": "",
            "vietnamese": "Chỉ có bạn mới có thể giúp tôi."
          }
        ]
      }
    ]
  }
];
