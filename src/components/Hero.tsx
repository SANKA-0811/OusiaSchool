export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden hero-gradient">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl animate-float" />
        <div className="absolute -right-20 bottom-20 h-96 w-96 rounded-full bg-accent-500/20 blur-3xl animate-float-delayed" />
        <div className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-primary-300/10 blur-3xl" />
      </div>

      <div className="container-max relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pt-20 text-center sm:px-6 lg:px-8">
        {/* Badge */}
        <div className="animate-fade-in-up mb-8 inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2 backdrop-blur-sm">
          <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sm font-medium text-white/90">
            2026年 春期生 募集開始
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="animate-fade-in-up mb-6 text-4xl font-extrabold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          英語<span className="text-accent-300">&times;</span>AI で
          <br />
          未来を切り拓く
        </h1>

        {/* Subheading */}
        <p className="animate-fade-in-up-delayed mb-10 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">
          火・木は英語試験対策をAIがサポート。
          <br className="hidden sm:block" />
          土曜はAI&times;英語の探究学習でグローバルに挑戦。
          <br className="hidden sm:block" />
          <strong className="text-white">「本質（Ousia）」</strong>
          を追求する、新しいオンラインスクール。
        </p>

        {/* CTA Buttons */}
        <div className="animate-fade-in-up-delayed-2 flex flex-col gap-4 sm:flex-row">
          <a
            href="#contact"
            className="rounded-full bg-white px-8 py-4 text-base font-bold text-primary-700 shadow-2xl transition-all hover:-translate-y-0.5 hover:shadow-white/25 sm:text-lg"
          >
            無料相談に申し込む
          </a>
          <a
            href="#concept"
            className="rounded-full border-2 border-white/30 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-white/60 hover:bg-white/10 sm:text-lg"
          >
            詳しく見る
          </a>
        </div>

        {/* Stats */}
        <div className="animate-fade-in-up-delayed-2 mt-16 grid grid-cols-3 gap-8 sm:gap-16">
          <div className="text-center">
            <div className="text-3xl font-extrabold text-white sm:text-4xl">AI</div>
            <div className="mt-1 text-xs text-white/60 sm:text-sm">活用学習</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-extrabold text-white sm:text-4xl">
              Global
            </div>
            <div className="mt-1 text-xs text-white/60 sm:text-sm">探究学習</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-extrabold text-white sm:text-4xl">
              Online
            </div>
            <div className="mt-1 text-xs text-white/60 sm:text-sm">完全対応</div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/30 p-1">
            <div className="h-2 w-1 animate-bounce rounded-full bg-white/60" />
          </div>
        </div>
      </div>
    </section>
  );
}
