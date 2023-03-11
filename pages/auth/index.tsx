import React from 'react';
import Link from 'next/link';

export default function AuthPage() {
  return (
    <div className='min-h-screen flex justify-center items-center'>
      <div className='flex flex-col md:flex-row w-[70%] sm:w-[300px] gap-6 text-lg'>
        <Link href='/auth/login'>
          <button className='rounded-lg bg-slate-500 text-white w-full hover:bg-slate-400 hover:scale-105 transition-all duration-200'>
            Login
          </button>
        </Link>
        <Link href='/auth/sign-up'>
          <button className='rounded-lg bg-slate-500 text-white w-full hover:bg-slate-400 hover:scale-105 transition-all duration-200'>
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
}
