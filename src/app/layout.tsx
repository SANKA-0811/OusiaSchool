import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ousia School | 英語×AIで未来を切り拓く',
  description:
    'OusiaSchoolは、平日の英語試験対策と休日のAI×英語探究学習を組み合わせた、次世代のオンラインスクールです。グローバルに通用する英語力とAIリテラシーを同時に身につけましょう。',
  keywords: '英語, AI, オンラインスクール, 探究学習, 英語試験対策, グローバル教育',
  openGraph: {
    title: 'Ousia School | 英語×AIで未来を切り拓く',
    description:
      '平日は英語試験対策、休日はAI×英語の探究学習。次世代のオンラインスクール。',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
