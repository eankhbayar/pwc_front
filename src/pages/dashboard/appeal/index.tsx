import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import Appeal from 'src/sections/overview/appeal/appeal-view';

// ----------------------------------------------------------------------

const metadata = { title: `Student profile | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <Appeal />
    </>
  );
}
