import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ousia School 紹介資料 | 英語×AIで未来を切り拓く',
  description: 'Ousia Schoolの学校紹介資料。英語試験対策とAI×探究学習を組み合わせた、次世代オンラインスクールのコンセプト・プログラム・特長をご紹介します。',
};

export default function IntroPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 antialiased">

      {/* ========== SLIDE 1: Cover ========== */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden hero-gradient px-6 text-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-20 top-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -right-20 bottom-20 h-96 w-96 rounded-full bg-accent-500/20 blur-3xl" />
        </div>
        <div className="relative z-10 max-w-4xl">
          <p className="mb-6 text-sm font-semibold uppercase tracking-[0.3em] text-white/60">
            School Introduction
          </p>
          <h1 className="mb-4 text-6xl font-extrabold leading-tight text-white sm:text-7xl lg:text-8xl">
            Ousia<br />
            <span className="text-accent-300">School</span>
          </h1>
          <p className="mb-2 text-xl font-light tracking-widest text-white/80 sm:text-2xl">
            OIS — Discovering the Essence of Global Education
          </p>
          <div className="my-8 h-px w-24 bg-white/30 mx-auto" />
          <p className="text-lg leading-relaxed text-white/70 sm:text-xl">
            英語<span className="mx-1 text-accent-300 font-bold">×</span>AI で、
            グローバルに活躍する人材を育てる<br />次世代オンラインスクール
          </p>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40 text-sm">
          scroll ↓
        </div>
      </section>

      {/* ========== SLIDE 2: Why Ousia ========== */}
      <section className="bg-gray-950 px-6 py-24 text-white">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-accent-400">
            Our Name
          </p>
          <h2 className="mb-12 text-4xl font-extrabold sm:text-5xl">
            「Ousia」とは何か
          </h2>
          <div className="grid gap-10 md:grid-cols-2 items-center">
            <div>
              <div className="mb-6 inline-block rounded-2xl border border-white/10 bg-white/5 px-6 py-4">
                <span className="text-5xl font-extrabold text-accent-300">οὐσία</span>
                <p className="mt-1 text-sm text-white/50">Ancient Greek</p>
              </div>
              <p className="text-lg leading-relaxed text-white/80">
                Ousiaはアリストテレス哲学に登場するギリシャ語で、
                <strong className="text-white">「本質・存在・実体」</strong>を意味します。
                表面的な知識ではなく、物事の<em>本質</em>を掴む力こそが、
                AI時代を生き抜く真の教育だと私たちは考えます。
              </p>
            </div>
            <div className="space-y-4">
              {[
                { en: 'Essence', ja: '本質を問い続ける力' },
                { en: 'Inquiry', ja: '探究する姿勢' },
                { en: 'Global', ja: 'グローバルな視座' },
              ].map((item) => (
                <div key={item.en} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5">
                  <span className="text-2xl font-extrabold text-accent-300 w-24 shrink-0">{item.en}</span>
                  <span className="text-white/80">{item.ja}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== SLIDE 3: The Challenge ========== */}
      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary-600">
            The Problem
          </p>
          <h2 className="mb-12 text-4xl font-extrabold text-gray-900 sm:text-5xl">
            今の教育が抱える課題
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                num: '01',
                title: '英語を「使えない」',
                body: '試験のための英語学習が中心で、実際にコミュニケーションや思考に使える英語力が育ちにくい。',
              },
              {
                num: '02',
                title: 'AI時代への準備不足',
                body: 'AIが当たり前の社会になりつつあるのに、AIをどう使いこなすか学ぶ機会がほとんどない。',
              },
              {
                num: '03',
                title: '探究・思考力の欠如',
                body: '答えのある問題を解く学習が主流で、自ら問いを立て思考する力を育てる場が少ない。',
              },
            ].map((item) => (
              <div key={item.num} className="rounded-3xl border-2 border-gray-100 p-8">
                <div className="mb-4 text-4xl font-extrabold text-gray-100">{item.num}</div>
                <h3 className="mb-3 text-lg font-bold text-gray-900">{item.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SLIDE 4: Our Solution ========== */}
      <section className="bg-gradient-to-br from-primary-50 to-accent-50 px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary-600">
            Our Solution
          </p>
          <h2 className="mb-4 text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Ousia Schoolの答え
          </h2>
          <p className="mb-12 text-lg text-gray-600">
            2つのプログラムを組み合わせ、英語力とAIスキルを同時に育てます。
          </p>

          {/* Solution visual */}
          <div className="flex flex-col items-center gap-6 md:flex-row">
            {/* Weekday */}
            <div className="flex-1 rounded-3xl bg-primary-600 p-8 text-white">
              <div className="mb-2 text-xs font-bold uppercase tracking-widest text-primary-200">
                Weekday Program
              </div>
              <h3 className="mb-1 text-2xl font-extrabold">英語試験対策</h3>
              <p className="mb-1 text-sm text-primary-200">火・木 19:00〜20:30</p>
              <div className="my-5 h-px bg-white/20" />
              <p className="text-sm leading-relaxed text-primary-100">
                AIが弱点を自動分析し、最適な学習プランを個別生成。
                英検・TOEIC・TOEFL・大学入試に対応した効率的なインプット学習。
              </p>
            </div>

            {/* Plus */}
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white shadow-lg text-2xl font-extrabold text-primary-600">
              ×
            </div>

            {/* Weekend */}
            <div className="flex-1 rounded-3xl bg-accent-600 p-8 text-white">
              <div className="mb-2 text-xs font-bold uppercase tracking-widest text-accent-200">
                Weekend Program
              </div>
              <h3 className="mb-1 text-2xl font-extrabold">AI×英語 探究学習</h3>
              <p className="mb-1 text-sm text-accent-200">土曜 13:00〜17:00</p>
              <div className="my-5 h-px bg-white/20" />
              <p className="text-sm leading-relaxed text-accent-100">
                英語でAIと協働しながら世界の課題に挑むPBL。
                グローバルな仲間とプレゼン・ディスカッションで実践力を養う。
              </p>
            </div>
          </div>

          {/* Arrow */}
          <div className="mt-8 rounded-2xl bg-white p-6 text-center shadow">
            <p className="font-bold text-gray-700">
              インプット（試験対策）＋ アウトプット（探究学習）のサイクルで<br />
              <span className="text-primary-600">英語力</span> と <span className="text-accent-600">AIスキル</span> を同時に最大化
            </p>
          </div>
        </div>
      </section>

      {/* ========== SLIDE 5: Weekday Program Detail ========== */}
      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary-600">
            Program Detail
          </p>
          <h2 className="mb-2 text-4xl font-extrabold text-gray-900 sm:text-5xl">
            平日プログラム
          </h2>
          <p className="mb-10 text-gray-500">火・木曜日 19:00〜20:30（90分）</p>

          <div className="overflow-hidden rounded-3xl border border-gray-100 shadow-lg">
            <div className="bg-primary-600 px-8 py-5">
              <h3 className="text-xl font-bold text-white">AIサポート英語試験対策</h3>
              <p className="text-sm text-primary-100">英検 / TOEIC / TOEFL / 大学入試対応</p>
            </div>
            <div className="divide-y divide-gray-50">
              {[
                { time: '19:00〜19:10', step: '01', label: 'ウォームアップ & 目標確認', color: 'text-primary-600' },
                { time: '19:10〜19:40', step: '02', label: 'AI個別学習（弱点克服ドリル）', color: 'text-primary-600' },
                { time: '19:40〜20:10', step: '03', label: '講師による解説 & 質問対応', color: 'text-primary-600' },
                { time: '20:10〜20:25', step: '04', label: '確認テスト & 振り返り', color: 'text-primary-600' },
                { time: '20:25〜20:30', step: '05', label: '次回の学習プラン確認', color: 'text-primary-600' },
              ].map((item) => (
                <div key={item.step} className="flex items-center gap-6 px-8 py-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-50 text-sm font-extrabold text-primary-600">
                    {item.step}
                  </div>
                  <div className="w-36 shrink-0 text-sm font-medium text-gray-400">{item.time}</div>
                  <div className="font-medium text-gray-800">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              { title: 'AIによる弱点分析', body: '学習履歴をAIが自動解析。最も伸びる問題を優先して出題します。' },
              { title: '個別最適化プラン', body: 'ひとりひとりのレベル・目標に合わせたカスタム学習プランを自動生成。' },
              { title: '講師のリアルタイムサポート', body: '疑問はその場で解決。AI+講師のハイブリッド指導で理解を深めます。' },
              { title: '目標スコア達成を追跡', body: 'ダッシュボードで進捗を可視化。目標までの距離が常に把握できます。' },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-gray-100 p-6">
                <h4 className="mb-2 font-bold text-gray-900">{item.title}</h4>
                <p className="text-sm leading-relaxed text-gray-600">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SLIDE 6: Weekend Program Detail ========== */}
      <section className="bg-gray-50 px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-accent-600">
            Program Detail
          </p>
          <h2 className="mb-2 text-4xl font-extrabold text-gray-900 sm:text-5xl">
            休日プログラム
          </h2>
          <p className="mb-10 text-gray-500">土曜日 13:00〜17:00（4時間）</p>

          <div className="overflow-hidden rounded-3xl border border-gray-100 shadow-lg">
            <div className="bg-accent-600 px-8 py-5">
              <h3 className="text-xl font-bold text-white">AI×英語 探究型PBL</h3>
              <p className="text-sm text-accent-100">グローバル共同プロジェクト / プレゼンテーション</p>
            </div>
            <div className="divide-y divide-gray-50 bg-white">
              {[
                { time: '13:00〜13:15', step: '01', label: 'チームビルディング & テーマ発表' },
                { time: '13:15〜14:30', step: '02', label: 'AI×英語リサーチ & ディスカッション' },
                { time: '14:30〜16:00', step: '03', label: 'グループワーク & プロトタイピング' },
                { time: '16:00〜16:45', step: '04', label: 'プレゼンテーション（英語）' },
                { time: '16:45〜17:00', step: '05', label: 'フィードバック & リフレクション' },
              ].map((item) => (
                <div key={item.step} className="flex items-center gap-6 px-8 py-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-50 text-sm font-extrabold text-accent-600">
                    {item.step}
                  </div>
                  <div className="w-36 shrink-0 text-sm font-medium text-gray-400">{item.time}</div>
                  <div className="font-medium text-gray-800">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              { title: 'AIツールを英語で操る', body: 'ChatGPT・Geminiなどを英語で使いこなす実践的なAIリテラシーを習得。' },
              { title: 'グローバル共同プロジェクト', body: '海外の生徒と英語でコラボ。多様な視点と価値観に触れる本物の国際経験。' },
              { title: '探究型PBL（課題解決型学習）', body: '答えのない社会課題に取り組み、批判的思考力と創造力を鍛えます。' },
              { title: '英語プレゼン力', body: '毎回英語でプレゼン。話す・聞く・説明する力が自然と身につきます。' },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-gray-100 bg-white p-6">
                <h4 className="mb-2 font-bold text-gray-900">{item.title}</h4>
                <p className="text-sm leading-relaxed text-gray-600">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SLIDE 7: 6 Features ========== */}
      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary-600">
            Features
          </p>
          <h2 className="mb-4 text-4xl font-extrabold text-gray-900 sm:text-5xl">
            6つの特長
          </h2>
          <p className="mb-12 text-lg text-gray-600">テクノロジーと教育の融合で、一人ひとりの可能性を最大化。</p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                num: '1',
                title: '完全オンライン',
                body: '自宅から高品質な授業に参加。場所を問わず、海外からの参加も歓迎します。',
                gradient: 'from-blue-500 to-primary-600',
              },
              {
                num: '2',
                title: 'AI個別最適化',
                body: 'AIが弱点を分析し最適な学習プランを自動生成。最短距離で目標スコアへ。',
                gradient: 'from-primary-600 to-purple-600',
              },
              {
                num: '3',
                title: 'グローバルコミュニティ',
                body: '世界中の生徒と探究学習。多様な価値観で実践的な英語コミュ力が育まれます。',
                gradient: 'from-purple-600 to-accent-600',
              },
              {
                num: '4',
                title: '学習進捗の可視化',
                body: 'ダッシュボードでリアルタイムに進捗確認。保護者の方も安心して見守れます。',
                gradient: 'from-accent-500 to-pink-500',
              },
              {
                num: '5',
                title: '探究型PBL',
                body: '答えのない問いに挑む学習でAIを活用しながら批判的思考力と創造力を養います。',
                gradient: 'from-pink-500 to-orange-500',
              },
              {
                num: '6',
                title: '柔軟なスケジュール',
                body: 'ライフスタイルに合わせてプランをカスタマイズ。部活・習い事との両立も可能。',
                gradient: 'from-orange-500 to-yellow-500',
              },
            ].map((item) => (
              <div key={item.num} className="rounded-3xl border border-gray-100 p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} text-xl font-extrabold text-white`}>
                  {item.num}
                </div>
                <h3 className="mb-3 text-lg font-bold text-gray-900">{item.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SLIDE 8: Who is this for ========== */}
      <section className="bg-gray-950 px-6 py-24 text-white">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-accent-400">
            For Whom
          </p>
          <h2 className="mb-12 text-4xl font-extrabold sm:text-5xl">
            こんな方におすすめ
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              '英検・TOEIC・TOEFLのスコアを伸ばしたい',
              '大学入試の英語で高得点を取りたい',
              'AIを使いこなせるスキルを身につけたい',
              '英語で世界の人と話せるようになりたい',
              '探究・思考力を鍛えたい',
              '自宅から質の高い教育を受けたい',
              'グローバルなコミュニティに参加したい',
              '部活や他の習い事と両立したい',
            ].map((item) => (
              <div key={item} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-6 py-4">
                <div className="h-2 w-2 shrink-0 rounded-full bg-accent-400" />
                <span className="text-white/85">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SLIDE 9: Weekly Cycle ========== */}
      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary-600">
            Weekly Cycle
          </p>
          <h2 className="mb-4 text-4xl font-extrabold text-gray-900 sm:text-5xl">
            一週間の学びのサイクル
          </h2>
          <p className="mb-12 text-lg text-gray-600">
            火・木のインプットと土曜のアウトプットで、確実に力が伸びます。
          </p>

          <div className="rounded-3xl border border-gray-100 p-8 shadow-lg sm:p-10">
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              {[
                { day: 'Mon', label: '月', type: 'rest' },
                { day: 'Tue', label: '火', type: 'weekday' },
                { day: 'Wed', label: '水', type: 'rest' },
                { day: 'Thu', label: '木', type: 'weekday' },
                { day: 'Fri', label: '金', type: 'rest' },
                { day: 'Sat', label: '土', type: 'weekend' },
              ].map((d) => (
                <div
                  key={d.day}
                  className={`flex w-24 flex-col items-center justify-center rounded-2xl py-5 sm:w-28 ${
                    d.type === 'weekday'
                      ? 'bg-primary-600 text-white'
                      : d.type === 'weekend'
                      ? 'bg-accent-600 text-white'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  <span className="text-xs font-bold uppercase tracking-wide opacity-70">{d.day}</span>
                  <span className="my-1 text-2xl font-extrabold">{d.label}</span>
                  <span className={`text-[11px] font-medium ${
                    d.type === 'rest' ? 'text-gray-300' : 'opacity-80'
                  }`}>
                    {d.type === 'weekday' ? '試験対策' : d.type === 'weekend' ? '探究学習' : '自習'}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <div className="flex items-center gap-2 rounded-xl bg-primary-50 px-5 py-3 text-sm font-medium text-primary-700">
                <span className="h-2.5 w-2.5 rounded-full bg-primary-600" />
                火・木：インプット（英語試験対策）
              </div>
              <div className="hidden sm:block text-gray-300">→</div>
              <div className="flex items-center gap-2 rounded-xl bg-accent-50 px-5 py-3 text-sm font-medium text-accent-700">
                <span className="h-2.5 w-2.5 rounded-full bg-accent-600" />
                土：アウトプット（探究型PBL）
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SLIDE 10: Vision ========== */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-accent-700 px-6 py-24 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-white/60">
            Our Vision
          </p>
          <h2 className="mb-8 text-4xl font-extrabold sm:text-5xl lg:text-6xl">
            「本質」を学んだ子どもたちが<br />
            <span className="text-accent-300">世界を変える</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-white/80">
            英語とAIを「使いこなす力」だけでなく、
            自ら問いを立て、仲間と協働し、社会に価値を生み出す力。
            それがOusia Schoolが育てる「本質的な学力」です。
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              { value: '火・木 + 土', label: '週3回の学習機会', sub: '90分＋4時間' },
              { value: '100%', label: '完全オンライン', sub: '世界中から参加可能' },
              { value: '2026', label: '春期生 募集開始', sub: '先行予約受付中' },
            ].map((item) => (
              <div key={item.label} className="rounded-3xl bg-white/10 p-8 backdrop-blur-sm">
                <div className="mb-1 text-3xl font-extrabold text-white">{item.value}</div>
                <div className="font-bold text-white/90">{item.label}</div>
                <div className="text-sm text-white/60">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SLIDE 11: CTA ========== */}
      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary-600">
            Get Started
          </p>
          <h2 className="mb-6 text-4xl font-extrabold text-gray-900 sm:text-5xl">
            まずは無料相談から
          </h2>
          <p className="mb-10 text-lg leading-relaxed text-gray-600">
            お子様の学習状況やご要望をお伺いし、
            最適なプランをご提案いたします。<br />
            お気軽にお問い合わせください。
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-primary-600 to-accent-600 px-10 py-5 text-lg font-bold text-white shadow-xl transition-all hover:-translate-y-0.5 hover:shadow-2xl"
            >
              無料相談を申し込む
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="/"
              className="inline-flex items-center gap-2 rounded-2xl border-2 border-gray-200 px-10 py-5 text-lg font-bold text-gray-700 transition-all hover:border-primary-300 hover:text-primary-700"
            >
              ウェブサイトへ
            </a>
          </div>
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-400">
              © 2025 Ousia School. All rights reserved.
            </p>
            <p className="mt-1 text-xs text-gray-300">
              OIS — Discovering the Essence of Global Education
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
