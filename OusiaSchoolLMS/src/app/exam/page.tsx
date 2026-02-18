'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { generateExamQuestion, evaluateAnswer, type ExamQuestion } from '@/lib/gemini';
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

type SessionRecord = {
  question: ExamQuestion;
  userAnswer: string;
  isCorrect: boolean;
  feedback: string;
};

type SetupState = {
  subject: string;
  grade: string;
  topic: string;
};

const SUBJECTS = ['英語', '数学', '理科', '社会', '国語'];
const GRADES = ['中学1年', '中学2年', '中学3年', '高校1年', '高校2年', '高校3年'];

const TOPIC_SUGGESTIONS: Record<string, string[]> = {
  英語: ['文法（現在完了形）', '長文読解', '英作文', '語彙・イディオム', '英検2級対策'],
  数学: ['二次方程式', '三角関数', '確率', '数列', '微分・積分'],
  理科: ['化学反応式', '電磁気', '遺伝', '天体', '力学'],
  社会: ['歴史（明治時代）', '地理（日本の地形）', '公民（憲法）', '世界史', '地理（世界）'],
  国語: ['古文読解', '漢文', '現代文読解', '文学史', '文法'],
};

type Phase =
  | 'setup'
  | 'loading_question'
  | 'answering'
  | 'loading_result'
  | 'result'
  | 'session_end';

