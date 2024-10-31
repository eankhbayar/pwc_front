import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`${CONFIG.assetsDir}/assets/icons/navbar/${name}.svg`} />
);

const ICONS = {
  job: icon('ic-job'),
  blog: icon('ic-blog'),
  chat: icon('ic-chat'),
  mail: icon('ic-mail'),
  user: icon('ic-user'),
  file: icon('ic-file'),
  lock: icon('ic-lock'),
  tour: icon('ic-tour'),
  order: icon('ic-order'),
  label: icon('ic-label'),
  blank: icon('ic-blank'),
  kanban: icon('ic-kanban'),
  folder: icon('ic-folder'),
  course: icon('ic-course'),
  banking: icon('ic-banking'),
  booking: icon('ic-booking'),
  invoice: icon('ic-invoice'),
  product: icon('ic-product'),
  calendar: icon('ic-calendar'),
  disabled: icon('ic-disabled'),
  external: icon('ic-external'),
  menuItem: icon('ic-menu-item'),
  ecommerce: icon('ic-ecommerce'),
  analytics: icon('ic-analytics'),
  dashboard: icon('ic-dashboard'),
  parameter: icon('ic-parameter'),
};

// ----------------------------------------------------------------------

export const navData = [
  /**
   * Overview
   */
  {
    subheader: 'Overview',
    items: [
      { title: 'Student Profile', path: paths.dashboard.general.profile, icon: ICONS.user },
      { title: 'Exams', path: paths.dashboard.general.exam, icon: ICONS.folder },
      { title: 'My Course', path: paths.dashboard.general.course, icon: ICONS.course },
      { title: 'Appeal', path: paths.dashboard.general.appeal, icon: ICONS.chat },
      { title: 'Results', path: paths.dashboard.examresult('2022'), icon: ICONS.tour },
      { title: 'Respondents', path: paths.dashboard.respondents, icon: ICONS.calendar },
      { title: 'Monitor', path: paths.dashboard.monitor('2022'), icon: ICONS.kanban},
      { title: 'Exam Info', path: paths.dashboard.examinfo('2022'), icon: ICONS.kanban},
    ],
  },
];
