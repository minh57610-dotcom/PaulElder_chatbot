import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize shared Gemini client
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const SYSTEM_INSTRUCTION = `[VAI TRÒ VÀ MỤC TIÊU]
Bạn là một Chuyên gia Tâm lý Học đường và Tư duy Phản biện, thành thạo mô hình Paul-Elder. Nhiệm vụ của bạn là đồng hành, đối thoại và hướng dẫn học sinh phân tích các vấn đề học tập, xã hội theo phương pháp tư duy phản biện. Bạn có giọng điệu ấm áp, ân cần, tôn trọng, khuyến khích học sinh bộc lộ suy nghĩ một cách tự nhiên mà không sợ bị phán xét.

[AN TOÀN VÀ QUY TẮC BẮT BUỘC - TUYỆT ĐỐI TUÂN THỦ]
1. Ngôn từ và Nội dung: Nếu học sinh sử dụng từ ngữ thô tục, xúc phạm, toxic, chửi thề, hoặc đề cập đến các chủ đề nhạy cảm (Xúc phạm nhóm người yếu thế, phân biệt đối xử, kỳ thị giới tính, tôn giáo, dân tộc, hoàn cảnh sống...), bạn BẮT BUỘC phải dừng bài học và đưa ra cảnh báo duy nhất:
"Bạn đang đi sai hướng, vui lòng sử dụng ngôn từ đúng đắn."
KHÔNG giải thích thêm, KHÔNG thêm lời khuyên dài dòng, CHỈ ĐÚNG MỘT CÂU NÀY. Sau đó chờ học sinh điều chỉnh mới tiếp tục.

2. Phong cách tương tác (TỪNG BƯỚC CÓ TƯƠNG TÁC - SOCRATIC DIALOGUE):
- TUYỆT ĐỐI KHÔNG xả toàn bộ cấu trúc phân tích trong một câu trả lời duy nhất gây ngợp cho học sinh.
- Với mỗi câu hỏi, bài tập hoặc đoạn văn của học sinh, hãy dẫn dắt lần lượt từng phần (hoặc một cụm 1-2 yếu tố trong mô hình Paul-Elder tại một thời điểm).
- Hãy ghi nhận cảm xúc và ý kiến của học sinh trước, sau đó đặt 1 (tối đa 2) câu hỏi gợi mở sắc sảo để học sinh tự suy nghĩ và CHỜ học sinh phản hồi rồi mới chuyển sang bước tiếp theo.
- Hãy dùng ngôn ngữ học đường gần gũi, xưng "thầy/cô" và gọi học sinh là "em".

[DANH SÁCH BÀI HỌC]
Khi học sinh nhắn "Bài 1", "Bài 2", "Bài 3", "Bài 4", "Bài 5" (hoặc bắt đầu một bài):
- Bài học 1: Kĩ năng phân tích nội dung, đáp án của bài tập qua góc nhìn đa chiều. (Giúp bóc tách tại sao đáp án đúng/sai, những giả định ngầm, và góc nhìn khác nhau).
- Bài học 2: Cải thiện kĩ năng đặt câu hỏi rõ ràng, logic, có trình tự thông qua việc cùng AI thảo luận. (Dạy cách phân loại câu hỏi: câu hỏi xác thực thông tin -> câu hỏi phân tích lý do -> câu hỏi đánh giá hệ quả).
- Bài học 3: Học các bước cần thiết theo mô hình Paul-Elder để phân tích đoạn văn, vấn đề xã hội. (Đi lần lượt từng bước qua 8 yếu tố).
- Bài học 4: Học cách đưa ra lời phản biện có ý nghĩa và trình tự. (5 bước: Lắng nghe tóm tắt ý -> Đồng thuận điểm hợp lý -> Phát hiện lỗ hổng/giả định -> Đưa bằng chứng/góc nhìn thay thế -> Đề xuất hướng giải quyết).
- Bài học 5: Cùng thảo luận tự do với AI về một vấn đề xã hội/học tập mà học sinh quan tâm.

[KHUNG KHÁM PHÁ PAUL-ELDER (Sử dụng linh hoạt từng bước khi thảo luận)]
Khi đến bước tổng kết hoặc khi phân tích chuyên sâu một bài tập/vấn đề (đặc biệt ở Bài 3 & Bài 4), bạn sẽ điều phối thảo luận xoay quanh các thành tố:

I. 8 Yếu tố tư duy (Elements of Thought):
1. Mục đích (Purpose) - Mục tiêu chính của tác giả/vấn đề là gì?
2. Câu hỏi then chốt (Question at Issue) - Trọng tâm cần giải quyết là gì?
3. Thông tin (Information) - Có dữ kiện, bằng chứng thực tế nào?
4. Khái niệm (Concepts) - Khái niệm định nghĩa thế nào, có bị nhầm lẫn không?
5. Giả định (Assumptions) - Điều gì đang mặc định là đúng mà chưa chứng minh?
6. Quan điểm (Point of View) - Nhìn từ góc nhìn nào, ai có góc nhìn trái chiều?
7. Suy luận & Giải thích (Interpretation and Inference) - Kết luận rút ra có hợp lý không?
8. Hàm ý & Hệ quả (Implications and Consequences) - Nếu làm vậy thì điều gì sẽ xảy ra tiếp theo?

II. Tiêu chuẩn trí tuệ (Intellectual Standards - Dùng để đánh giá):
Rõ ràng (Clarity), Chính xác (Accuracy), Chi tiết (Precision), Liên quan (Relevance), Chiều sâu (Depth), Chiều rộng (Breadth), Logic (Logic), Tầm quan trọng (Significance), Công bằng (Fairness).

[ĐẶC BIỆT KHI BẮT ĐẦU HOẶC CHUYỂN BÀI]
Khi học sinh chọn hoặc nhập tên bài (Ví dụ: "Bài 1", "Bài 2"...), hãy chào mừng vào bài đó, nêu vắn tắt mục tiêu và đưa ra ngay bước đầu tiên với một câu hỏi khơi gợi thân mật để học sinh bắt đầu suy nghĩ.`;

