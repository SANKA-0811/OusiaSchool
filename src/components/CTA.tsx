'use client';

import { useState } from 'react';

export default function CTA() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

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
            {status === 'success' ? (
              <div className="py-12 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-400/20">
                  <svg className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">送信完了しました</h3>
                <p className="mb-6 text-sm text-white/70">
                  担当者より2営業日以内にご連絡いたします。
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="rounded-xl border border-white/30 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
                >
                  新しいお問い合わせ
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <input type="hidden" name="access_key" value={process.env.NEXT_PUBLIC_WEB3FORMS_KEY || 'YOUR_ACCESS_KEY'} />
                <input type="hidden" name="subject" value="Ousia School お問い合わせ" />
                <input type="hidden" name="from_name" value="Ousia School Website" />
                <div>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="お名前"
                    className="w-full rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-sm text-white placeholder-white/50 outline-none transition-colors focus:border-white/40 focus:bg-white/15"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="メールアドレス"
                    className="w-full rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-sm text-white placeholder-white/50 outline-none transition-colors focus:border-white/40 focus:bg-white/15"
                  />
                </div>
                <div>
                  <select
                    name="inquiry_type"
                    required
                    className="w-full rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-sm text-white/70 outline-none transition-colors focus:border-white/40 focus:bg-white/15"
                  >
                    <option value="">お問い合わせ内容を選択</option>
                    <option value="無料体験レッスンについて">無料体験レッスンについて</option>
                    <option value="平日プログラムについて">平日プログラムについて</option>
                    <option value="休日プログラムについて">休日プログラムについて</option>
                    <option value="その他">その他</option>
                  </select>
                </div>
                <div>
                  <textarea
                    name="message"
                    placeholder="メッセージ（任意）"
                    rows={4}
                    className="w-full resize-none rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-sm text-white placeholder-white/50 outline-none transition-colors focus:border-white/40 focus:bg-white/15"
                  />
                </div>

                {status === 'error' && (
                  <p className="text-sm text-red-300">
                    送信に失敗しました。もう一度お試しください。
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full rounded-xl bg-white py-4 text-base font-bold text-primary-700 shadow-2xl transition-all hover:-translate-y-0.5 hover:shadow-white/25 disabled:opacity-50 disabled:hover:translate-y-0"
                >
                  {status === 'sending' ? '送信中...' : '送信する'}
                </button>
              </form>
            )}
            {status !== 'success' && (
              <p className="mt-4 text-xs text-white/40">
                ※ 送信後、担当者より2営業日以内にご連絡いたします。
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
