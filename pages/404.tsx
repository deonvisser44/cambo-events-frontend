import Link from 'next/link';
import React from 'react';

export default function PageNotFound() {
  return (
    <main className='flex flex-col min-h-screen px-8 gap-8 pt-[25%]'>
      <h1 className='text-3xl text-slate-200 font-bold'>Oops!</h1>
      <h3 className='text-2xl text-slate-300'>
        The page you're looking for does not exist!
      </h3>
      <Link
        className='rounded-lg bg-slate-500 text-white w-fit self-center mt-20 py-1 px-4 text-lg hover:bg-slate-400 hover:scale-105 transition-all duration-200'
        href='/'
      >
        Home
      </Link>
    </main>
  );
}
