'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';

export default function LMSDashboard() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/lms/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  const name = user.displayName || user.email?.split('@')[0] || 'さん';

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

      {/* Main */}
      <main className="max-w-5xl mx-auto px-4 py-12">
        {/* Welcome */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            こんにちは、{name}！
          </h1>
          <p className="text-gray-500">今日もいっしょに学びましょう。どちらの学習をしますか？</p>
        </div>

        {/* Mode Cards */}
        <div className="grid md:grid-cols-2 gap-6">
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
      </main>
    </div>
  );
}
