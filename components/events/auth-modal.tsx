import React from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { setIsAuthModalOpen } from '@/store/user';


export default function AuthModal() {
  const dispatch = useDispatch();

  const handleModalDivClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleCloseAuthModal = () => {
    dispatch(setIsAuthModalOpen(false))
  }

  return (
    <div
      className=' bg-gray-400 bg-opacity-75 z-50 fixed top-0 left-0 flex items-center w-full h-full'
      onClick={handleCloseAuthModal}
    >
      <div
        className='bg-slate-600 rounded-md gap-5 flex flex-col justify-around p-4 mx-auto my-auto w-4/5 md:w-1/5 min-h-[350px] md:min-h-[300px]'
        onClick={handleModalDivClick}
      >
        <p className='text-xl font-semibold text-left text-white'>
          Please login or sign up to save events.
        </p>
        <div className='flex flex-row gap-2 w-full'>
          <Link className='w-1/2' href='auth/sign-up'>
            <button
              className='text-lg bg-gray-400 hover:bg-gray-300 text-white w-full px-3 py-1 rounded-md'
              onClick={handleCloseAuthModal}
            >
              Sign Up
            </button>
          </Link>
          <Link className='w-1/2' href='/auth/login'>
            <button
              className='text-lg bg-gray-400 hover:bg-gray-300 text-white w-full px-3 py-1 rounded-md'
              onClick={handleCloseAuthModal}
            >
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