export default function ExamPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [phase, setPhase] = useState<Phase>('setup');
  const [setup, setSetup] = useState<SetupState>({ subject: '英語', grade: '高校1年', topic: '' });
  const [currentQuestion, setCurrentQuestion] = useState<ExamQuestion | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [result, setResult] = useState<{ isCorrect: boolean; feedback: string } | null>(null);
  const [sessionRecords, setSessionRecords] = useState<SessionRecord[]>([]);
  const [sessionDocId, setSessionDocId] = useState<string | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!loading && !user) router.replace('/login');
  }, [user, loading, router]);

  const startSession = async () => {
    if (!setup.topic.trim()) {
      setError('トピックを入力してください');
      return;
    }
    setError('');
    setPhase('loading_question');
    setSessionRecords([]);

    const docRef = await addDoc(collection(db, 'examSessions'), {
      userId: user!.uid,
      subject: setup.subject,
      grade: setup.grade,
      topic: setup.topic,
      records: [],
      createdAt: serverTimestamp(),
    });
    setSessionDocId(docRef.id);
    await fetchQuestion();
  };

  const fetchQuestion = async () => {
    setPhase('loading_question');
    setUserAnswer('');
    setResult(null);
    setError('');
    try {
      const q = await generateExamQuestion(setup.subject, setup.grade, setup.topic);
      setCurrentQuestion(q);
      setPhase('answering');
    } catch (e) {
      setError('問題の生成に失敗しました。もう一度お試しください。');
      setPhase('setup');
    }
  };

  const submitAnswer = async () => {
    if (!currentQuestion || !userAnswer.trim()) return;
    setPhase('loading_result');
    try {
      const evalResult = await evaluateAnswer(currentQuestion, userAnswer);
      setResult(evalResult);

      const record: SessionRecord = {
        question: currentQuestion,
        userAnswer,
        isCorrect: evalResult.isCorrect,
        feedback: evalResult.feedback,
      };
      const updated = [...sessionRecords, record];
      setSessionRecords(updated);

      if (sessionDocId) {
        await updateDoc(doc(db, 'examSessions', sessionDocId), {
          records: updated.map((r) => ({
            question: r.question.question,
            userAnswer: r.userAnswer,
            isCorrect: r.isCorrect,
          })),
          score: updated.filter((r) => r.isCorrect).length,
        });
      }
      setPhase('result');
    } catch (e) {
      setError('採点に失敗しました。もう一度お試しください。');
      setPhase('answering');
    }
  };

  const endSession = () => setPhase('session_end');

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-gray-400 hover:text-gray-600 transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h1 className="font-bold text-gray-900">試験対策</h1>
          </div>
          {sessionRecords.length > 0 && (
            <div className="text-sm text-gray-500">
              {sessionRecords.filter((r) => r.isCorrect).length} / {sessionRecords.length} 正解
            </div>
          )}
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* Setup Phase */}
        {phase === 'setup' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">問題の設定</h2>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-600 text-sm mb-4">
                {error}
              </div>
            )}

            {/* Subject */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">教科</label>
              <div className="flex flex-wrap gap-2">
                {SUBJECTS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSetup({ ...setup, subject: s, topic: '' })}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      setup.subject === s
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Grade */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">学年</label>
              <div className="flex flex-wrap gap-2">
                {GRADES.map((g) => (
                  <button
                    key={g}
                    onClick={() => setSetup({ ...setup, grade: g })}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      setup.grade === g
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Topic */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                トピック・単元
              </label>
              <input
                type="text"
                value={setup.topic}
                onChange={(e) => setSetup({ ...setup, topic: e.target.value })}
                placeholder="例: 現在完了形"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3"
              />
              {/* Suggestions */}
              {TOPIC_SUGGESTIONS[setup.subject] && (
                <div>
                  <p className="text-xs text-gray-400 mb-2">候補:</p>
                  <div className="flex flex-wrap gap-2">
                    {TOPIC_SUGGESTIONS[setup.subject].map((t) => (
                      <button
                        key={t}
                        onClick={() => setSetup({ ...setup, topic: t })}
                        className="px-3 py-1 bg-blue-50 text-blue-600 text-xs rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={startSession}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md"
            >
              問題を始める
            </button>
          </div>
        )}

        {/* Loading Question */}
        {phase === 'loading_question' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
            <p className="text-gray-500">AIが問題を作成しています...</p>
          </div>
        )}

        {/* Answering Phase */}
        {phase === 'answering' && currentQuestion && (
          <div className="space-y-6">
            {/* Progress */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">
                {setup.subject} | {setup.grade} | {setup.topic}
              </span>
              <span className="ml-auto text-sm font-medium text-blue-600">
                第 {sessionRecords.length + 1} 問
              </span>
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className="flex items-start gap-3 mb-6">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm font-bold">Q</span>
                </div>
                <p className="text-gray-900 text-lg leading-relaxed font-medium">
                  {currentQuestion.question}
                </p>
              </div>

              {/* Multiple Choice */}
              {currentQuestion.type === 'multiple_choice' && currentQuestion.choices && (
                <div className="space-y-3 mb-6">
                  {currentQuestion.choices.map((choice) => (
                    <button
                      key={choice}
                      onClick={() => setUserAnswer(choice.split('. ')[0])}
                      className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all ${
                        userAnswer === choice.split('. ')[0]
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      {choice}
                    </button>
                  ))}
                </div>
              )}

              {/* Short Answer */}
              {currentQuestion.type === 'short_answer' && (
                <div className="mb-6">
                  <textarea
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="回答を入力してください..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={submitAnswer}
                  disabled={!userAnswer.trim()}
                  className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  回答する
                </button>
                <button
                  onClick={endSession}
                  className="px-6 py-3 bg-gray-100 text-gray-600 font-medium rounded-xl hover:bg-gray-200 transition-all"
                >
                  終了
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Loading Result */}
        {phase === 'loading_result' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
            <p className="text-gray-500">採点・解説を準備しています...</p>
          </div>
        )}

        {/* Result Phase */}
        {phase === 'result' && result && currentQuestion && (
          <div className="space-y-6">
            {/* Result Badge */}
            <div
              className={`rounded-2xl p-6 flex items-center gap-4 ${
                result.isCorrect
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-red-50 border border-red-200'
              }`}
            >
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl flex-shrink-0 ${
                  result.isCorrect ? 'bg-green-100' : 'bg-red-100'
                }`}
              >
                {result.isCorrect ? '⭕' : '❌'}
              </div>
              <div>
                <p
                  className={`text-xl font-bold ${
                    result.isCorrect ? 'text-green-700' : 'text-red-700'
                  }`}
                >
                  {result.isCorrect ? '正解！' : '不正解'}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  あなたの回答: {userAnswer} ／ 正解: {currentQuestion.answer}
                </p>
              </div>
            </div>

            {/* Explanation */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-indigo-100 rounded-md flex items-center justify-center text-xs text-indigo-600 font-bold">解</span>
                解説
              </h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{result.feedback}</p>
              <div className="mt-6 pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-500 font-medium mb-2">元の問題の解説:</p>
                <p className="text-gray-600 text-sm leading-relaxed">{currentQuestion.explanation}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={fetchQuestion}
                className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all"
              >
                次の問題へ
              </button>
              <button
                onClick={endSession}
                className="px-6 py-3 bg-gray-100 text-gray-600 font-medium rounded-xl hover:bg-gray-200 transition-all"
              >
                終了
              </button>
            </div>
          </div>
        )}

        {/* Session End */}
        {phase === 'session_end' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center">
            <div className="text-6xl mb-4">
              {sessionRecords.length === 0 ? '📚' : '🎉'}
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">お疲れさまでした！</h2>

            {sessionRecords.length > 0 && (
              <div className="my-8">
                <div className="text-5xl font-bold text-blue-600 mb-1">
                  {sessionRecords.filter((r) => r.isCorrect).length} / {sessionRecords.length}
                </div>
                <p className="text-gray-500">正解数</p>
                <div className="mt-4 h-3 bg-gray-100 rounded-full overflow-hidden max-w-xs mx-auto">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all"
                    style={{
                      width: `${(sessionRecords.filter((r) => r.isCorrect).length / sessionRecords.length) * 100}%`,
                    }}
                  />
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  正答率: {Math.round((sessionRecords.filter((r) => r.isCorrect).length / sessionRecords.length) * 100)}%
                </p>
              </div>
            )}

            {/* Question Review */}
            {sessionRecords.length > 0 && (
              <div className="text-left space-y-3 mb-8 max-h-64 overflow-y-auto">
                {sessionRecords.map((r, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-3 p-3 rounded-xl text-sm ${
                      r.isCorrect ? 'bg-green-50' : 'bg-red-50'
                    }`}
                  >
                    <span>{r.isCorrect ? '⭕' : '❌'}</span>
                    <p className="text-gray-700 line-clamp-2">{r.question.question}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setPhase('setup');
                  setSessionRecords([]);
                  setCurrentQuestion(null);
                }}
                className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all"
              >
                もう一度やる
              </button>
              <Link
                href="/"
                className="flex-1 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-all text-center"
              >
                ホームへ
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
