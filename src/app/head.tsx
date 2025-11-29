const siteName = "株式会社辰和運輸";
const defaultTitle =
  "株式会社辰和運輸 | 北海道恵庭市の運送・物流・産業廃棄物収集運搬";
const defaultDescription =
  "株式会社辰和運輸は、北海道恵庭市を拠点に札幌圏・道内一円の一般貨物輸送・重機輸送・産業廃棄物収集運搬を行う運送会社です。安全第一の輸送体制で、建設資材・機械・産廃の運搬をトータルにサポートします。";

// デプロイ先の本番 URL を .env で指定しておくと安全
// NEXT_PUBLIC_SITE_URL がなければ sinwaunyu.jp を既定値に
const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sinwaunyu.jp";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MovingCompany",
  name: siteName,
  url: baseUrl,
  description: defaultDescription,
  address: {
    "@type": "PostalAddress",
    streetAddress: "北柏木町5丁目2-1",
    addressLocality: "恵庭市",
    addressRegion: "北海道",
    postalCode: "061-1433",
    addressCountry: "JP",
  },
  telephone: "+81-123-33-5273",
  areaServed: [
    "札幌市",
    "恵庭市",
    "千歳市",
    "北広島市",
    "江別市",
    "北海道全域",
  ],
  sameAs: [
    // あれば公式サイトや SNS を追加
    "https://sinwaunyu.jp",
  ],
  // 主なサービス概要
  makesOffer: [
    {
      "@type": "Offer",
      name: "一般貨物自動車運送事業",
    },
    {
      "@type": "Offer",
      name: "産業廃棄物収集運搬業",
    },
  ],
};

export default function Head() {
  return (
    <>
      <title>{defaultTitle}</title>
      <meta name="description" content={defaultDescription} />
      {/* キーワードメタ（主要検索エンジンではほぼ無視されますが補助的に設定） */}
      <meta
        name="keywords"
        content="株式会社辰和運輸, 北海道, 恵庭市, 札幌, 運送, 物流, トラック, 重機輸送, 産業廃棄物収集運搬, 一般貨物自動車運送事業"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="format-detection" content="telephone=no" />

      {/* OGP / SNS シェア用 */}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={defaultTitle} />
      <meta property="og:description" content={defaultDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={baseUrl} />
      {/* サムネイル画像を用意したら差し替え 例: /images/ogp.jpg */}
      <meta property="og:image" content={`${baseUrl}/images/ogp.jpg`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={defaultTitle} />
      <meta name="twitter:description" content={defaultDescription} />
      <meta name="twitter:image" content={`${baseUrl}/images/ogp.jpg`} />

      {/* 構造化データ（JSON-LD） */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
