const fs = require('fs');

const text = `
## GIÁO TRÌNH HSK 1

### Bài 1: 你好！

* **Cấu trúc chào hỏi: [Đại từ nhân xưng] + 好**
* 你好！(Nǐ hǎo! - Xin chào!)
* 您好！(Nín hǎo! - Chào ngài/ông/bà!)
* 你们好！(Nǐmen hǎo! - Chào các bạn!)

### Bài 2: 谢谢你！

* **Cấu trúc phủ định với 不: 不 + [Động từ/Tính từ]**
* 不谢！(Bú xiè! - Không có gì!)
* 不客气！(Bú kèqi! - Đừng khách sáo!)
* 不对不起 (Bú duìbuqǐ - Không thể nói kết hợp thế này, nhưng từ vựng giới hạn nên dùng bù với tính/động từ khác nếu có. Trong bài chỉ có 不谢 và 不客气, tạm mượn thêm: 不好 - Bù hǎo - Không tốt).

### Bài 3: 你叫什么名字？

* **Câu hỏi với đại từ nghi vấn 什么 (Cái gì): Chủ ngữ + Động từ + 什么 (+ Danh từ)?**
* 你叫什么名字？(Nǐ jiào shénme míngzi? - Bạn tên là gì?)
* 你是什么人？(Nǐ shì shénme rén? - Bạn là người gì/như thế nào?)
* 什么名字？(Shénme míngzi? - Tên gì?)


* **Câu hỏi xác nhận với 吗: Câu trần thuật + 吗?**
* 你是老师吗？(Nǐ shì lǎoshī ma? - Bạn là giáo viên phải không?)
* 你是学生吗？(Nǐ shì xuésheng ma? - Bạn là học sinh phải không?)
* 你是中国人吗？(Nǐ shì Zhōngguó rén ma? - Bạn là người Trung Quốc phải không?)

### Bài 4: 她是我的汉语老师

* **Trợ từ sở hữu 的: Đại từ/Danh từ + 的 + Danh từ**
* 我的汉语老师 (Wǒ de Hànyǔ lǎoshī - Giáo viên tiếng Trung của tôi)
* 我的同学 (Wǒ de tóngxué - Bạn học của tôi - *Có thể lược bỏ 的 khi chỉ quan hệ thân thuộc*)
* 我的朋友 (Wǒ de péngyou - Bạn của tôi)


* **Câu hỏi tỉnh lược với 呢: Đại từ/Danh từ + 呢?**
* 你呢？(Nǐ ne? - Còn bạn thì sao?)
* 她呢？(Tā ne? - Còn cô ấy thì sao?)
* 他呢？(Tā ne? - Còn anh ấy thì sao?)

### Bài 5: 她女儿今年二十岁

* **Câu chữ 有 (Có) biểu thị sự sở hữu: Chủ ngữ + 有 + Tân ngữ**
* 我家有三口人。(Wǒ jiā yǒu sān kǒu rén. - Nhà tôi có ba người.)
* 李老师有女儿。(Lǐ lǎoshī yǒu nǚ'ér. - Cô Lý có con gái.)
* 她有几口人？(Tā yǒu jǐ kǒu rén? - Cô ấy có mấy người [trong nhà]?)


* **Hỏi số lượng với 几 (dưới 10) và hỏi tuổi với 多大**
* 你家有几口人？(Nǐ jiā yǒu jǐ kǒu rén? - Nhà bạn có mấy người?)
* 你女儿几岁了？(Nǐ nǚ'ér jǐ suì le? - Con gái bạn mấy tuổi rồi?)
* 李老师多大了？(Lǐ lǎoshī duōdà le? - Cô Lý bao nhiêu tuổi rồi?)

### Bài 6: 我会说汉语

* **Động từ năng nguyện 会 (Biết thông qua học tập): Chủ ngữ + 会 + Động từ**
* 我会说汉语。(Wǒ huì shuō Hànyǔ. - Tôi biết nói tiếng Hán.)
* 我会做中国菜。(Wǒ huì zuò Zhōngguó cài. - Tôi biết làm món Trung Quốc.)
* 我会写汉字。(Wǒ huì xiě Hànzì. - Tôi biết viết chữ Hán.)


* **Câu hỏi cách thức với 怎么: 怎么 + Động từ**
* 这个字怎么写？(Zhège zì zěnme xiě? - Chữ này viết như thế nào?)
* 这个字怎么读？(Zhège zì zěnme dú? - Chữ này đọc như thế nào?)
* 中国菜怎么做？(Zhōngguó cài zěnme zuò? - Món Trung Quốc làm như thế nào?)

### Bài 7: 今天几号

* **Câu liên động với 去: 主语 + 去 + Nơi chốn + Động từ (Đi đâu làm gì)**
* 我去学校看书。(Wǒ qù xuéxiào kàn shū. - Tôi đi đến trường đọc sách.)
* 你去学校做什么？(Nǐ qù xuéxiào zuò shénme? - Bạn đi đến trường làm gì?)
* 明天我去学校。(Míngtiān wǒ qù xuéxiào. - Ngày mai tôi đi đến trường - *Lược bỏ hành động sau*)

### Bài 8: 我想喝茶

* **Động từ năng nguyện 想 (Muốn): Chủ ngữ + 想 + Động từ**
* 我想喝茶。(Wǒ xiǎng hē chá. - Tôi muốn uống trà.)
* 我想吃米饭。(Wǒ xiǎng chī mǐfàn. - Tôi muốn ăn cơm.)
* 我想买一个杯子。(Wǒ xiǎng mǎi yí gè bēizi. - Tôi muốn mua một cái cốc.)


* **Cấu trúc hỏi giá cả với 多少: Chủ ngữ + 多少 + 钱**
* 这个杯子多少钱？(Zhège bēizi duōshao qián? - Cái cốc này bao nhiêu tiền?)
* 那个杯子多少钱？(Nàge bēizi duōshao qián? - Cái cốc kia bao nhiêu tiền?)
* 多少钱买？(Duōshao qián mǎi? - Mua bao nhiêu tiền?)

### Bài 9: 你儿子在哪儿工作

* **Giới từ 在 chỉ địa điểm: Chủ ngữ + 在 + Nơi chốn + Động từ**
* 我在学校工作。(Wǒ zài xuéxiào gōngzuò. - Tôi làm việc ở trường.)
* 他在医院工作。(Tā zài yīyuàn gōngzuò. - Cậu ấy làm việc ở bệnh viện.)
* 你在哪儿工作？(Nǐ zài nǎr gōngzuò? - Bạn làm việc ở đâu?)

### Bài 10: 我能坐这儿吗

* **Câu tồn tại với 有: Nơi chốn/Vị trí + 有 + Danh từ**
* 桌子上有一个电脑。(Zhuōzi shang yǒu yí gè diànnǎo. - Trên bàn có một cái máy tính.)
* 桌子里有一个杯子。(Zhuōzi lǐ yǒu yí gè bēizi. - Trong bàn có một cái cốc.)
* 这儿有人吗？(Zhèr yǒu rén ma? - Ở đây có người không?)


* **Động từ năng nguyện 能 (Có thể, được phép): Chủ ngữ + 能 + Động từ**
* 我能坐这儿吗？(Wǒ néng zuò zhèr ma? - Tôi có thể ngồi đây không?)
* 你能坐这儿。(Nǐ néng zuò zhèr. - Bạn có thể ngồi đây.)
* 他不能坐这儿。(Tā bù néng zuò zhèr. - Anh ấy không thể ngồi đây.)

### Bài 11: 现在几点

* **Trạng ngữ chỉ thời gian đứng trước hoặc sau chủ ngữ**
* 现在十点十分。(Xiànzài shí diǎn shí fēn. - Bây giờ là 10 giờ 10 phút.)
* 我星期一去北京。(Wǒ xīngqīyī qù Běijīng. - Thứ hai tôi đi Bắc Kinh.)
* 中午几点吃饭？(Zhōngwǔ jǐ diǎn chī fàn? - Trưa mấy giờ ăn cơm?)

### Bài 12: 明天天气怎么样

* **Hỏi tình trạng với 怎么样: Danh từ + 怎么样?**
* 天气怎么样？(Tiānqì zěnmeyàng? - Thời tiết thế nào?)
* 你身体怎么样？(Nǐ shēntǐ zěnmeyàng? - Sức khỏe bạn thế nào?)
* 北京的天气怎么样？(Běijīng de tiānqì zěnmeyàng? - Thời tiết Bắc Kinh thế nào?)


* **Cấu trúc cảm thán 太...了 (Quá... rồi)**
* 太热了。(Tài rè le. - Nóng quá.)
* 太冷了。(Tài lěng le. - Lạnh quá.)
* 不太好。(Bú tài hǎo. - Không tốt lắm - *Dạng phủ định không có 了*).

### Bài 13: 他在学做中国菜呢

* **Cấu trúc chỉ hành động đang diễn ra: 在/正在 + Động từ + 呢**
* 你在做什么呢？(Nǐ zài zuò shénme ne? - Bạn đang làm gì thế?)
* 我在看书呢。(Wǒ zài kàn shū ne. - Tôi đang đọc sách.)
* 他在学做中国菜呢。(Tā zài xué zuò Zhōngguó cài ne. - Cậu ấy đang học làm món Trung Quốc.)


* **Giới từ 给 (Cho ai đó): 主语 + 给 + Tân ngữ + Động từ**
* 我给她打电话。(Wǒ gěi tā dǎ diànhuà. - Tôi gọi điện thoại cho cô ấy.)
* 大卫给她打电话。(Dàwèi gěi tā dǎ diànhuà. - David gọi điện thoại cho cô ấy.)
* 你给我打电话吧。(Nǐ gěi wǒ dǎ diànhuà ba. - Bạn gọi điện cho tôi nhé.)

### Bài 14: 她买了不少衣服

* **Trợ từ động thái 了 (Đứng sau động từ chỉ hành động đã hoàn thành)**
* 我买了一点儿苹果。(Wǒ mǎi le yìdiǎnr píngguǒ. - Tôi đã mua một ít táo.)
* 她买了不少衣服。(Tā mǎi le bù shǎo yīfu. - Cô ấy đã mua không ít quần áo.)
* 他去学开车了。(Tā qù xué kāi chē le. - Ông ấy đi học lái xe rồi.)

### Bài 15: 我是坐飞机来的

* **Cấu trúc nhấn mạnh 是... 的 (Nhấn mạnh thời gian, địa điểm, phương thức của hành động đã xảy ra)**
* 我们是在学校认识的。(Wǒmen shì zài xuéxiào rènshi de. - Chúng tôi quen nhau ở trường học. -> Nhấn mạnh địa điểm)
* 我们是坐出租车来的。(Wǒmen shì zuò chūzūchē lái de. - Chúng tôi đến bằng taxi. -> Nhấn mạnh phương thức)
* 您是坐飞机来北京的？(Nín shì zuò fēijī lái Běijīng de? - Ngài đến Bắc Kinh bằng máy bay à?)

## GIÁO TRÌNH HSK 2

### Bài 1: 9月去北京旅游最好

* **Phó từ chỉ mức độ 最 (Nhất): 最 + Tính từ / Động từ tâm lý**
* 九月去最好。(Jiǔ yuè qù zuì hǎo. - Tháng 9 đi là tốt nhất.)
* 我最喜欢踢足球。(Wǒ zuì xǐhuan tī zúqiú. - Tôi thích đá bóng nhất.)
* 我觉得它的眼睛最漂亮。(Wǒ juéde tā de yǎnjing zuì piàoliang. - Tôi thấy mắt của nó đẹp nhất.)

### Bài 2: 我每天六点起床

* **Đại từ 每 (Mỗi): 每 + Lượng từ/Danh từ (+ 都) + Động từ**
* 我每天早上都去跑步。(Wǒ měitiān zǎoshang dōu qù pǎobù. - Mỗi sáng tôi đều đi chạy bộ.)
* 他每天回来都很累。(Tā měitiān huílái dōu hěn lèi. - Mỗi ngày cậu ấy về đều rất mệt.)
* 我每天六点起床。(Wǒ měitiān liù diǎn qǐchuáng. - Tôi thức dậy lúc 6 giờ mỗi ngày.)

### Bài 3: 左边那个红色的是我的

* **Cụm từ chữ 的 (Lược bỏ danh từ trung tâm khi đã rõ nghĩa)**
* 左边那个红色的是我的。(Zuǒbian nàge hóngsè de shì wǒ de. - Cái màu đỏ bên trái kia là [cốc] của tôi.)
* 不是我的，是我爸爸的。(Bú shì wǒ de, shì wǒ bàba de. - Không phải [đồng hồ] của tôi, là của bố tôi.)
* 不是今天的，是昨天的。(Bú shì jīntiān de, shì zuótiān de. - Không phải [báo] của hôm nay, là của hôm qua.)

### Bài 4: 这个工作是他帮我介绍的

* **Phó từ 已经... 了 (Đã... rồi)**
* 已经踢了十年了。(Yǐjīng tī le shí nián le. - Đã đá được 10 năm rồi.)
* 已经两年多了。(Yǐjīng liǎng nián duō le. - Đã hơn hai năm rồi.)
* 她已经开始工作了。(Tā yǐjīng kāishǐ gōngzuò le. - Cô ấy đã bắt đầu làm việc rồi.)

### Bài 5: 就买这件吧

* **Phó từ 就 (Nhấn mạnh kết luận hoặc sự lựa chọn)**
* 就做你爱吃的鱼吧。(Jiù zuò nǐ ài chī de yú ba. - Thì làm món cá bạn thích ăn đi.)
* 就买这件吧。(Jiù mǎi zhè jiàn ba. - Mua chiếc này đi.)
* 就喝咖啡吧。(Jiù hē kāfēi ba. - Uống cà phê thôi.)

### Bài 6: 你怎么不吃了

* **Cấu trúc nguyên nhân - kết quả: 因为... 所以... (Bởi vì... Cho nên...)**
* 因为昨天下雨，所以我们都没去。(Yīnwèi zuótiān xià yǔ, suǒyǐ wǒmen dōu méi qù. - Bởi vì hôm qua trời mưa, cho nên chúng tôi đều không đi.)
* 因为肉很好吃，所以我吃很多。(Yīnwèi ròu hěn hǎochī, suǒyǐ wǒ chī hěnduō. - Vì thịt ngon nên tôi ăn nhiều.)
* 因为不经常游泳，所以我没去。(Yīnwèi bù jīngcháng yóuyǒng, suǒyǐ wǒ méi qù. - Vì không thường xuyên bơi, nên tôi không đi.)


* **Đại từ nghi vấn 怎么 (Sao lại, tại sao - hỏi nguyên nhân/sự ngạc nhiên)**
* 你怎么不吃了？(Nǐ zěnme bù chī le? - Sao bạn không ăn nữa?)
* 你们怎么都没去？(Nǐmen zěnme dōu méi qù? - Sao các bạn đều không đi?)
* 你怎么不知道？(Nǐ zěnme bù zhīdào? - Sao bạn lại không biết?)

### Bài 7: 你家离公司远吗

* **Giới từ 离 chỉ khoảng cách: A + 离 + B + Tính từ (远/近)**
* 你家离公司远吗？(Nǐ jiā lí gōngsī yuǎn ma? - Nhà bạn cách công ty xa không?)
* 离这儿不远有一个饭馆。(Lí zhèr bù yuǎn yǒu yí gè fànguǎn. - Cách đây không xa có một nhà hàng.)
* 机场离公司很远。(Jīchǎng lí gōngsī hěn yuǎn. - Sân bay cách công ty rất xa.)

### Bài 8: 让我想想再告诉你

* **Phó từ 再 (Lại, hẵng - Biểu thị hành động sẽ xảy ra trong tương lai)**
* 明天下午再去吧。(Míngtiān xiàwǔ zài qù ba. - Chiều mai hẵng đi.)
* 看看报纸再告诉我。(Kàn kàn bàozhǐ zài gàosu wǒ. - Xem báo rồi hẵng bảo tôi.)
* 等他回来再打吧。(Děng tā huílái zài dǎ ba. - Đợi ông ấy về hẵng gọi.)


* **Động từ kiêm ngữ 让 (Để, bảo, nhường): 主语 + 让 + Tân ngữ + Động từ**
* 让我想想再告诉你。(Ràng wǒ xiǎng xiǎng zài gàosu nǐ. - Để tôi nghĩ chút rồi nói cho bạn.)
* 我想让他去北京看一看。(Wǒ xiǎng ràng tā qù Běijīng kàn yí kàn. - Tôi muốn bảo ông ấy đi Bắc Kinh xem sao.)
* 让他找服务员。(Ràng tā zhǎo fúwùyuán. - Bảo anh ấy tìm phục vụ.)

### Bài 9: 题太多，我没做完

* **Giới từ 从 (Từ): 从 + Thời gian/Địa điểm**
* 您从几岁开始学习跳舞？(Nín cóng jǐ suì kāishǐ xuéxí tiàowǔ? - Ngài bắt đầu học nhảy từ mấy tuổi?)
* 我从七岁开始跳舞。(Wǒ cóng qī suì kāishǐ tiàowǔ. - Tôi bắt đầu khiêu vũ từ năm 7 tuổi.)
* 从医院去上班。(Cóng yīyuàn qù shàngbān. - Đi làm từ bệnh viện.)

### Bài 10: 别找了，手机在桌子上呢

* **Cấu trúc khuyên ngăn 别... 了 (Đừng... nữa)**
* 别找了。(Bié zhǎo le. - Đừng tìm nữa.)
* 别洗衣服了。(Bié xǐ yīfu le. - Đừng giặt quần áo nữa.)
* 别买西瓜了。(Bié mǎi xīguā le. - Đừng mua dưa hấu nữa.)

### Bài 11: 他比我大三岁

* **Câu so sánh hơn với 比: A + 比 + B + Tính từ (+ Số lượng)**
* 他比我大三岁。(Tā bǐ wǒ dà sān suì. - Cậu ấy lớn hơn tôi 3 tuổi.)
* 今天的西瓜比昨天便宜。(Jīntiān de xīguā bǐ zuótiān piányi. - Dưa hấu hôm nay rẻ hơn hôm qua.)
* 苹果也比昨天便宜一些。(Píngguǒ yě bǐ zuótiān piányi yìxiē. - Táo cũng rẻ hơn hôm qua một chút.)

### Bài 12: 你穿得太少了

* **Bổ ngữ trạng thái với 得: Động từ + 得 + Tính từ / Cụm từ (Đánh giá mức độ của hành động)**
* 你每天起得这么早？(Nǐ měitiān qǐ de zhème zǎo? - Bạn thức dậy sớm thế này à?)
* 她比我起得晚。(Tā bǐ wǒ qǐ de wǎn. - Cô ấy dậy muộn hơn tôi.)
* 你穿得太少了。(Nǐ chuān de tài shǎo le. - Bạn mặc ít quá.)

### Bài 13: 门开着呢

* **Trợ từ động thái 着 biểu thị trạng thái đang duy trì: Chủ ngữ + Động từ + 着**
* 门开着呢。(Mén kāi zhe ne. - Cửa đang mở.)
* 那个拿铅笔的人是谁？ (Nàge ná zhe qiānbǐ de rén shì shéi? - Người đang cầm bút chì kia là ai? - *Trong bài là 拿 nhưng mở rộng chuẩn ngữ pháp là 拿着*)
* 他笑着说话。(Tā xiào zhe shuōhuà. - Anh ấy cười nói chuyện.)

### Bài 14: 你看过那个电影吗

* **Trợ từ động thái 过 biểu thị sự việc đã từng trải qua trong quá khứ: Động từ + 过**
* 你看过那个电影吗？(Nǐ kàn guo nàge diànyǐng ma? - Bạn đã xem phim đó chưa?)
* 听说你去过中国。(Tīngshuō nǐ qù guo Zhōngguó. - Nghe nói bạn đã từng đi Trung Quốc.)
* 我没去过长城。(Wǒ méi qù guo Chángchéng. - Tôi chưa từng đi Trường Thành.)


* **Cấu trúc nhượng bộ 虽然... 但是... (Mặc dù... Nhưng...)**
* 虽然去了很多地方，但是没去过长城。(Suīrán qù le hěnduō dìfang, dànshì méi qù guo Chángchéng. - Mặc dù đi nhiều nơi, nhưng chưa đi Trường Thành.)
* 虽然是晴天，但是很冷。(Suīrán shì qíngtiān, dànshì hěn lěng. - Mặc dù trời nắng, nhưng rất lạnh.)
* 虽然很有意思，但是我没看过。(Suīrán hěn yǒu yìsi, dànshì wǒ méi kàn guo. - Mặc dù rất thú vị, nhưng tôi chưa từng xem.)

### Bài 15: 新年就要到了

* **Cấu trúc chỉ sự việc sắp xảy ra: 就要 / 快要 ... 了 (Sắp... rồi)**
* 新年就要到了。(Xīnnián jiù yào dào le. - Năm mới sắp đến rồi.)
* 新的一年快要到了！(Xīn de yì nián kuàiyào dào le! - Một năm mới sắp đến rồi!)
* 她快要买票了。(Tā kuàiyào mǎi piào le. - Cô ấy sắp mua vé rồi.)
`;

