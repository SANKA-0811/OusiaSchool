export default function Programs() {
  const weekdaySchedule = [
    { time: '17:00 - 17:10', activity: 'ウォームアップ & 目標確認' },
    { time: '17:10 - 17:40', activity: 'AI個別学習（弱点克服ドリル）' },
    { time: '17:40 - 18:10', activity: '講師による解説 & 質問対応' },
    { time: '18:10 - 18:25', activity: '確認テスト & 振り返り' },
    { time: '18:25 - 18:30', activity: '次回の学習プラン確認' },
  ];

  const weekendSchedule = [
    { time: '10:00 - 10:15', activity: 'チームビルディング & テーマ発表' },
    { time: '10:15 - 11:00', activity: 'AI×英語リサーチ & ディスカッション' },
    { time: '11:00 - 11:45', activity: 'グループワーク & プロトタイピング' },
    { time: '11:45 - 12:15', activity: 'プレゼンテーション（英語）' },
    { time: '12:15 - 12:30', activity: 'フィードバック & リフレクション' },
  ];

  return (
    <section id="programs" className="section-padding bg-gray-50">
      <div className="container-max">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-primary-600">
            Programs
          </span>
          <h2 className="mb-6 text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
            一週間の<span className="gradient-text">学びのサイクル</span>
          </h2>
          <p className="text-lg leading-relaxed text-gray-600">
            平日のインプットと休日のアウトプットを組み合わせた、
            <br className="hidden sm:block" />
            実践的な学習サイクルで確実に力を伸ばします。
          </p>
        </div>

        {/* Schedule Cards */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Weekday Schedule */}
          <div className="overflow-hidden rounded-3xl bg-white shadow-lg">
            <div className="bg-primary-600 px-8 py-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
                  <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">平日プログラム</h3>
                  <p className="text-sm text-primary-100">月〜金 / 90分</p>
                </div>
              </div>
            </div>
            <div className="p-8">
              <div className="space-y-4">
                {weekdaySchedule.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-600">
                        {index + 1}
                      </div>
                      {index < weekdaySchedule.length - 1 && (
                        <div className="mt-1 h-full w-px bg-primary-100" />
                      )}
                    </div>
                    <div className="pb-4">
                      <div className="text-xs font-medium text-primary-500">{item.time}</div>
                      <div className="text-sm font-medium text-gray-800">{item.activity}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Weekend Schedule */}
          <div className="overflow-hidden rounded-3xl bg-white shadow-lg">
            <div className="bg-accent-600 px-8 py-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
                  <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">休日プログラム</h3>
                  <p className="text-sm text-accent-100">土・日 / 150分</p>
                </div>
              </div>
            </div>
            <div className="p-8">
              <div className="space-y-4">
                {weekendSchedule.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-100 text-xs font-bold text-accent-600">
                        {index + 1}
                      </div>
                      {index < weekendSchedule.length - 1 && (
                        <div className="mt-1 h-full w-px bg-accent-100" />
                      )}
                    </div>
                    <div className="pb-4">
                      <div className="text-xs font-medium text-accent-500">{item.time}</div>
                      <div className="text-sm font-medium text-gray-800">{item.activity}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Flow */}
        <div className="mt-12 rounded-3xl bg-white p-8 shadow-lg sm:p-10">
          <h3 className="mb-8 text-center text-xl font-bold text-gray-900">
            週間学習フロー
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day) => (
              <div
                key={day}
                className="flex h-16 w-16 flex-col items-center justify-center rounded-2xl bg-primary-100 sm:h-20 sm:w-20"
              >
                <span className="text-xs font-bold text-primary-600">{day}</span>
                <span className="text-[10px] text-primary-500">試験対策</span>
              </div>
            ))}
            <svg className="mx-1 h-6 w-6 text-gray-300 sm:mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            {['Sat', 'Sun'].map((day) => (
              <div
                key={day}
                className="flex h-16 w-16 flex-col items-center justify-center rounded-2xl bg-accent-100 sm:h-20 sm:w-20"
              >
                <span className="text-xs font-bold text-accent-600">{day}</span>
                <span className="text-[10px] text-accent-500">探究学習</span>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-gray-500">
            平日のインプット → 休日のアウトプット のサイクルで、英語力とAIスキルを同時に伸ばします
          </p>
        </div>
      </div>
    </section>
  );
}
