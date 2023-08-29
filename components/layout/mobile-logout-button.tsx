import React from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import {
  setAuthToken,
  setIsAuthenticated,
  setUserId,
} from '@/store/user';
import { setSavedEventIds, setSavedEvents } from '@/store/events';

interface Props {
  setIsOpen: (value: boolean) => void;
}

export default function MobileLogoutButton({ setIsOpen }: Props) {
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('user');
    dispatch(setIsAuthenticated(false));
    dispatch(setUserId(''));
    dispatch(setAuthToken(''));
    dispatch(setSavedEventIds([]));
    dispatch(setSavedEvents([]));
  };

  return (
    <Link
      href='/'
      onClick={() => {
        setIsOpen(false);
        handleLogout();
      }}
      className='hover:bg-gray-700 text-gray-400 block px-3 py-2 rounded-md text-base font-medium'
    >
      Logout
    </Link>
  );
}