const lines = text.split('\n').map(l => l.trim());
let currentLevel = 0;
let currentLesson = 0;
let currentGrammarPoint = null;
let currentTopicId = '';
const topics = [];

for (const line of lines) {
  if (line.startsWith('## GIÁO TRÌNH HSK 1')) {
    currentLevel = 1;
  } else if (line.startsWith('## GIÁO TRÌNH HSK 2')) {
    currentLevel = 2;
  } else if (line.startsWith('### Bài ')) {
    const match = line.match(/Bài (\d+):/);
    if (match) {
      currentLesson = parseInt(match[1]);
      currentTopicId = `top_hsk${currentLevel}_${currentLesson.toString().padStart(2, '0')}`;
      topics.push({
        topicId: currentTopicId,
        grammarPoints: []
      });
    }
  } else if (line.startsWith('* **')) {
    const titleMatch = line.match(/\* \*\*(.*?)\*\*/);
    if (titleMatch) {
      currentGrammarPoint = {
        title: titleMatch[1].trim(),
        examples: []
      };
      topics[topics.length - 1].grammarPoints.push(currentGrammarPoint);
    }
  } else if (line.startsWith('* ') && currentGrammarPoint) {
    const match = line.match(/\* (.*?)\((.*?) - (.*?)\)/);
    if (match) {
      currentGrammarPoint.examples.push({
        chinese: match[1].trim(),
        pinyin: match[2].trim(),
        vietnamese: match[3].trim()
      });
    }
  }
}

const tsContent = `export interface GrammarExample {
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

export const TOPIC_GRAMMARS: TopicGrammar[] = ${JSON.stringify(topics, null, 2)};
`;

fs.writeFileSync('src/data/grammar.ts', tsContent, 'utf-8');
console.log('Generated grammar.ts');
