import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import plainLogo from '@/images/cambo-events-plain-logo.svg';

export default function Footer() {
  return (
    <footer className='p-4 shadow md:px-6 md:py-8 bg-gray-800'>
      <div className='sm:flex sm:flex-row flex-col items-center justify-center sm:items-center sm:justify-between'>
        <Image
          src={plainLogo}
          className='h-8 w-fit mb-2 sm:px-0 px-4'
          alt='Cambo Events Logo'
          width={50}
          height={50}
        />
        <ul className='flex sm:flex-wrap flex-row justify-around items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400'>
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
      <span className='block text-sm text-gray-500 sm:text-center dark:text-gray-400'>
        © 2023{' '}
        <Link href='/' className='hover:underline'>
          CamboEvents
        </Link>
        . All Rights Reserved.
      </span>
    </footer>
  );
}
