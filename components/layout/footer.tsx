import React from 'react';
import Image from 'next/image';
import logo from '@/images/camboevents.png'

export default function Footer() {
  return (
    <footer className='p-4 shadow md:px-6 md:py-8 bg-gray-800'>
      <div className='sm:flex sm:items-center sm:justify-between'>
          <Image
            src={logo}
            className='h-8 w-fit mb-2'
            alt='Flowbite Logo'
            width={50}
            height={50}
          />
        <ul className='flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400'>
          <li>
            <a href='#' className='mr-4 hover:underline md:mr-6 '>
              About
            </a>
          </li>
          <li>
            <a href='#' className='mr-4 hover:underline md:mr-6'>
              Privacy Policy
            </a>
          </li>
          <li>
            <a href='#' className='hover:underline'>
              Contact
            </a>
          </li>
        </ul>
      </div>
      <hr className='my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8' />
      <span className='block text-sm text-gray-500 sm:text-center dark:text-gray-400'>
        © 2023{' '}
        <a href='https://flowbite.com/' className='hover:underline'>
          CamboEvents
        </a>
        . All Rights Reserved.
      </span>
    </footer>
  );
}
