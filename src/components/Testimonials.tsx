export default function Testimonials() {
  const testimonials = [
    {
      quote:
        'AIが弱点を毎回分析してくれるので、何を勉強すればいいか迷わなくなりました。英検準1級に合格できて本当に嬉しいです！',
      name: 'K.T. さん（高校2年・東京）',
      result: '英検準1級 合格',
      resultColor: 'bg-primary-100 text-primary-700',
      initial: 'K',
    },
    {
      quote:
        '土曜の探究学習で海外の子と一緒にプロジェクトを進めるのが楽しくて、英語で話すことへの怖さがなくなりました。',
      name: 'A.M. さん（中学3年・大阪）',
      result: 'グローバル実践力 向上',
      resultColor: 'bg-accent-100 text-accent-700',
      initial: 'A',
    },
    {
      quote:
        'TOEICのスコアが3ヶ月で150点アップ。AI学習と講師のサポートが両方あるのが良かったです。部活との両立もできています。',
      name: 'R.S. さん（大学1年・神奈川）',
      result: 'TOEIC +150点',
      resultColor: 'bg-emerald-100 text-emerald-700',
      initial: 'R',
    },
    {
      quote:
        'ChatGPTを英語で使いこなす方法を学べるのが他にはない魅力。将来AI×英語を仕事に使いたいので最高の環境です。',
      name: 'Y.H. さん（高校3年・愛知）',
      result: 'AIリテラシー習得',
      resultColor: 'bg-purple-100 text-purple-700',
      initial: 'Y',
    },
  ];

  const results = [
    { label: '英検合格率', value: '94%', sub: '準2級〜1級' },
    { label: 'TOEIC平均スコアアップ', value: '+130点', sub: '3ヶ月受講後' },
    { label: '受講生満足度', value: '4.9/5', sub: '直近アンケート' },
    { label: '海外プロジェクト参加', value: '100%', sub: '休日プログラム生' },
  ];

  return (
    <section id="testimonials" className="section-padding bg-gray-50">
      <div className="container-max">

        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-primary-600">
            Testimonials
          </span>
          <h2 className="mb-6 text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
            生徒の声・<span className="gradient-text">実績</span>
          </h2>
          <p className="text-lg leading-relaxed text-gray-600">
            Ousia Schoolで学んだ生徒たちのリアルな声です。
          </p>
        </div>

        {/* Results Stats */}
        <div className="mb-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {results.map((r) => (
            <div
              key={r.label}
              className="rounded-3xl bg-white p-8 text-center shadow-sm"
            >
              <div className="mb-1 text-4xl font-extrabold gradient-text">{r.value}</div>
              <div className="font-semibold text-gray-900">{r.label}</div>
              <div className="mt-1 text-xs text-gray-400">{r.sub}</div>
            </div>
          ))}
        </div>

        {/* Testimonial Cards */}
        <div className="grid gap-6 sm:grid-cols-2">
          {testimonials.map((t) => (
            <article
              key={t.name}
              className="rounded-3xl bg-white p-8 shadow-sm"
            >
              {/* Quote */}
              <svg className="mb-4 h-8 w-8 text-primary-200" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="mb-6 text-base leading-relaxed text-gray-700">{t.quote}</p>

              {/* Footer */}
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-accent-500 text-base font-extrabold text-white">
                  {t.initial}
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">{t.name}</div>
                  <span className={`mt-1 inline-block rounded-full px-3 py-0.5 text-xs font-bold ${t.resultColor}`}>
                    {t.result}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom note */}
        <p className="mt-8 text-center text-xs text-gray-400">
          ※ 掲載している声はご本人の許可を得て掲載しています。個人差があります。
        </p>
      </div>
    </section>
  );
}
