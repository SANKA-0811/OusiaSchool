import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'プライバシーポリシー',
  description: 'Ousia Schoolのプライバシーポリシー。個人情報の取り扱いについてご説明します。',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white px-4 pb-20 pt-32 sm:px-6 lg:px-8">
      <div className="container-max">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-10 text-3xl font-extrabold text-gray-900">プライバシーポリシー</h1>

          <div className="space-y-10 text-sm leading-relaxed text-gray-700">
            <p>
              Ousia School（以下「当スクール」）は、お客様の個人情報の保護を重要と考え、
              以下のとおりプライバシーポリシーを定めます。
            </p>

            <section>
              <h2 className="mb-3 text-lg font-bold text-gray-900">1. 個人情報の収集</h2>
              <p>
                当スクールは、お問い合わせやお申し込みの際に、氏名、メールアドレス等の個人情報を
                お伺いすることがあります。これらの情報は、適法かつ公正な手段により収集いたします。
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-bold text-gray-900">2. 個人情報の利用目的</h2>
              <p>収集した個人情報は、以下の目的で利用いたします。</p>
              <ul className="mt-2 list-inside list-disc space-y-1 pl-4">
                <li>お問い合わせへの回答・対応</li>
                <li>サービスの提供・運営</li>
                <li>サービスに関するご案内・お知らせの送付</li>
                <li>サービスの改善・新サービスの開発</li>
                <li>その他、上記利用目的に付随する業務</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-bold text-gray-900">3. 個人情報の第三者提供</h2>
              <p>
                当スクールは、法令に基づく場合を除き、お客様の同意なく個人情報を第三者に提供することは
                ありません。
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-bold text-gray-900">4. 個人情報の管理</h2>
              <p>
                当スクールは、個人情報の正確性及び安全性を確保するために、セキュリティ対策を講じ、
                個人情報の漏洩、滅失又はき損の防止に努めます。
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-bold text-gray-900">5. Cookie（クッキー）の使用</h2>
              <p>
                当スクールのウェブサイトでは、サービスの利便性向上やアクセス解析のためにCookieを
                使用することがあります。Cookieの使用を希望されない場合は、ブラウザの設定により
                Cookieを無効にすることが可能です。
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-bold text-gray-900">6. アクセス解析ツール</h2>
              <p>
                当スクールのウェブサイトでは、Googleアナリティクスを使用しています。
                Googleアナリティクスはデータの収集のためにCookieを使用しています。
                このデータは匿名で収集されており、個人を特定するものではありません。
                詳細については、
                <a
                  href="https://policies.google.com/technologies/partner-sites"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 underline hover:text-primary-700"
                >
                  Googleのサービスを使用するサイトやアプリから収集した情報のGoogleによる使用
                </a>
                をご覧ください。
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-bold text-gray-900">7. プライバシーポリシーの変更</h2>
              <p>
                当スクールは、必要に応じて本ポリシーを変更することがあります。
                変更後のプライバシーポリシーは、当ウェブサイトに掲載した時点から効力を生じます。
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-bold text-gray-900">8. お問い合わせ</h2>
              <p>
                個人情報の取り扱いに関するお問い合わせは、以下の連絡先までお願いいたします。
              </p>
              <p className="mt-2">
                Ousia School<br />
                メール：shuto.oba.ousia@gmail.com
              </p>
            </section>

            <p className="text-gray-500">制定日：2026年2月18日</p>
          </div>

          <div className="mt-12">
            <a href="/" className="text-sm font-medium text-primary-600 hover:text-primary-700">
              &larr; トップページに戻る
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
