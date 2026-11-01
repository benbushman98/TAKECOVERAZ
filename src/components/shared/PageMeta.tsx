import { Helmet } from 'react-helmet-async';
import seo from '../../data/seo.json';

type PagePath = keyof typeof seo.pages;

interface PageMetaProps {
  /** A page listed in src/data/seo.json — titles and descriptions live there so the build can use them too. */
  path: PagePath;
}

function PageMeta({ path }: PageMetaProps) {
  const { title, description } = seo.pages[path];
  const url = path === '/' ? `${seo.baseUrl}/` : `${seo.baseUrl}${path}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:image:type" content="image/webp" />
      <meta property="og:image:alt" content="Take Cover! AZ band photo" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={seo.siteName} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={seo.image} />
    </Helmet>
  );
}

/** For pages that should never show up in search results (login, admin). */
export function NoIndex() {
  return (
    <Helmet>
      <meta name="robots" content="noindex, nofollow" />
    </Helmet>
  );
}

export default PageMeta;
