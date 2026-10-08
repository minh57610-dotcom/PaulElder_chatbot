import { PaulElderElement, IntellectualStandard, LessonInfo } from '../types/paulElder';

export const PAUL_ELDER_ELEMENTS: PaulElderElement[] = [
  {
    id: 'purpose',
    name: 'Mục đích',
    englishName: 'Purpose',
    color: 'from-blue-500 to-indigo-600',
    iconName: 'Target',
    description: 'Mọi tư duy đều hướng tới một mục đích, ý định hoặc mục tiêu nhất định.',
    guideQuestions: [
      'Mục tiêu chính của người nói / tác giả ở đây là gì?',
      'Mục đích của việc giải bài tập này để làm gì?',
      'Mục đích đó có rõ ràng, thực tế và chính đáng không?'
    ],
    example: 'Ví dụ: Bài viết muốn thuyết phục học sinh quản lý thời gian hay chỉ đang quảng cáo một ứng dụng?'
  },
  {
    id: 'question',
    name: 'Câu hỏi then chốt',
    englishName: 'Question at Issue',
    color: 'from-amber-500 to-orange-600',
    iconName: 'HelpCircle',
    description: 'Mọi tư duy đều là nỗ lực tìm câu trả lời cho một câu hỏi hoặc giải quyết vấn đề.',
    guideQuestions: [
      'Vấn đề cốt lõi nhất cần giải quyết là gì?',
      'Câu hỏi này có bị nhầm lẫn với vấn đề khác không?',
      'Có thể chia nhỏ câu hỏi này thành các phần dễ xử lý hơn không?'
    ],
    example: 'Ví dụ: "Học sinh có nên dùng điện thoại không?" hay "Làm sao để dùng điện thoại mà không xao nhãng học tập?"'
  },
  {
    id: 'information',
    name: 'Thông tin & Dữ liệu',
    englishName: 'Information',
    color: 'from-emerald-500 to-teal-600',
    iconName: 'Database',
    description: 'Dữ liệu, sự kiện, quan sát, kinh nghiệm và bằng chứng dùng để phân tích.',
    guideQuestions: [
      'Những dữ kiện, số liệu hay bằng chứng nào đã được cung cấp?',
      'Nguồn thông tin này có đáng tin cậy và khách quan không?',
      'Chúng ta còn thiếu dữ liệu quan trọng nào trước khi kết luận?'
    ],
    example: 'Ví dụ: Số liệu khảo sát 500 học sinh trường A có thể đại diện cho toàn bộ học sinh cả nước không?'
  },
  {
    id: 'concepts',
    name: 'Khái niệm & Định nghĩa',
    englishName: 'Concepts',
    color: 'from-purple-500 to-pink-600',
    iconName: 'BookOpen',
    description: 'Các lý thuyết, định nghĩa, quy luật, mô hình tư duy định hình suy nghĩ.',
    guideQuestions: [
      'Từ khóa hoặc khái niệm chính ở đây được định nghĩa như thế nào?',
      'Chúng ta và người khác có đang hiểu khái niệm này theo cùng một nghĩa không?',
      'Có sự nhầm lẫn giữa hai khái niệm tương tự nhau không?'
    ],
    example: 'Ví dụ: Phân biệt giữa "thành công" (định nghĩa theo xã hội hay theo hạnh phúc cá nhân).'
  },
  {
    id: 'assumptions',
    name: 'Giả định ngầm',
    englishName: 'Assumptions',
    color: 'from-rose-500 to-red-600',
    iconName: 'EyeOff',
    description: 'Những niềm tin hoặc tiền đề được coi là hiển nhiên đúng mà chưa kiểm chứng.',
    guideQuestions: [
      'Tác giả đang ngầm coi điều gì là hiển nhiên đúng?',
      'Nếu giả định đó sai thì lập luận sẽ ra sao?',
      'Bản thân mình có đang mang thành kiến hay định kiến nào từ trước không?'
    ],
    example: 'Ví dụ: Giả định rằng "người học giỏi toán thì tự động có tư duy logic tốt hơn".'
  },
  {
    id: 'pointOfView',
    name: 'Quan điểm & Góc nhìn',
    englishName: 'Point of View',
    color: 'from-cyan-500 to-blue-600',
    iconName: 'Compass',
    description: 'Khung tham chiếu, góc nhìn, vị thế và hệ giá trị mà từ đó vấn đề được xem xét.',
    guideQuestions: [
      'Góc nhìn này xuất phát từ vị thế của ai (học sinh, phụ huynh, thầy cô)?',
      'Nếu đứng ở vị thế người phản đối thì họ sẽ thấy điều gì?',
      'Chúng ta đã xem xét đầy đủ các khía cạnh kinh tế, tâm lý, văn hóa chưa?'
    ],
    example: 'Ví dụ: Quy định đồng phục dưới góc nhìn quản lý trường học khác với góc nhìn thể hiện cá tính của học sinh.'
  },
  {
    id: 'inference',
    name: 'Suy luận & Kết luận',
    englishName: 'Interpretation & Inference',
    color: 'from-violet-500 to-purple-700',
    iconName: 'GitFork',
    description: 'Cách chúng ta kết nối dữ kiện để rút ra kết luận và diễn giải ý nghĩa.',
    guideQuestions: [
      'Kết luận này có thực sự bắt nguồn từ bằng chứng đã có không?',
      'Có kết luận nào khác cũng có thể giải thích thỏa đáng cho dữ kiện này không?',
      'Suy luận này có phạm lỗi ngụy biện logic nào không?'
    ],
    example: 'Ví dụ: Trời mưa và đường ướt, nhưng đường ướt không có nghĩa chắc chắn là do trời mưa (có thể do xe rửa đường).'
  },
  {
    id: 'implications',
    name: 'Hàm ý & Hệ quả',
    englishName: 'Implications & Consequences',
    color: 'from-amber-600 to-yellow-600',
    iconName: 'Sparkles',
    description: 'Hậu quả và tác động phát sinh nếu áp dụng kết luận hoặc chính sách đó.',
    guideQuestions: [
      'Nếu chúng ta hành động theo kết luận này thì điều gì sẽ xảy ra tiếp theo?',
      'Hệ quả ngắn hạn và hệ quả dài hạn là gì?',
      'Có hệ quả tiêu cực ngoài ý muốn nào cần lường trước không?'
    ],
    example: 'Ví dụ: Cấm triệt để điện thoại có thể dẫn đến việc học sinh lén lút sử dụng hoặc mất cơ hội học kỹ năng tự chủ số.'
  }
];

