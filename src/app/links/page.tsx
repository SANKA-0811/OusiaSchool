import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ousia School リンク集',
  description: 'Ousia School の公式リンク集。ウェブサイト・紹介資料・お問い合わせなど。',
};

const links = [
  {
    href: '/',
    label: '公式ウェブサイト',
    desc: 'Ousia School トップページ',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    style: 'bg-white text-gray-900 border-2 border-gray-100 hover:border-primary-300',
    labelStyle: 'text-gray-900',
    descStyle: 'text-gray-500',
  },
  {
    href: '/intro',
    label: '学校紹介資料',
    desc: 'コンセプト・プログラム・特長を詳しく',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    style: 'bg-gradient-to-r from-primary-600 to-accent-600 text-white hover:opacity-90',
    labelStyle: 'text-white',
    descStyle: 'text-white/70',
  },
  {
    href: '/#contact',
    label: '無料相談を申し込む',
    desc: 'まずはお気軽にご相談ください',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    style: 'bg-emerald-500 text-white hover:bg-emerald-600',
    labelStyle: 'text-white',
    descStyle: 'text-white/70',
  },
  {
    href: '/#concept',
    label: 'プログラム詳細',
    desc: '平日・休日プログラムの内容',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    style: 'bg-white text-gray-900 border-2 border-gray-100 hover:border-primary-300',
    labelStyle: 'text-gray-900',
    descStyle: 'text-gray-500',
  },
  {
    href: '/#testimonials',
    label: '生徒の声・実績',
    desc: '受講生のリアルな声とスコアアップ実績',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
    style: 'bg-white text-gray-900 border-2 border-gray-100 hover:border-primary-300',
    labelStyle: 'text-gray-900',
    descStyle: 'text-gray-500',
  },
];

export default function LinksPage() {
  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm">

        {/* Logo / Title */}
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
            <span className="text-2xl font-extrabold text-white">O</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">Ousia School</h1>
          <p className="mt-1 text-sm text-white/60 tracking-wider">OIS — Discovering the Essence</p>
        </div>

        {/* Links */}
        <div className="space-y-3">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`flex w-full items-center gap-4 rounded-2xl px-5 py-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${link.style}`}
            >
              <div className="shrink-0">{link.icon}</div>
              <div className="min-w-0 flex-1">
                <div className={`font-bold ${link.labelStyle}`}>{link.label}</div>
                <div className={`text-xs ${link.descStyle}`}>{link.desc}</div>
              </div>
              <svg className={`h-4 w-4 shrink-0 opacity-50 ${link.labelStyle}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-white/30">
          © 2025 Ousia School. All rights reserved.
        </p>
      </div>
    </div>
  );
}
