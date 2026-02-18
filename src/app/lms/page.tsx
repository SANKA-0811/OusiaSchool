'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

type ExamSessionSummary = {
  id: string;
  subject: string;
  grade: string;
  topic: string;
  score: number;
  total: number;
  createdAt: Date;
};

type InquiryProjectSummary = {
  id: string;
  title: string;
  vision: string;
  messageCount: number;
  updatedAt: Date;
};

type Stats = {
  totalExamQuestions: number;
  totalCorrect: number;
  totalInquiryProjects: number;
  totalMessages: number;
};

export default function LMSDashboard() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  const [recentExams, setRecentExams] = useState<ExamSessionSummary[]>([]);
  const [recentProjects, setRecentProjects] = useState<InquiryProjectSummary[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/lms/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) loadDashboardData();
  }, [user]);

  const loadDashboardData = async () => {
    setDataLoading(true);
    try {
      // 最近の試験セッション（最大3件）
      const examQ = query(
        collection(db, 'examSessions'),
        where('userId', '==', user!.uid),
        orderBy('createdAt', 'desc'),
        limit(3)
      );
      const examSnap = await getDocs(examQ);
      const exams: ExamSessionSummary[] = examSnap.docs.map((d) => {
        const data = d.data();
        const records = data.records || [];
        return {
          id: d.id,
          subject: data.subject,
          grade: data.grade,
          topic: data.topic,
          score: data.score || 0,
          total: records.length,
          createdAt: data.createdAt?.toDate() || new Date(),
        };
      });
      setRecentExams(exams);

      // 最近の探求プロジェクト（最大3件）
      const projQ = query(
        collection(db, 'inquiryProjects'),
        where('userId', '==', user!.uid),
        orderBy('updatedAt', 'desc'),
        limit(3)
      );
      const projSnap = await getDocs(projQ);
      const projects: InquiryProjectSummary[] = projSnap.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          title: data.title,
          vision: data.vision,
          messageCount: (data.messages || []).length,
          updatedAt: data.updatedAt?.toDate() || new Date(),
        };
      });
      setRecentProjects(projects);

      // 全体の統計（全セッション）
      const allExamsQ = query(
        collection(db, 'examSessions'),
        where('userId', '==', user!.uid)
      );
      const allExamsSnap = await getDocs(allExamsQ);
      let totalQ = 0;
      let totalC = 0;
      allExamsSnap.docs.forEach((d) => {
        const data = d.data();
        totalQ += (data.records || []).length;
        totalC += data.score || 0;
      });

      const allProjQ = query(
        collection(db, 'inquiryProjects'),
        where('userId', '==', user!.uid)
      );
      const allProjSnap = await getDocs(allProjQ);
      let totalMsg = 0;
      allProjSnap.docs.forEach((d) => {
        totalMsg += (d.data().messages || []).length;
      });

      setStats({
        totalExamQuestions: totalQ,
        totalCorrect: totalC,
        totalInquiryProjects: allProjSnap.size,
        totalMessages: totalMsg,
      });
    } catch {
      // エラー時はデータなしで表示
    } finally {
      setDataLoading(false);
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  const name = user.displayName || user.email?.split('@')[0] || 'さん';
  const accuracy =
    stats && stats.totalExamQuestions > 0
      ? Math.round((stats.totalCorrect / stats.totalExamQuestions) * 100)
      : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">O</span>
            </div>
            <span className="font-bold text-gray-900">Ousia School LMS</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 hidden sm:block">{user.email}</span>
            <button
              onClick={() => logout().then(() => router.replace('/lms/login'))}
              className="text-sm text-gray-500 hover:text-red-500 transition-colors"
            >
              ログアウト
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            こんにちは、{name}！
          </h1>
          <p className="text-gray-500">今日もいっしょに学びましょう。</p>
        </div>

        {/* Stats Row */}
        {!dataLoading && stats && stats.totalExamQuestions > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center">
              <p className="text-3xl font-bold text-blue-600">{stats.totalExamQuestions}</p>
              <p className="text-xs text-gray-400 mt-1">解いた問題数</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center">
              <p className="text-3xl font-bold text-green-600">{accuracy}%</p>
              <p className="text-xs text-gray-400 mt-1">正答率</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center">
              <p className="text-3xl font-bold text-purple-600">{stats.totalInquiryProjects}</p>
              <p className="text-xs text-gray-400 mt-1">探求テーマ数</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center">
              <p className="text-3xl font-bold text-pink-600">{stats.totalMessages}</p>
              <p className="text-xs text-gray-400 mt-1">メンター対話数</p>
            </div>
          </div>
        )}

        {/* Mode Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {/* Exam Prep */}
          <Link href="/lms/exam" className="group">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 h-full">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors">
                <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">試験対策</h2>
              <p className="text-gray-500 leading-relaxed mb-6">
                AIが試験問題を出題。回答して解説を受け取り、
                確実な実力アップを目指します。英語・数学・理科・社会・国語に対応。
              </p>
              <ul className="space-y-2 mb-8">
                {['AI による問題生成', '即座の採点・解説', '弱点の繰り返し練習', '英検・大学受験対応'].map(
                  (item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {item}
                    </li>
                  )
                )}
              </ul>
              <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all">
                試験対策を始める
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Inquiry Learning */}
          <Link href="/lms/inquiry" className="group">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 h-full">
              <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-200 transition-colors">
                <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">探求学習</h2>
              <p className="text-gray-500 leading-relaxed mb-6">
                自分のビジョンと課題を設定し、AIメンターと対話しながら
                主体的な学びを深めます。答えのない問いに挑戦しよう。
              </p>
              <ul className="space-y-2 mb-8">
                {['ビジョン・課題の設定', 'AIソクラテス式メンタリング', 'プロジェクト進捗管理', '思考の深化・記録'].map(
                  (item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-purple-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {item}
                    </li>
                  )
                )}
              </ul>
              <div className="flex items-center gap-2 text-purple-600 font-semibold group-hover:gap-3 transition-all">
                探求を始める
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        </div>

        {/* Recent Activity */}
        {!dataLoading && (recentExams.length > 0 || recentProjects.length > 0) && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Recent Exams */}
            {recentExams.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 bg-blue-100 rounded-md flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </span>
                  最近の試験セッション
                </h3>
                <div className="space-y-3">
                  {recentExams.map((exam) => {
                    const pct = exam.total > 0 ? Math.round((exam.score / exam.total) * 100) : 0;
                    return (
                      <div key={exam.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                              {exam.subject}
                            </span>
                            <p className="text-sm font-medium text-gray-900 mt-1">{exam.topic}</p>
                            <p className="text-xs text-gray-400">{exam.grade}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-gray-900">
                              {exam.score}<span className="text-gray-400 text-sm font-normal">/{exam.total}</span>
                            </p>
                            <p className="text-xs text-gray-400">{pct}%</p>
                          </div>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              pct >= 80 ? 'bg-green-500' : pct >= 60 ? 'bg-yellow-500' : 'bg-red-400'
                            }`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-400 mt-2">
                          {exam.createdAt.toLocaleDateString('ja-JP')}
                        </p>
                      </div>
                    );
                  })}
                  <Link
                    href="/lms/exam"
                    className="block text-center text-sm text-blue-600 hover:text-blue-700 font-medium py-2"
                  >
                    新しいセッションを始める →
                  </Link>
                </div>
              </div>
            )}

            {/* Recent Projects */}
            {recentProjects.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 bg-purple-100 rounded-md flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </span>
                  探求プロジェクト
                </h3>
                <div className="space-y-3">
                  {recentProjects.map((proj) => (
                    <Link key={proj.id} href="/lms/inquiry">
                      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-all cursor-pointer">
                        <p className="text-sm font-medium text-gray-900 mb-1">{proj.title}</p>
                        <p className="text-xs text-purple-600 line-clamp-1 mb-2">{proj.vision}</p>
                        <div className="flex items-center justify-between text-xs text-gray-400">
                          <span>{proj.messageCount} メッセージ</span>
                          <span>{proj.updatedAt.toLocaleDateString('ja-JP')}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                  <Link
                    href="/lms/inquiry"
                    className="block text-center text-sm text-purple-600 hover:text-purple-700 font-medium py-2"
                  >
                    探求学習を続ける →
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Empty state for new users */}
        {!dataLoading && stats && stats.totalExamQuestions === 0 && stats.totalInquiryProjects === 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center">
            <div className="text-5xl mb-4">🚀</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">さあ、学習を始めましょう！</h3>
            <p className="text-gray-500">
              上のカードから学習モードを選んでスタートしてください。
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
