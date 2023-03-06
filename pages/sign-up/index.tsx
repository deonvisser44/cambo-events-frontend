import React, { useEffect } from 'react';
import Link from 'next/link';
import useFetch from '@/hooks/useFetch';

// https://developers.google.com/identity/gsi/web/reference/js-reference

export default function SignUp() {
  const { handleGoogle, loading, error } = useFetch(
    'http://localhost:3009/user/sign-up'
  );

  useEffect(() => {
    /* global google */
    if ((window as any).google) {
      (window as any).google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: handleGoogle,
      });

      (window as any).google.accounts.id.renderButton(
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
    <>
      <nav style={{ padding: '2rem' }}>
        <Link href='/'>Go Back</Link>
      </nav>
      <header style={{ textAlign: 'center' }}>
        <h1>Register to continue</h1>
      </header>
      <main
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {loading ? (
          <div>Loading....</div>
        ) : (
          <div id='signUpDiv' data-text='signup_with'></div>
        )}
      </main>
      <footer></footer>
    </>
  );
}
