import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import StudentProfile from 'src/sections/overview/student-profile/view/student-profile-view';

// ----------------------------------------------------------------------

const metadata = { title: `Student profile | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <StudentProfile />
    </>
  );
}
