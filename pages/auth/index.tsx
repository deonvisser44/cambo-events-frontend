import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import neonLogo from '@/images/cambo-events-neon-logo.svg';

export default function AuthPage() {
  return (
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
  );
}