export const INTELLECTUAL_STANDARDS: IntellectualStandard[] = [
  {
    id: 'clarity',
    name: 'Rõ ràng',
    englishName: 'Clarity',
    question: 'Em có thể giải thích chi tiết hơn hoặc cho một ví dụ minh họa không?',
    description: 'Cổng vào của tư duy. Nếu phát biểu mơ hồ thì không ai có thể biết nó có chính xác hay liên quan không.'
  },
  {
    id: 'accuracy',
    name: 'Chính xác',
    englishName: 'Accuracy',
    question: 'Làm thế nào để chúng ta kiểm chứng xem điều này có đúng sự thật không?',
    description: 'Một phát biểu có thể rõ ràng nhưng lại sai sự thật (Ví dụ: "Hầu hết các chú chó đều nặng hơn 150kg").'
  },
  {
    id: 'precision',
    name: 'Chi tiết & Cụ thể',
    englishName: 'Precision',
    question: 'Em có thể đưa ra con số, chi tiết hoặc định lượng cụ thể hơn không?',
    description: 'Đưa ra chi tiết chính xác thay vì chỉ nói chung chung (Ví dụ: "Em bị quá tải bài tập" -> "Em có 4 bài tập lớn hạn trong tối nay").'
  },
  {
    id: 'relevance',
    name: 'Tính liên quan',
    englishName: 'Relevance',
    question: 'Ý kiến này kết nối trực tiếp thế nào tới câu hỏi chúng ta đang bàn?',
    description: 'Một luận điểm có thể đúng nhưng lại lạc đề hoặc không giúp giải quyết vấn đề cốt lõi.'
  },
  {
    id: 'depth',
    name: 'Chiều sâu',
    englishName: 'Depth',
    question: 'Câu trả lời này đã giải quyết những phức tạp tiềm ẩn bên dưới chưa?',
    description: 'Nhìn nhận tính phức tạp, không đơn giản hóa vấn đề lớn thành câu trả lời sáo rỗng bề nổi.'
  },
  {
    id: 'breadth',
    name: 'Chiều rộng',
    englishName: 'Breadth',
    question: 'Chúng ta có cần xem xét quan điểm khác nữa không?',
    description: 'Xem xét nhiều góc nhìn, không thiên vị góc nhìn một chiều.'
  },
  {
    id: 'logic',
    name: 'Tính logic',
    englishName: 'Logic',
    question: 'Các ý kiến này kết hợp lại có hợp lý và không mâu thuẫn lẫn nhau không?',
    description: 'Suy nghĩ nhất quán, tiền đề dẫn tới kết luận hợp lý không gượng ép.'
  },
  {
    id: 'significance',
    name: 'Tầm quan trọng',
    englishName: 'Significance',
    question: 'Đây có phải là ý quan trọng nhất trong toàn bộ vấn đề không?',
    description: 'Tập trung vào yếu tố cốt lõi thay vì sa đà vào những tiểu tiết không đáng kể.'
  },
  {
    id: 'fairness',
    name: 'Tính công bằng',
    englishName: 'Fairness',
    question: 'Chúng ta có đang khách quan, không bị lợi ích cá nhân hay định kiến chi phối?',
    description: 'Đối xử bình đẳng với mọi góc nhìn, không thiên vị định kiến cá nhân.'
  }
];

