import React, { useEffect } from 'react';
import Link from 'next/link';
import useFetch from '@/hooks/useFetch';
import LoadingSpinner from '@/components/layout/loading-spinner';

// https://developers.google.com/identity/gsi/web/reference/js-reference

export default function SignUp() {
  const { handleGoogle, loading, error } = useFetch(
    `${process.env.NEXT_PUBLIC_API}/user/sign-up`
  );

  useEffect(() => {
    /* global google */
    if ((global?.window as any).google) {
      (global?.window as any).google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: handleGoogle,
      });

      (global?.window as any).google.accounts.id.renderButton(
        document.getElementById('signUpDiv'),
        {
          // type: "standard",
          theme: 'filled_black',
          // size: "small",
          text: 'continue_with',
          shape: 'pill',
        }
      );

      // google.accounts.id.prompt()
    }
  }, [handleGoogle]);

  return (
    <div className='min-h-screen flex items-center justify-center'>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className='flex flex-col items-center gap-6'>
          <div id='signUpDiv' data-text='signup_with'></div>
          <p className='text-slate-300'>
            By signing up you agree to our{' '}
            <Link href='/privacy-policy' className='text-violet-400 underline'>
              privacy policy
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
