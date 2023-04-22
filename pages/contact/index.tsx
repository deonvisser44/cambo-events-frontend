import CopyIcon from '@/components/icons/copy';
import Head from 'next/head';
import React from 'react';
import { toast } from 'react-toastify';

const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

export default function ContactPage() {
  const handleCopyEmail = () => {
    if (email) {
      navigator.clipboard.writeText(email);
      toast.info('Copied to clipboard');
    }
  };

  return (
    <>
      <Head>
        <title>Contact - Cambo Events</title>
        <meta
          name='description'
          content='Find, share and post events happening in Cambodia'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
        <meta property='og:title' content='Contact - Cambo Events' />
        <meta
          property='og:description'
          content='Find, share and post events happening in Cambodia'
        />
        <meta property='og:image' content='/favicon.ico' />
      </Head>
      <div className='min-h-screen flex flex-col justify-center items-center gap-5 text-xl text-center px-6'>
        <p className='text-slate-400'>
          For any issues or recommendations please reach out to me at
        </p>
        <div className='flex gap-3 text-md'>
          <p className='text-slate-300'>{email}</p>
          <button onClick={handleCopyEmail}>
            <CopyIcon />
          </button>
        </div>
      </div>
    </>
  );
}
