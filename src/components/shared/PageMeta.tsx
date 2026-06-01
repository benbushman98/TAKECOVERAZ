import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'Take Cover! AZ';
const BASE_URL = 'https://takecoveraz.com';
const DEFAULT_IMAGE = `${BASE_URL}/images/theBand.webp`;
const DEFAULT_DESCRIPTION =
  'A high-energy rock/pop cover band performing across Arizona. Check out upcoming shows, hear samples, and book us for your next event.';

interface PageMetaProps {
  title: string;
  description?: string;
  path?: string;
  image?: string;
}

function PageMeta({ title, description = DEFAULT_DESCRIPTION, path = '', image = DEFAULT_IMAGE }: PageMetaProps) {
  const fullTitle = path === '' ? `${SITE_NAME} — High Energy Arizona Cover Band` : `${title} | ${SITE_NAME}`;
  const url = `${BASE_URL}${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:type" content="image/webp" />
      <meta property="og:image:alt" content="Take Cover! AZ band photo" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}

export default PageMeta;
