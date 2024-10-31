import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import CourseDetails from 'src/sections/overview/course/view/detail/course-page';

// ----------------------------------------------------------------------

const metadata = { title: `Course | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <CourseDetails />
    </>
  );
}