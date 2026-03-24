export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden hero-gradient">
      {/* Decorative orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-24 top-16 h-96 w-96 rounded-full bg-white/10 blur-3xl animate-float" />
        <div className="absolute -right-24 bottom-16 h-[28rem] w-[28rem] rounded-full bg-accent-500/20 blur-3xl animate-float-delayed" />
        <div className="absolute left-1/2 top-1/4 h-72 w-72 -translate-x-1/2 rounded-full bg-primary-300/10 blur-3xl" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="container-max relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pt-24 pb-16 text-center sm:px-6 lg:px-8">

        {/* Badge */}
        <div className="animate-fade-in-up mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 backdrop-blur-sm">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-sm font-semibold text-white/90 tracking-wide">
            2026年 春期生 先行募集中
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="animate-fade-in-up mb-4 text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
          英語 <span className="text-accent-300">×</span> AI<br />
          <span className="text-white/90">で世界へ</span>
        </h1>

        {/* Sub heading */}
        <p className="animate-fade-in-up-delayed mb-4 text-lg font-light tracking-[0.2em] text-white/50 sm:text-xl">
          OIS — Discovering the Essence of Global Education
        </p>

        {/* Description */}
        <p className="animate-fade-in-up-delayed mt-4 mb-10 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
          火・木は<strong className="text-white font-semibold">AIサポート英語試験対策</strong>。
          土曜は<strong className="text-white font-semibold">英語×AI探究学習</strong>でグローバルな課題に挑む。<br />
          「本質（Ousia）」を追求する次世代オンラインスクール。
        </p>

        {/* CTA Buttons */}
        <div className="animate-fade-in-up-delayed-2 flex flex-col gap-4 sm:flex-row">
          <a
            href="#contact"
            className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-bold text-primary-700 shadow-2xl shadow-primary-900/30 transition-all hover:-translate-y-0.5 hover:shadow-white/20"
          >
            無料相談を申し込む
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="#concept"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/15"
          >
            学校について知る
          </a>
        </div>

        {/* Stats */}
        <div className="animate-fade-in-up-delayed-2 mt-16 grid grid-cols-3 gap-6 sm:gap-12">
          {[
            { value: '週3回', label: '授業日' },
            { value: '100%', label: 'オンライン' },
            { value: 'AI', label: '個別最適化' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-extrabold text-white sm:text-3xl">{stat.value}</div>
              <div className="mt-1 text-xs font-medium text-white/50 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
        <span className="text-xs tracking-[0.2em] uppercase">scroll</span>
        <div className="h-8 w-px bg-gradient-to-b from-white/30 to-transparent" />
      </div>
    </section>
  );
}