// Pre-screen filter for instant deterministic safety compliance
const TOXIC_PATTERNS = [
  /\b(đụ|địt|đụ má|đụ mẹ|cặc|lồn|buồi|đéo|đếch|vãi lồn|vãi cặc|đĩ|con đĩ|thằng chó|ngu như chó|chó đẻ|óc chó)\b/i,
  /\b(bê đê|bóng chó|súc vật|bần nông|dân tộc thiểu số ngu|khuyết tật óc|đồ tàn tật|ngu xuẩn|chết tiệt)\b/i,
  /\b(fuck|bitch|cunt|asshole|motherfucker|nigger|retard|faggot)\b/i,
];

function checkToxicContent(text: string): boolean {
  if (!text) return false;
  return TOXIC_PATTERNS.some((pattern) => pattern.test(text));
}

// Coze Bot integration with fallback
async function callCozeBot(query: string): Promise<string | null> {
  const token = process.env.COZE_API_KEY || 'pat_zXWgZtN312tMN5ivGdFkpEKzC9qiiVQLT26RoUbZ2mbz6L3b9AvMFCfRX6WNoQOR';
  const botId = process.env.COZE_BOT_ID || '7693521246612750389';

  try {
    const res = await fetch('https://api.coze.com/open_api/v2/chat', {
      method: 'POST',
      signal: AbortSignal.timeout(3000),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bot_id: botId,
        user: 'hoc_sinh_test',
        query: query,
        stream: false,
      }),
    });

    const data = (await res.json()) as {
      code?: number;
      messages?: Array<{ role?: string; type?: string; content?: string }>;
    };

    if (data.code === 0 && Array.isArray(data.messages)) {
      const answer = data.messages.find(
        (m) => m.type === 'answer' && m.role === 'assistant'
      );
      if (answer?.content) {
        return answer.content;
      }
    }
  } catch (err) {
    console.warn('[Coze API Error]:', err);
  }
  return null;
}

// Multi-model fallback with retry for high-availability Socratic mentor
async function generateContentWithFallback(
  contents: { role: string; parts: { text: string }[] }[],
  systemInstruction: string
): Promise<string> {
  const candidateModels = ['gemini-3.1-flash-lite', 'gemini-3.8-flash'];
  let lastError: unknown = null;

  for (const model of candidateModels) {
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model: model,
          contents: contents,
          config: {
            systemInstruction: systemInstruction,
            temperature: 0.7,
            topP: 0.9,
          },
        });
        if (response.text) {
          return response.text;
        }
      } catch (err: unknown) {
        lastError = err;
        const errObj = err as { status?: number; message?: string };
        console.warn(`[Gemini API] Attempt ${attempt} on ${model} failed:`, errObj?.status || errObj?.message?.slice(0, 100));

        // If quota exceeded (429), break immediately to test the next model
        if (
          errObj?.status === 429 ||
          errObj?.message?.includes('429') ||
          errObj?.message?.includes('Quota exceeded')
        ) {
          break;
        }

        // On transient spikes (503/500), delay and retry
        if (attempt < 3) {
          await new Promise((r) => setTimeout(r, 700 * attempt));
        }
      }
    }
  }

  throw lastError || new Error('Không thể kết nối với dịch vụ Gemini');
}

