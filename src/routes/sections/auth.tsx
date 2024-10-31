import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AuthSplitLayout } from 'src/layouts/auth-split';

import { SplashScreen } from 'src/components/loading-screen';

import { GuestGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

/** **************************************
 * Amplify
 *************************************** */
const Amplify = {
  SignInPage: lazy(() => import('src/pages/auth/amplify/sign-in')),
  SignUpPage: lazy(() => import('src/pages/auth/amplify/sign-up')),
  VerifyPage: lazy(() => import('src/pages/auth/amplify/verify')),
  UpdatePasswordPage: lazy(() => import('src/pages/auth/amplify/update-password')),
  ResetPasswordPage: lazy(() => import('src/pages/auth/amplify/reset-password')),
};

const authAmplify = {
  path: 'amplify',
  children: [
    {
      path: 'sign-in',
      element: (
        <GuestGuard>
          <AuthSplitLayout section={{ title: 'Hi, Welcome back' }}>
            <Amplify.SignInPage />
          </AuthSplitLayout>
        </GuestGuard>
      ),
    },
    {
      path: 'sign-up',
      element: (
        <GuestGuard>
          <AuthSplitLayout>
            <Amplify.SignUpPage />
          </AuthSplitLayout>
        </GuestGuard>
      ),
    },
    {
      path: 'verify',
      element: (
        <AuthSplitLayout>
          <Amplify.VerifyPage />
        </AuthSplitLayout>
      ),
    },
    {
      path: 'reset-password',
      element: (
        <AuthSplitLayout>
          <Amplify.ResetPasswordPage />
        </AuthSplitLayout>
      ),
    },
    {
      path: 'update-password',
      element: (
        <AuthSplitLayout>
          <Amplify.UpdatePasswordPage />
        </AuthSplitLayout>
      ),
    },
  ],
};
// ----------------------------------------------------------------------

export const authRoutes = [
  {
    path: 'auth',
    element: (
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    ),
    children: [authAmplify],
  },
];
