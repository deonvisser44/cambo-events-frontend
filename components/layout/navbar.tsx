import Image from 'next/image';
import MobileNavButton from './mobile-nav-button';
import React, { useState, useRef, useEffect } from 'react';
import DesktopNavButton from './desktop-nav-button';
import { useSelector } from 'react-redux';
import { selectUserState } from '@/store/user';
import { UserStateType } from '@/utils/types';
import MobileLogoutButton from './mobile-logout-button';
import DesktopLogoutButton from './desktop-logout-button';
import { useRouter } from 'next/router';
import logo from '@/images/camboevents.png'

export default function NavBar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const navRev = useRef<HTMLDivElement>(null);
  const userState: UserStateType = useSelector(selectUserState);
  const ref = useRef<HTMLDivElement>(null);

  const handleNavigateToHome = () => {
    router.replace('/');
  };

  // disable scroll when mobile menu is open
  useEffect(() => {
    isOpen
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'auto');
  }, [isOpen]);

  // close mobile menu if clicked outside nav component
  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  return (
    <nav ref={ref} className='bg-gray-800 z-50'>
      {/* desktop nav */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center'>
            <div className='flex-shrink-0'>
              <button onClick={handleNavigateToHome}>
                <Image
                  className='h-8 w-fit'
                  src={logo}
                  alt='Cambo Events logo'
                  width={50}
                  height={50}
                />
              </button>
            </div>
            <div className='hidden md:block'>
              <div className='ml-10 flex items-baseline space-x-4'>
                <DesktopNavButton label='Events' path='/' />
                <DesktopNavButton label='Post Event' path='/post-event' />
                <DesktopNavButton label='Saved Events' path='/saved-events' />
                <DesktopNavButton label='My Events' path='/my-events' />
                <DesktopNavButton label='Contact' path='/contact' />
                {userState?.isUserAuthenticated ? (
                  <DesktopLogoutButton />
                ) : (
                  <DesktopNavButton label='Login / Sign Up' path='/auth' />
                )}
              </div>
            </div>
          </div>
          <div className='-mr-2 flex md:hidden'>
            <button
              onClick={() => setIsOpen(!isOpen)}
              type='button'
              className='bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
              aria-controls='mobile-menu'
              aria-expanded='false'
            >
              <span className='sr-only'>Open main menu</span>
              {!isOpen ? (
                <svg
                  className='block h-6 w-6'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  aria-hidden='true'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                </svg>
              ) : (
                <svg
                  className='block h-6 w-6'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  aria-hidden='true'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* mobile drop down nav */}
      {isOpen && (
        <div
          className='md:hidden fixed z-50 bg-gray-800 w-[100%]'
          id='mobile-menu'
        >
          <div ref={navRev} className='px-2 pt-2 pb-3 space-y-1 sm:px-3 z-20'>
            <MobileNavButton setIsOpen={setIsOpen} label='Events' path='/' />
            <MobileNavButton
              setIsOpen={setIsOpen}
              label='Post Event'
              path='/post-event'
            />
            <MobileNavButton
              setIsOpen={setIsOpen}
              label='Saved Events'
              path='/saved-events'
            />
            <MobileNavButton
              setIsOpen={setIsOpen}
              label='My Events'
              path='/my-events'
            />
            <MobileNavButton
              setIsOpen={setIsOpen}
              label='Contact'
              path='/contact'
            />
            {userState?.isUserAuthenticated ? (
              <MobileLogoutButton setIsOpen={setIsOpen} />
            ) : (
              <MobileNavButton
                setIsOpen={setIsOpen}
                label='Login / Sign Up'
                path='/auth'
              />
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
