export default function CTA() {
  return (
    <section id="contact" className="section-padding relative overflow-hidden hero-gradient">
      {/* Decorative */}
      <div className="absolute inset-0">
        <div className="absolute -left-40 top-0 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-accent-500/10 blur-3xl" />
      </div>

      <div className="container-max relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-white/60">
            Contact
          </span>
          <h2 className="mb-6 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            まずは無料相談から
            <br />
            はじめてみませんか？
          </h2>
          <p className="mb-10 text-lg leading-relaxed text-white/80">
            お子様の学習状況やご要望をお伺いし、
            <br className="hidden sm:block" />
            最適なプランをご提案いたします。お気軽にお問い合わせください。
          </p>

          {/* Contact Form */}
          <div className="mx-auto max-w-lg rounded-3xl bg-white/10 p-8 backdrop-blur-lg sm:p-10">
            <form className="space-y-5">
              <div>
                <input
                  type="text"
                  placeholder="お名前"
                  className="w-full rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-sm text-white placeholder-white/50 outline-none transition-colors focus:border-white/40 focus:bg-white/15"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="メールアドレス"
                  className="w-full rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-sm text-white placeholder-white/50 outline-none transition-colors focus:border-white/40 focus:bg-white/15"
                />
              </div>
              <div>
                <select className="w-full rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-sm text-white/70 outline-none transition-colors focus:border-white/40 focus:bg-white/15">
                  <option value="">お問い合わせ内容を選択</option>
                  <option value="trial">無料体験レッスンについて</option>
                  <option value="weekday">平日プログラムについて</option>
                  <option value="weekend">休日プログラムについて</option>
                  <option value="other">その他</option>
                </select>
              </div>
              <div>
                <textarea
                  placeholder="メッセージ（任意）"
                  rows={4}
                  className="w-full resize-none rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-sm text-white placeholder-white/50 outline-none transition-colors focus:border-white/40 focus:bg-white/15"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-xl bg-white py-4 text-base font-bold text-primary-700 shadow-2xl transition-all hover:-translate-y-0.5 hover:shadow-white/25"
              >
                送信する
              </button>
            </form>
            <p className="mt-4 text-xs text-white/40">
              ※ 送信後、担当者より2営業日以内にご連絡いたします。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
