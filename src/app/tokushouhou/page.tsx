import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '特定商取引法に基づく表記',
  description: 'Ousia Schoolの特定商取引法に基づく表記。',
};

export default function TokushouhouPage() {
  return (
    <main className="min-h-screen bg-white px-4 pb-20 pt-32 sm:px-6 lg:px-8">
      <div className="container-max">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-10 text-3xl font-extrabold text-gray-900">特定商取引法に基づく表記</h1>

          <div className="overflow-hidden rounded-2xl border border-gray-200">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <th className="whitespace-nowrap bg-gray-50 px-6 py-4 text-left font-semibold text-gray-900">
                    事業者名
                  </th>
                  <td className="px-6 py-4 text-gray-700">Ousia School</td>
                </tr>
                <tr>
                  <th className="whitespace-nowrap bg-gray-50 px-6 py-4 text-left font-semibold text-gray-900">
                    代表者
                  </th>
                  <td className="px-6 py-4 text-gray-700">大場 周斗</td>
                </tr>
                <tr>
                  <th className="whitespace-nowrap bg-gray-50 px-6 py-4 text-left font-semibold text-gray-900">
                    所在地
                  </th>
                  <td className="px-6 py-4 text-gray-700">
                    請求があった場合、遅滞なく開示いたします。
                  </td>
                </tr>
                <tr>
                  <th className="whitespace-nowrap bg-gray-50 px-6 py-4 text-left font-semibold text-gray-900">
                    連絡先
                  </th>
                  <td className="px-6 py-4 text-gray-700">
                    メール：shuto.oba.ousia@gmail.com<br />
                    ※お問い合わせはメールにてお願いいたします。
                  </td>
                </tr>
                <tr>
                  <th className="whitespace-nowrap bg-gray-50 px-6 py-4 text-left font-semibold text-gray-900">
                    販売価格
                  </th>
                  <td className="px-6 py-4 text-gray-700">
                    各プログラムの料金は、お問い合わせ時にご案内いたします。
                  </td>
                </tr>
                <tr>
                  <th className="whitespace-nowrap bg-gray-50 px-6 py-4 text-left font-semibold text-gray-900">
                    販売価格以外の必要料金
                  </th>
                  <td className="px-6 py-4 text-gray-700">
                    インターネット接続料金、通信料金はお客様のご負担となります。
                  </td>
                </tr>
                <tr>
                  <th className="whitespace-nowrap bg-gray-50 px-6 py-4 text-left font-semibold text-gray-900">
                    支払方法
                  </th>
                  <td className="px-6 py-4 text-gray-700">
                    銀行振込、クレジットカード決済
                  </td>
                </tr>
                <tr>
                  <th className="whitespace-nowrap bg-gray-50 px-6 py-4 text-left font-semibold text-gray-900">
                    支払時期
                  </th>
                  <td className="px-6 py-4 text-gray-700">
                    お申し込み後、指定期日までにお支払いください。
                  </td>
                </tr>
                <tr>
                  <th className="whitespace-nowrap bg-gray-50 px-6 py-4 text-left font-semibold text-gray-900">
                    サービス提供時期
                  </th>
                  <td className="px-6 py-4 text-gray-700">
                    お支払い確認後、次回開講日よりサービスを提供いたします。
                  </td>
                </tr>
                <tr>
                  <th className="whitespace-nowrap bg-gray-50 px-6 py-4 text-left font-semibold text-gray-900">
                    返品・キャンセル
                  </th>
                  <td className="px-6 py-4 text-gray-700">
                    サービスの性質上、受講開始後の返金はいたしかねます。
                    受講開始前のキャンセルについては、お問い合わせください。
                  </td>
                </tr>
              </tbody>
            </table>
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
