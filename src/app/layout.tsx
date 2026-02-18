import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || '';

const SITE_URL = 'https://ousia-school.ai';
const SITE_NAME = 'Ousia School';
const SITE_DESCRIPTION =
  'Ousia Schoolは、平日の英語試験対策（英検・TOEIC・TOEFL・大学入試）と休日のAI×英語探究学習を組み合わせた、次世代のオンラインスクールです。AIによる個別最適化学習で、グローバルに通用する英語力とAIリテラシーを同時に身につけましょう。';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Ousia School | 英語×AIで未来を切り拓く次世代オンラインスクール',
    template: '%s | Ousia School',
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'Ousia School',
    'ウーシアスクール',
    '英語 オンラインスクール',
    'AI 英語学習',
    '英検対策',
    'TOEIC対策',
    'TOEFL対策',
    '大学入試 英語',
    '探究学習',
    'PBL',
    'グローバル教育',
    'オンライン塾',
    'AI教育',
    '英語×AI',
    '小学生 英語',
    '中学生 英語',
    '高校生 英語',
    'オンライン英語塾',
    '英語 個別指導 オンライン',
    'AI個別最適化学習',
    '英検 オンライン対策',
    'TOEFL 小学生',
    'TOEIC 中学生',
    '英語4技能',
    '探究型学習 英語',
    'プロジェクト型学習 英語',
    'グローバル人材育成',
    '子供 英語 AI',
    '英語塾 おすすめ',
    'オンラインスクール 英語 子供',
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'Ousia School | 英語×AIで未来を切り拓く次世代オンラインスクール',
    description:
      '平日は英検・TOEIC・TOEFL等の試験対策をAIがサポート。休日はAI×英語の探究学習でグローバルに挑戦。完全オンラインの次世代スクール。',
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Ousia School - 英語×AIで未来を切り拓く',
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ousia School | 英語×AIで未来を切り拓く',
    description:
      '平日は英語試験対策、休日はAI×英語の探究学習。AIによる個別最適化で効率的に学べるオンラインスクール。',
    images: ['/og-image.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// JSON-LD structured data for SEO and AIO/LLMO
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Ousia School',
  alternateName: 'ウーシアスクール',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.svg`,
  description: SITE_DESCRIPTION,
  email: 'shuto.oba.ousia@gmail.com',
  foundingDate: '2026',
  areaServed: {
    '@type': 'Country',
    name: 'Japan',
  },
  serviceType: 'オンライン英語・AI教育',
  knowsAbout: [
    '英語教育',
    'AI教育',
    '探究学習',
    'PBL（課題解決型学習）',
    '英検対策',
    'TOEIC対策',
    'TOEFL対策',
    '大学入試英語対策',
  ],
};

const courseWeekdayJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'Ousia School 平日プログラム ─ 英語試験対策',
  description:
    'AIを活用した個別最適化学習で、英検・TOEIC・TOEFL・大学入試など、目標に合わせた英語試験対策をサポート。弱点を自動分析し、最も効率的な学習プランを提供します。',
  provider: {
    '@type': 'EducationalOrganization',
    name: 'Ousia School',
    url: SITE_URL,
  },
  educationalLevel: '小学生・中学生・高校生',
  inLanguage: 'ja',
  courseMode: 'online',
  schedule: {
    '@type': 'Schedule',
    byDay: ['Tuesday', 'Thursday'],
    startTime: '19:00',
    endTime: '20:30',
    scheduleTimezone: 'Asia/Tokyo',
  },
};

const courseWeekendJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'Ousia School 休日プログラム ─ AI×英語 探究学習',
  description:
    '英語を使ってAIと協働しながら、世界の課題に取り組む探究学習。海外の生徒との共同プロジェクトやAIツールを活用したクリエイティブな学びを体験します。',
  provider: {
    '@type': 'EducationalOrganization',
    name: 'Ousia School',
    url: SITE_URL,
  },
  educationalLevel: '小学生・中学生・高校生',
  inLanguage: ['ja', 'en'],
  courseMode: 'online',
  schedule: {
    '@type': 'Schedule',
    byDay: ['Saturday'],
    startTime: '13:00',
    endTime: '17:00',
    scheduleTimezone: 'Asia/Tokyo',
  },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Ousia Schoolとはどんなスクールですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ousia School（ウーシアスクール）は、平日の英語試験対策（英検・TOEIC・TOEFL・大学入試）と休日のAI×英語探究学習を組み合わせた、完全オンラインの次世代スクールです。AIによる個別最適化学習で、効率的に英語力とAIリテラシーを身につけられます。',
      },
    },
    {
      '@type': 'Question',
      name: '授業のスケジュールはどうなっていますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '平日プログラム（英語試験対策）は火曜・木曜の19:00〜20:30（90分）、休日プログラム（AI×英語探究学習）は土曜の13:00〜17:00（4時間）です。',
      },
    },
    {
      '@type': 'Question',
      name: 'どのような試験対策ができますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '英検、TOEIC、TOEFL、大学入試英語に対応しています。AIが弱点を自動分析し、個別に最適化された学習プランを提供します。リアルタイムフィードバックで効率的に学習できます。',
      },
    },
    {
      '@type': 'Question',
      name: '完全オンラインで受講できますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'はい、完全オンラインで受講可能です。自宅から参加でき、海外からの受講も歓迎しています。高品質なオンライン授業環境を提供しています。',
      },
    },
    {
      '@type': 'Question',
      name: '休日の探究学習ではどんなことをしますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '英語を使ってAIツールを活用しながら、グローバルな課題に取り組む探究型PBL（課題解決型学習）を行います。海外の生徒との共同プロジェクト、英語プレゼンテーション、ディスカッションなどを通じて実践的な英語力を磨きます。',
      },
    },
  ],
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  alternateName: 'ウーシアスクール',
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  inLanguage: 'ja',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Noto+Sans+JP:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(courseWeekdayJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(courseWeekendJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
      </head>
      <body>
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        )}
        {children}
      </body>
    </html>
  );
}
