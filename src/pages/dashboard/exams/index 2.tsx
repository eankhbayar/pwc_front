import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import ExamOverview from 'src/sections/overview/exam-overview/exams-overview';

// ----------------------------------------------------------------------

const metadata = { title: `Student profile | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <ExamOverview />
    </>
  );
}
