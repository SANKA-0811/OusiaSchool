import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GEMINI_API_KEY || ''
);

export const getGeminiModel = () =>
  genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export type ExamQuestion = {
  question: string;
  type: 'multiple_choice' | 'short_answer';
  choices?: string[];
  answer: string;
  explanation: string;
};

export async function generateExamQuestion(
  subject: string,
  grade: string,
  topic: string
): Promise<ExamQuestion> {
  const model = getGeminiModel();

  const prompt = `あなたは${subject}の${grade}レベルの試験問題を作成する先生です。
「${topic}」に関する問題を1問作成してください。

必ず以下のJSON形式のみで返答してください（他のテキストは含めないでください）:
{
  "question": "問題文をここに書く",
  "type": "multiple_choice",
  "choices": ["A. 選択肢1", "B. 選択肢2", "C. 選択肢3", "D. 選択肢4"],
  "answer": "A",
  "explanation": "解説をここに書く（なぜその答えになるか、関連する知識も含めて丁寧に説明する）"
}

問題は${grade}の学習指導要領に沿った内容にしてください。
解説は丁寧に、学習者が理解を深められるように書いてください。`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('AI からの応答を解析できませんでした');

  return JSON.parse(jsonMatch[0]) as ExamQuestion;
}

export async function evaluateAnswer(
  question: ExamQuestion,
  userAnswer: string
): Promise<{ isCorrect: boolean; feedback: string }> {
  const model = getGeminiModel();

  const prompt = `以下の問題と回答を評価してください。

問題: ${question.question}
正解: ${question.answer}
生徒の回答: ${userAnswer}

必ず以下のJSON形式のみで返答してください:
{
  "isCorrect": true または false,
  "feedback": "回答へのフィードバック（正解の場合は褒めつつ関連知識を補足、不正解の場合は正解への導き方を丁寧に説明）"
}`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    const isCorrect =
      userAnswer.trim().toLowerCase() === question.answer.trim().toLowerCase();
    return {
      isCorrect,
      feedback: isCorrect
        ? '正解です！' + question.explanation
        : '不正解です。正解は ' + question.answer + 'です。' + question.explanation,
    };
  }

  return JSON.parse(jsonMatch[0]);
}

export type ChatMessage = {
  role: 'user' | 'model';
  parts: string;
};

export async function chatWithMentor(
  vision: string,
  currentChallenge: string,
  history: ChatMessage[],
  userMessage: string
): Promise<string> {
  const model = getGeminiModel();

  const systemContext = `あなたはOusia Schoolの探求学習メンターです。
生徒のビジョン（大きな問い・夢）: ${vision}
現在取り組んでいる課題: ${currentChallenge}

あなたの役割:
- ソクラテス式問答法で生徒の思考を深める
- 直接答えを与えず、問いを立てて自分で考えさせる
- 生徒の気づきを引き出し、探求心を育てる
- 必要に応じて関連する知識や視点を提供する
- 中学・高校生にわかりやすい言葉で話す
- 励ましながら、批判的思考を促す

返答は200文字以内で、簡潔に。問いかけで終わると良い。`;

  const chatHistory = history.map((msg) => ({
    role: msg.role,
    parts: [{ text: msg.parts }],
  }));

  const chat = model.startChat({
    history: chatHistory,
    systemInstruction: systemContext,
  });

  const result = await chat.sendMessage(userMessage);
  return result.response.text();
}