export const LESSONS: LessonInfo[] = [
  {
    id: 1,
    code: 'Bài 1',
    title: 'Phân tích nội dung, đáp án bài tập qua góc nhìn đa chiều',
    subtitle: 'Vượt qua tư duy một chiều, khám phá tại sao một đáp án đúng/sai và những giả định đằng sau',
    objective: 'Giúp học sinh không chỉ học thuộc lòng đáp án mà biết cách phân tích câu hỏi, bóc tách giả định và nhìn nhận từ nhiều góc nhìn khác nhau.',
    paulElderFocus: ['question', 'information', 'assumptions', 'pointOfView'],
    recommendedTopics: [
      {
        title: 'Phân tích câu hỏi trắc nghiệm gây tranh cãi',
        description: 'Bóc tách một câu hỏi trắc nghiệm Văn học hoặc Lịch sử có nhiều hơn một cách hiểu',
        prompt: 'Bài 1: Em muốn cùng thầy/cô phân tích một câu hỏi trắc nghiệm có đáp án gây băn khoăn: "Ý nghĩa hình tượng nhân vật Tràng trong Vợ nhặt là gì?". Em thấy các đáp án đều có vẻ đúng một phần.'
      },
      {
        title: 'Bài toán thực tế về chọn nghề',
        description: 'Nên chọn ngành theo đam mê hay theo thu nhập thị trường lao động?',
        prompt: 'Bài 1: Em đang phân vân giữa chọn ngành học theo sở thích nghệ thuật hay chọn ngành công nghệ thông tin vì cơ hội việc làm cao. Nhờ thầy/cô hướng dẫn phân tích đa chiều giúp em.'
      }
    ]
  },
  {
    id: 2,
    code: 'Bài 2',
    title: 'Cải thiện kĩ năng đặt câu hỏi rõ ràng, logic, có trình tự',
    subtitle: 'Nghệ thuật đặt câu hỏi sâu sắc để dẫn dắt tư duy thay vì hỏi những câu bế tắc',
    objective: 'Học sinh học cách xây dựng chuỗi câu hỏi có trình tự (Từ câu hỏi xác minh sự thật -> Câu hỏi phân tích nguyên nhân -> Câu hỏi đánh giá hệ quả).',
    paulElderFocus: ['question', 'concepts', 'logic'],
    recommendedTopics: [
      {
        title: 'Đặt câu hỏi khi gặp áp lực thi cử và điểm số',
        description: 'Chuyển từ câu hỏi bế tắc "Sao mình học dốt thế?" thành chuỗi câu hỏi mang tính xây dựng',
        prompt: 'Bài 2: Thầy/cô ơi, khi em bị điểm kém môn Toán, em hay tự dằn vặt "Tại sao mình luôn thất bại?". Làm sao em đặt lại câu hỏi rõ ràng và logic hơn để tháo gỡ vấn đề này ạ?'
      },
      {
        title: 'Đặt câu hỏi giải quyết mâu thuẫn trong nhóm bạn',
        description: 'Tập đặt câu hỏi trung lập, không phán xét để hiểu bạn bè khi làm việc nhóm',
        prompt: 'Bài 2: Nhóm em đang lục đục vì một bạn không nộp phần việc đúng hạn. Em nên đặt câu hỏi thế nào với bạn để hiểu rõ nguyên nhân mà không biến thành cuộc cãi vã?'
      }
    ]
  },
  {
    id: 3,
    code: 'Bài 3',
    title: 'Học các bước theo mô hình Paul-Elder để phân tích đoạn văn & vấn đề xã hội',
    subtitle: 'Lộ trình 8 yếu tố tư duy (Mục đích -> Câu hỏi -> Thông tin -> Khái niệm -> Giả định -> Quan điểm -> Suy luận -> Hệ quả)',
    objective: 'Nắm vững và thực hành toàn diện 8 yếu tố tư duy Paul-Elder vào việc mổ xẻ một bài viết, tin tức hoặc vấn đề xã hội nóng bỏng.',
    paulElderFocus: ['purpose', 'question', 'information', 'concepts', 'assumptions', 'pointOfView', 'inference', 'implications'],
    recommendedTopics: [
      {
        title: 'Chủ đề: Có nên cấm hoàn toàn điện thoại thông minh trong trường học?',
        description: 'Phân tích đa diện giữa lợi ích tập trung và nhu cầu tiếp cận công nghệ học tập',
        prompt: 'Bài 3: Em muốn áp dụng mô hình Paul-Elder để phân tích vấn đề: "Nhiều trường học ban hành quy định cấm học sinh sử dụng điện thoại tuyệt đối trong giờ học lẫn giờ ra chơi".'
      },
      {
        title: 'Chủ đề: Mạng xã hội và chứng sợ bỏ lỡ (FOMO) ở giới trẻ',
        description: 'Bóc tách văn hóa so sánh bản thân trên Instagram/TikTok qua 8 yếu tố tư duy',
        prompt: 'Bài 3: Em muốn phân tích đoạn văn: "Mạng xã hội tạo ra ảo tưởng về một cuộc sống hoàn hảo của người khác, khiến thanh thiếu niên ngày càng tự ti và cô đơn hơn".'
      }
    ]
  },
  {
    id: 4,
    code: 'Bài 4',
    title: 'Học cách đưa ra lời phản biện có ý nghĩa và trình tự',
    subtitle: 'Kỹ năng phản biện văn minh, tôn trọng người khác, dựa trên bằng chứng và tiêu chuẩn trí tuệ',
    objective: 'Giúp học sinh rèn luyện cấu trúc phản biện 5 bước: 1. Lắng nghe và tóm tắt lại ý đối phương (tránh bóp méo); 2. Chỉ ra điểm đồng tình; 3. Chỉ ra điểm hổng logic/giả định; 4. Đưa bằng chứng thay thế; 5. Mời thảo luận tiếp.',
    paulElderFocus: ['assumptions', 'inference', 'implications', 'pointOfView'],
    recommendedTopics: [
      {
        title: 'Phản biện ý kiến: "Học đại học là con đường duy nhất để thành công"',
        description: 'Tập phản biện một định kiến xã hội phổ biến một cách thuyết phục và thấu cảm',
        prompt: 'Bài 4: Bố mẹ và nhiều người thường bảo em rằng: "Không vào được đại học công lập top đầu thì sau này coi như bỏ đi". Em muốn học cách phản biện lại quan điểm này một cách lễ phép, logic và sâu sắc.'
      },
      {
        title: 'Phản biện ý kiến: "Trí tuệ nhân tạo (AI) sẽ khiến học sinh lười suy nghĩ và mất đi khả năng sáng tạo"',
        description: 'Xây dựng lập luận phản biện đa chiều về vai trò của AI trong giáo dục',
        prompt: 'Bài 4: Có ý kiến cho rằng "Dùng AI như ChatGPT hay Gemini trong học tập chỉ làm học sinh ỷ lại và thoái hóa tư duy". Em muốn cùng thầy/cô xây dựng một bài phản biện mạch lạc cho luận điểm này.'
      }
    ]
  },
  {
    id: 5,
    code: 'Bài 5',
    title: 'Cùng thảo luận tự do với AI về một vấn đề xã hội/học tập quan tâm',
    subtitle: 'Không gian mở để học sinh mang bất kỳ trăn trở, suy tư nào đến cùng mổ xẻ dưới ánh sáng tư duy phản biện',
    objective: 'Áp dụng tổng hòa tư duy phản biện và đồng hành tâm lý vào câu chuyện riêng của học sinh.',
    paulElderFocus: ['purpose', 'question', 'assumptions', 'implications', 'pointOfView'],
    recommendedTopics: [
      {
        title: 'Áp lực đồng trang lứa (Peer Pressure) và nỗi sợ bị cô lập',
        description: 'Làm thế nào để vừa là chính mình vừa hòa nhập với tập thể?',
        prompt: 'Bài 5: Thầy/cô ơi, em thấy bạn bè xung quanh ai cũng có thành tích khủng hoặc chạy theo các xu hướng đắt tiền. Đôi lúc em thấy mình lạc lõng và áp lực kinh khủng, chúng ta có thể cùng mổ xẻ tâm lý này không ạ?'
      },
      {
        title: 'Sự cân bằng giữa kỳ vọng của gia đình và ước mơ cá nhân',
        description: 'Đối thoại thấu cảm và tìm giải pháp khi có sự xung đột thế hệ',
        prompt: 'Bài 5: Em muốn thảo luận về việc làm sao để giải quyết mâu thuẫn giữa định hướng của bố mẹ (muốn em theo ngành y tế ổn định) và đam mê thiết kế đồ họa của bản thân.'
      }
    ]
  }
];