// Contextual Socratic fallback if all API calls temporarily fail
function getContextualSocraticFallback(userText: string, currentLesson: string | null): string {
  const lower = userText.toLowerCase();

  if (lower.includes('bài 1') || currentLesson === 'Bài 1') {
    return `Chào mừng em đến với **Bài học 1: Kĩ năng phân tích nội dung, đáp án của bài tập qua góc nhìn đa chiều**! 🎯

Trong quá trình làm bài tập, chúng ta rất dễ bị cuốn vào việc "chọn đáp án để lấy điểm" mà quên mất bóc tách các giả định ẩn sâu bên dưới.

Để bắt đầu, em có đang băn khoăn về một câu hỏi trắc nghiệm hoặc bài tập cụ thể nào (Văn, Sử, GDCD, Toán...) có đáp án gây nhiều tranh cãi không? Hoặc em muốn thầy/cô đưa ra một bài tập mẫu để chúng ta cùng mổ xẻ đa chiều?`;
  }

  if (lower.includes('bài 2') || currentLesson === 'Bài 2') {
    return `Chào mừng em đến với **Bài học 2: Cải thiện kĩ năng đặt câu hỏi rõ ràng, logic, có trình tự**! ❓

Một câu hỏi sắc bén có sức mạnh khai mở gấp mười lần một câu trả lời vội vã. Thay vì tự hỏi những câu bế tắc như *"Tại sao mình luôn gặp rắc rối?"*, chúng ta sẽ học cách đặt chuỗi 3 tầng câu hỏi: **Xác thực dữ kiện -> Phân tích nguyên nhân cốt lõi -> Đánh giá hệ quả**.

Em đang gặp phải một tình huống khó khăn nào trong học tập hoặc mối quan hệ bạn bè lúc này cần cùng thầy/cô tháo gỡ không?`;
  }

  if (lower.includes('bài 3') || currentLesson === 'Bài 3') {
    return `Chào mừng em đến với **Bài học 3: Học các bước theo mô hình Paul-Elder để phân tích đoạn văn & vấn đề xã hội**! 🏛️

Mô hình Paul-Elder bao gồm 8 mắt xích tư duy hoàn chỉnh. Để không bị ngợp, thầy/cô sẽ đồng hành cùng em bóc tách lần lượt từng yếu tố một.

Bước đầu tiên: Chúng ta luôn bắt đầu từ **1. Mục đích (Purpose)** và **2. Câu hỏi then chốt (Question at Issue)**.
Em muốn chọn phân tích chủ đề: *"Có nên cấm hoàn toàn điện thoại trong trường học?"* hay một vấn đề xã hội nào khác mà em đang quan tâm?`;
  }

  if (lower.includes('bài 4') || currentLesson === 'Bài 4') {
    return `Chào mừng em đến với **Bài học 4: Học cách đưa ra lời phản biện có ý nghĩa và trình tự**! ⚔️

Phản biện văn minh là nghệ thuật cùng đi tìm chân lý qua 5 bước: Lắng nghe tóm tắt ý -> Tìm điểm đồng thuận -> Bóc tách giả định mong manh -> Cung cấp góc nhìn & bằng chứng mới -> Đề xuất giải pháp.

Em muốn cùng thầy/cô tập phản biện ý kiến: *"Học đại học là con đường duy nhất để thành công"* hay *"Trí tuệ nhân tạo (AI) sẽ làm học sinh mất khả năng sáng tạo"?*`;
  }

  if (lower.includes('bài 5') || currentLesson === 'Bài 5') {
    return `Chào mừng em đến với **Bài học 5: Thảo luận tự do về một vấn đề xã hội/học tập em quan tâm**! 💡

Đây là không gian mở hoàn toàn dành riêng cho em. Bất kỳ áp lực học tập, định hướng nghề nghiệp tương lai, hay vấn đề tâm lý nào em trăn trở, thầy/cô đều ở đây lắng nghe và cùng em bóc tách logic.

Hôm nay em muốn chia sẻ về điều gì nhất? Thầy/cô đang lắng nghe em đây.`;
  }

  return `Thầy/cô đã lắng nghe góc nhìn của em về vấn đề này. 

Dưới lăng kính tư duy phản biện Paul-Elder, em nghĩ điều quan trọng nhất đang thúc đẩy quan điểm này là gì: là **dữ liệu thực tế (Information)** mà em quan sát được, hay xuất phát từ một **giả định ngầm (Assumption)** mà chúng ta chưa kiểm chứng?

Em hãy chia sẻ thêm suy nghĩ của mình nhé!`;
}

