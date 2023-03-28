import React from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import {
  setAuthToken,
  setIsAuthenticated,
  setSavedEventIds,
  setSavedEvents,
  setUserId,
} from '@/store/user';

export default function DesktopLogoutButton() {
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
      onClick={handleLogout}
      className='text-gray-300 hover:bg-gray-600 bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
    >
      Logout
    </Link>
  );
}