export const WELCOME_MESSAGE = `Chào em! Thầy/cô là **Chuyên gia Tâm lý Học đường & Tư duy Phản biện**, người sẽ đồng hành cùng em rèn luyện khả năng quan sát sâu sắc và tư duy logic theo **mô hình Paul-Elder**.

Ở đây, chúng ta không tìm kiếm câu trả lời "đúng máy móc", mà cùng nhau tháo gỡ từng nút thắt, khám phá các góc nhìn đa chiều và xây dựng lập luận vững chắc.

Thầy/cô đã chuẩn bị 5 bài học tương tác để em rèn luyện:
- 🎯 **Bài 1:** Kĩ năng phân tích nội dung, đáp án của bài tập qua góc nhìn đa chiều.
- ❓ **Bài 2:** Cải thiện kĩ năng đặt câu hỏi rõ ràng, logic, có trình tự thông qua việc cùng AI thảo luận.
- 🏛️ **Bài 3:** Học các bước cần thiết theo mô hình Paul-Elder để phân tích đoạn văn, vấn đề xã hội.
- ⚔️ **Bài 4:** Học cách đưa ra lời phản biện có ý nghĩa và trình tự.
- 💡 **Bài 5:** Cùng thảo luận tự do với AI về một vấn đề xã hội/học tập mà em quan tâm.

Em muốn chúng ta bắt đầu với bài học nào hôm nay? Em có thể nhấn chọn một bài ở trên, hoặc nhắn cho thầy/cô (Ví dụ: **Bài 1**)!`;
