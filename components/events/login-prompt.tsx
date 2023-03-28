import React from 'react';
import Link from 'next/link';

interface Props {
  text: string;
}

export default function LoginPrompt({ text }: Props) {

  return (
    <div className='flex flex-col justify-around items-center min-h-screen px-4'>
      <p className='text-white text-2xl text-center'>{text}</p>
      <Link href='/auth/login'>
        <button className='rounded-lg bg-slate-500 text-white w-full py-1 px-4 text-lg hover:bg-slate-400 hover:scale-105 transition-all duration-200'>
          Login
        </button>
      </Link>
    </div>
  );
}
