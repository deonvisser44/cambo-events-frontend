import React, { useEffect } from 'react';
import useFetch from '@/hooks/useFetch';
import { addAccessTokenToInterceptor } from '@/services/axios-config';
import { useDispatch } from 'react-redux';
import {
  setAuthToken,
  setHasAccessTokenBeenAddedToInterceptor,
  setIsAuthenticated,
  setUserId,
} from '@/store/user';
import { UserAuthResponseUserDataType } from '@/utils/types';
import { useRouter } from 'next/router';
import LoadingSpinner from '@/components/layout/loading-spinner';
import Head from 'next/head';

// https://developers.google.com/identity/gsi/web/reference/js-reference

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { handleGoogle, loading, error } = useFetch(
    `${process.env.NEXT_PUBLIC_API}/user/login`
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
      (window as any).google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: handleGoogle,
      });

      (global?.window as any).google.accounts.id.renderButton(
        document.getElementById('loginDiv'),
        {
          // type: "standard",
          theme: 'filled_black',
          // size: "small",
          text: 'signin_with',
          shape: 'pill',
        }
      );

      // google.accounts.id.prompt()
    }
  }, [handleGoogle]);

  return (
    <>
      <Head>
        <title>Login - Cambo Events</title>
        <meta
          name='description'
          content='Find, share and post events happening in Cambodia'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
        <meta property='og:title' content='Login - Cambo Events' />
        <meta
          property='og:description'
          content='Find, share and post events happening in Cambodia'
        />
        <meta property='og:image' content='/favicon.ico' />
      </Head>
      <div className='min-h-screen flex items-center justify-center'>
        {loading ? <LoadingSpinner /> : <div id='loginDiv'></div>}
      </div>
    </>
  );
}
