import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import neonLogo from '@/images/cambo-events-neon-logo.svg';
import Head from 'next/head';

export default function AuthPage() {
  return (
    <>
      <Head>
        <title>Login | Sign Up - Cambo Events</title>
        <meta
          name='description'
          content='Find, share and post events happening in Cambodia'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
        <meta property='og:title' content='Login | Sign Up - Cambo Events' />
        <meta
          property='og:description'
          content='Find, share and post events happening in Cambodia'
        />
        <meta property='og:image' content='/favicon.ico' />
      </Head>
      <div className='min-h-screen flex flex-col justify-center gap-20 items-center'>
        <Image
          className='h-30 w-fit'
          src={neonLogo}
          alt='Cambo Events logo'
          width={100}
          height={100}
        />
        <div className='flex flex-col md:flex-row md:justify-around w-[70%] sm:w-[300px] gap-6 text-lg'>
          <Link href='/auth/login'>
            <button className='rounded-lg bg-slate-500 text-white w-full hover:bg-slate-400 px-4 hover:scale-105 transition-all duration-200'>
              Login
            </button>
          </Link>
          <Link href='/auth/sign-up'>
            <button className='rounded-lg bg-slate-500 text-white w-full hover:bg-slate-400 px-4 hover:scale-105 transition-all duration-200'>
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
