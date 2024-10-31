import { paths } from 'src/routes/paths';

import packageJson from '../package.json';

// ----------------------------------------------------------------------

export type ConfigValue = {
  appName: string;
  appVersion: string;
  serverUrl: string;
  assetsDir: string;
  auth: {
    method: 'jwt' | 'amplify';
    skip: boolean;
    redirectPath: string;
  };
  amplify: { userPoolId: string; userPoolWebClientId: string; region: string, storageRegion: string, storageBucket: string };
};

// ----------------------------------------------------------------------

export const CONFIG: ConfigValue = {
  appName: 'PwC',
  appVersion: packageJson.version,
  serverUrl: import.meta.env.VITE_SERVER_URL ?? '',
  assetsDir: import.meta.env.VITE_ASSETS_DIR ?? '',
  auth: {
    method: 'amplify',
    skip: false,
    redirectPath: paths.dashboard.root,
  },
  /**
   * Amplify
   */
  amplify: {
    userPoolId: import.meta.env.VITE_AWS_AMPLIFY_USER_POOL_ID ?? '',
    userPoolWebClientId: import.meta.env.VITE_AWS_AMPLIFY_USER_POOL_WEB_CLIENT_ID ?? '',
    region: import.meta.env.VITE_AWS_AMPLIFY_REGION ?? '',
    storageRegion: import.meta.env.VITE_AWS_AMPLIFY_STORAGE_REGION ?? '',
    storageBucket: import.meta.env.VITE_AWS_AMPLIFY_STORAGE_BUCKET ?? '',
  },
};
