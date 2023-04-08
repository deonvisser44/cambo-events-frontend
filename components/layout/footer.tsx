import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import plainLogo from '@/images/cambo-events-plain-logo.svg';

export default function Footer() {
  return (
    <footer className='p-4 shadow md:px-6 md:py-8 bg-gray-800'>
      <div className='flex flex-col items-center'>
        <Image
          src={plainLogo}
          className='h-8 md:h-12 w-fit justify-self-center self-center mb-2 sm:px-0 px-4'
          alt='Cambo Events Logo'
          width={50}
          height={50}
        />
        <ul className='w-full md:w-1/4 flex sm:flex-wrap flex-row justify-around items-center text-sm text-gray-500 sm:mb-0 dark:text-gray-400'>
          <li>
            <Link
              href='/privacy-policy'
              className='mr-4 hover:underline md:mr-6'
            >
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link href='/contact' className='hover:underline'>
              Contact
            </Link>
          </li>
        </ul>
      </div>
      <hr className='my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8' />
      <span className='block text-sm w-full text-gray-500 text-center dark:text-gray-400'>
        © 2023 CamboEvents. All Rights Reserved.
      </span>
    </footer>
  );
}
