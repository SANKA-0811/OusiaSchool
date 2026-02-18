export default function Footer() {
  return (
    <footer className="bg-gray-900 px-4 py-16 sm:px-6 lg:px-8">
      <div className="container-max">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-4 flex items-center gap-2.5">
              <img src="/favicon.svg" alt="" width={40} height={40} className="h-10 w-10" />
              <span className="text-xl font-bold text-white">
                Ousia<span className="text-primary-400">School</span>
              </span>
            </div>
            <p className="mb-6 max-w-sm text-sm leading-relaxed text-gray-400">
              英語&times;AIで未来を切り拓く。平日の試験対策と休日の探究学習を
              組み合わせた、次世代のオンラインスクールです。
            </p>
            <div className="flex gap-4">
              <a
                href="https://lin.ee/MUsIV0Q"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LINE公式アカウント"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#06C755] text-white transition-opacity hover:opacity-80"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-300">
              プログラム
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#programs" className="text-sm text-gray-400 transition-colors hover:text-white">
                  平日プログラム
                </a>
              </li>
              <li>
                <a href="#programs" className="text-sm text-gray-400 transition-colors hover:text-white">
                  休日プログラム
                </a>
              </li>
              <li>
                <a href="#features" className="text-sm text-gray-400 transition-colors hover:text-white">
                  特長
                </a>
              </li>
              <li>
                <a href="#contact" className="text-sm text-gray-400 transition-colors hover:text-white">
                  無料体験
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-300">
              サポート
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-gray-400 transition-colors hover:text-white">
                  よくある質問
                </a>
              </li>
              <li>
                <a href="#contact" className="text-sm text-gray-400 transition-colors hover:text-white">
                  お問い合わせ
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-sm text-gray-400 transition-colors hover:text-white">
                  プライバシーポリシー
                </a>
              </li>
              <li>
                <a href="/tokushouhou" className="text-sm text-gray-400 transition-colors hover:text-white">
                  特定商取引法に基づく表記
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-gray-800 pt-8 text-center">
          <p className="text-sm text-gray-500">
            &copy; 2026 Ousia School. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
