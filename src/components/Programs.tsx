export default function Programs() {
  const weekdaySchedule = [
    { time: '19:00 - 19:10', activity: 'ウォームアップ & 目標確認' },
    { time: '19:10 - 19:40', activity: 'AI個別学習（弱点克服ドリル）' },
    { time: '19:40 - 20:10', activity: '講師による解説 & 質問対応' },
    { time: '20:10 - 20:25', activity: '確認テスト & 振り返り' },
    { time: '20:25 - 20:30', activity: '次回の学習プラン確認' },
  ];

  const weekendSchedule = [
    { time: '13:00 - 13:15', activity: 'チームビルディング & テーマ発表' },
    { time: '13:15 - 14:30', activity: 'AI×英語リサーチ & ディスカッション' },
    { time: '14:30 - 16:00', activity: 'グループワーク & プロトタイピング' },
    { time: '16:00 - 16:45', activity: 'プレゼンテーション（英語）' },
    { time: '16:45 - 17:00', activity: 'フィードバック & リフレクション' },
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
            火・木のインプットと土曜のアウトプットを組み合わせた、
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
                  <p className="text-sm text-primary-100">火・木 19:00〜20:30 / 90分（21時完全下校）</p>
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
                  <p className="text-sm text-accent-100">土曜 13:00〜17:00 / 4時間（18時完全下校）</p>
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
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => {
              const isClass = day === 'Tue' || day === 'Thu';
              const isSat = day === 'Sat';
              return (
                <div
                  key={day}
                  className={`flex h-16 w-16 flex-col items-center justify-center rounded-2xl sm:h-20 sm:w-20 ${
                    isSat
                      ? 'bg-accent-100'
                      : isClass
                        ? 'bg-primary-100'
                        : 'bg-gray-100'
                  }`}
                >
                  <span className={`text-xs font-bold ${
                    isSat
                      ? 'text-accent-600'
                      : isClass
                        ? 'text-primary-600'
                        : 'text-gray-400'
                  }`}>{day}</span>
                  <span className={`text-[10px] ${
                    isSat
                      ? 'text-accent-500'
                      : isClass
                        ? 'text-primary-500'
                        : 'text-gray-300'
                  }`}>
                    {isSat ? '探究学習' : isClass ? '試験対策' : '—'}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="mt-6 text-center text-sm text-gray-500">
            火・木の試験対策（インプット） → 土曜の探究学習（アウトプット）のサイクルで、英語力とAIスキルを同時に伸ばします
          </p>
        </div>
      </div>
    </section>
  );
}