// API endpoint for chat
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { messages, currentLesson } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Danh sách tin nhắn không hợp lệ' });
    }

    const lastMessage = messages[messages.length - 1];
    const userText = lastMessage?.text || '';

    // Step 1: Pre-screen check for toxicity/offensive content
    if (checkToxicContent(userText)) {
      return res.json({
        text: 'Bạn đang đi sai hướng, vui lòng sử dụng ngôn từ đúng đắn.',
        isWarning: true,
        activeElements: [],
      });
    }

    // Step 2: Format conversation contents for Gemini
    const contents = messages.map((m: { sender: string; text: string }) => ({
      role: m.sender === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }],
    }));

    let enrichedSystemInstruction = SYSTEM_INSTRUCTION;
    if (currentLesson) {
      enrichedSystemInstruction += `\n[NGỮ CẢNH HIỆN TẠI]: Học sinh đang học ${currentLesson}. Hãy bám sát mục tiêu của ${currentLesson} và dẫn dắt từng bước ngắn gọn, kiên nhẫn.`;
    }

    let replyText = '';
    // Try Coze Bot if active and published
    const cozeAnswer = await callCozeBot(userText);
    if (cozeAnswer) {
      replyText = cozeAnswer;
    } else {
      try {
        replyText = await generateContentWithFallback(contents, enrichedSystemInstruction);
      } catch (genError) {
        console.error('[Gemini API Fallback Triggered]:', genError);
        replyText = getContextualSocraticFallback(userText, currentLesson);
      }
    }

    // Double check if model generated safety warning
    const isWarning = replyText.includes('Bạn đang đi sai hướng, vui lòng sử dụng ngôn từ đúng đắn.');

    // Heuristically detect which Paul-Elder elements are currently in play to highlight in the UI
    const activeElements: string[] = [];
    const lower = replyText.toLowerCase();
    if (lower.includes('mục đích') || lower.includes('mục tiêu') || lower.includes('ý định')) activeElements.push('purpose');
    if (lower.includes('câu hỏi') || lower.includes('vấn đề cốt lõi') || lower.includes('trọng tâm')) activeElements.push('question');
    if (lower.includes('thông tin') || lower.includes('dữ liệu') || lower.includes('bằng chứng') || lower.includes('số liệu')) activeElements.push('information');
    if (lower.includes('khái niệm') || lower.includes('định nghĩa') || lower.includes('lý thuyết')) activeElements.push('concepts');
    if (lower.includes('giả định') || lower.includes('mặc định') || lower.includes('tiền đề')) activeElements.push('assumptions');
    if (lower.includes('quan điểm') || lower.includes('góc nhìn') || lower.includes('khía cạnh')) activeElements.push('pointOfView');
    if (lower.includes('suy luận') || lower.includes('kết luận') || lower.includes('diễn giải')) activeElements.push('inference');
    if (lower.includes('hàm ý') || lower.includes('hệ quả') || lower.includes('kết quả tiếp theo') || lower.includes('hậu quả')) activeElements.push('implications');

    return res.json({
      text: replyText,
      isWarning: isWarning,
      activeElements: activeElements,
    });
  } catch (err: unknown) {
    console.error('Error in /api/chat:', err);
    const errorMessage = err instanceof Error ? err.message : 'Lỗi không xác định khi kết nối với mô hình.';
    return res.status(500).json({
      error: 'Không thể kết nối với chuyên gia tư vấn. Vui lòng thử lại sau ít giây.',
      details: errorMessage,
    });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: process.env.DISABLE_HMR !== 'true' },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      if (req.path.startsWith('/api')) {
        return res.status(404).json({ error: 'API route not found' });
      }
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  let portFromArg: number | null = null;
  for (let i = 0; i < process.argv.length; i++) {
    const arg = process.argv[i];
    if (arg === '--port' && process.argv[i + 1]) {
      portFromArg = parseInt(process.argv[i + 1], 10);
    } else if (arg.startsWith('--port=')) {
      portFromArg = parseInt(arg.split('=')[1], 10);
    }
  }
  const serverPort = portFromArg || (isDev ? 3000 : (Number(process.env.PORT) || 3000));
  app.listen(serverPort, '0.0.0.0', () => {
    console.log(`Server listening on port ${serverPort} (${isDev ? 'development' : 'production'})`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
