import React, { useEffect } from 'react';
import Link from 'next/link';
import useFetch from '@/hooks/useFetch';
import LoadingSpinner from '@/components/layout/loading-spinner';
import { addAccessTokenToInterceptor } from '@/services/axios-config';
import {
  setAuthToken,
  setHasAccessTokenBeenAddedToInterceptor,
  setIsAuthenticated,
  setUserId,
} from '@/store/user';
import { UserAuthResponseUserDataType } from '@/utils/types';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import Head from 'next/head';

// https://developers.google.com/identity/gsi/web/reference/js-reference

export default function SignUp() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { handleGoogle, loading, error } = useFetch(
    `${process.env.NEXT_PUBLIC_API}/user/sign-up`
  );

  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user: UserAuthResponseUserDataType = JSON.parse(userString);
      addAccessTokenToInterceptor(user.token);
      dispatch(setHasAccessTokenBeenAddedToInterceptor(true));
      dispatch(setIsAuthenticated(true));
      dispatch(setUserId(user.id));
      dispatch(setAuthToken(user.token));
      router.replace('/');
    }
    /* global google */
    if ((global?.window as any).google) {
      (global?.window as any).google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: handleGoogle,
      });

      (global?.window as any).google.accounts.id.renderButton(
        document.getElementById('signUpDiv'),
        {
          theme: 'filled_black',
          text: 'continue_with',
          shape: 'pill',
        }
      );

      // google.accounts.id.prompt()
    }
  }, [handleGoogle]);

  return (
    <>
      <Head>
        <title>Sign Up - Cambo Events</title>
        <meta
          name='description'
          content='Find, share and post events happening in Cambodia'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
        <meta property='og:title' content='Sign Up - Cambo Events' />
        <meta
          property='og:description'
          content='Find, share and post events happening in Cambodia'
        />
        <meta property='og:image' content='/favicon.ico' />
      </Head>
      <div className='min-h-screen flex items-center justify-center'>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className='flex flex-col items-center gap-6'>
            <div id='signUpDiv' data-text='signup_with'></div>
            <p className='text-slate-300'>
              By signing up you agree to our{' '}
              <Link
                href='/privacy-policy'
                className='text-violet-400 underline'
              >
                privacy policy
              </Link>
            </p>
          </div>
        )}
      </div>
    </>
  );
}
