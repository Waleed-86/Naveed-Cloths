import { Helmet } from 'react-helmet-async'

const SITE_NAME = 'SILA'
const DEFAULT_DESCRIPTION = 'Premium Pakistani fashion for men and women — from everyday essentials to fully embroidered formal wear, delivered nationwide.'
const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://sila.pk'

export default function Seo({ title, description = DEFAULT_DESCRIPTION, path = '', image, noindex = false }) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Premium Pakistani Fashion`
  const canonicalUrl = `${SITE_URL}${path}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={path.startsWith('/product/') ? 'product' : 'website'} />
      {image && <meta property="og:image" content={image} />}

      <meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  )
}