export default function Concept() {
  return (
    <section id="concept" className="section-padding bg-white">
      <div className="container-max">

        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-primary-600">
            Concept
          </span>
          <h2 className="mb-6 text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
            「<span className="gradient-text">本質</span>」を学ぶ、<br />
            新しい教育のかたち
          </h2>
          <p className="text-lg leading-relaxed text-gray-600">
            Ousia（ウーシア）はギリシャ語で「本質・存在」を意味します。<br className="hidden sm:block" />
            英語の力とAIリテラシーの「本質」を同時に磨き、<br className="hidden sm:block" />
            グローバル社会で自ら切り拓ける人材を育てます。
          </p>
        </div>

        {/* Philosophy row */}
        <div className="mb-12 grid gap-4 sm:grid-cols-3">
          {[
            { en: 'Essence', ja: '本質を問い続ける', desc: '表面的な知識ではなく、なぜ・どうしてを問い続ける思考力' },
            { en: 'Inquiry', ja: '探究する姿勢', desc: '答えのない問いに向き合い、自ら仮説を立てて検証する力' },
            { en: 'Global', ja: 'グローバルな視座', desc: '英語とAIを使い、世界の人々と協力して課題を解決する力' },
          ].map((item) => (
            <div key={item.en} className="rounded-3xl bg-gray-50 p-8 text-center">
              <div className="mb-2 text-3xl font-extrabold gradient-text">{item.en}</div>
              <div className="mb-3 text-lg font-bold text-gray-900">{item.ja}</div>
              <p className="text-sm leading-relaxed text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Program Cards */}
        <div className="grid gap-8 md:grid-cols-2">

          {/* Weekday */}
          <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-50 to-primary-100 p-8 sm:p-10 card-hover">
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary-200/50 transition-transform group-hover:scale-125" />
            <div className="relative">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-600 text-white shadow-lg shadow-primary-600/30">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="mb-2 text-xs font-bold uppercase tracking-widest text-primary-600">
                Weekday Program — 火・木
              </div>
              <h3 className="mb-4 text-2xl font-bold text-gray-900">
                AI×英語 試験対策
              </h3>
              <p className="mb-6 leading-relaxed text-gray-600">
                AIが学習履歴を分析し、弱点を自動特定。
                英検・TOEIC・TOEFL・大学入試まで、あなたのゴールに最短距離で到達する
                個別最適化カリキュラムをリアルタイムで生成します。
              </p>
              <ul className="space-y-3">
                {[
                  'AIによる弱点分析と個別学習プラン',
                  '英検・TOEIC・TOEFL・大学入試対応',
                  '講師によるリアルタイムサポート',
                  '目標スコアまでの進捗可視化',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-gray-700">
                    <svg className="h-5 w-5 shrink-0 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Weekend */}
          <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent-50 to-accent-100 p-8 sm:p-10 card-hover">
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accent-200/50 transition-transform group-hover:scale-125" />
            <div className="relative">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-600 text-white shadow-lg shadow-accent-600/30">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="mb-2 text-xs font-bold uppercase tracking-widest text-accent-600">
                Weekend Program — 土曜
              </div>
              <h3 className="mb-4 text-2xl font-bold text-gray-900">
                AI×英語 探究学習
              </h3>
              <p className="mb-6 leading-relaxed text-gray-600">
                英語を「使って」AIと協働しながら、世界の課題に取り組むPBL学習。
                海外の生徒との共同プロジェクトや英語プレゼンを通じて、
                本物のグローバル実践力を養います。
              </p>
              <ul className="space-y-3">
                {[
                  'AIツールを英語で使いこなす実践力',
                  'グローバル共同プロジェクト',
                  '探究型PBL（課題解決型学習）',
                  '英語プレゼンテーション&ディスカッション',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-gray-700">
                    <svg className="h-5 w-5 shrink-0 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
