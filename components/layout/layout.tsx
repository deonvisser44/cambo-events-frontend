import React from 'react';
import Footer from './footer';
import Navbar from './navbar';
import Script from 'next/script';
import { useDispatch } from 'react-redux';
import { setAuthToken, setIsAuthenticated, setUserId } from '@/store/user';
import { useEffect } from 'react';
import { UserAuthResponseUserDataType } from '@/utils/types';

interface Props {
  children: JSX.Element;
}

export default function Layout({ children }: Props) {
  const dispatch = useDispatch();

  const handleCheckAuthStatus = () => {
    const user = localStorage.getItem('user');
    const userData: UserAuthResponseUserDataType = user? JSON.parse(user) : '';
    if (user) {
      dispatch(setIsAuthenticated(true));
      dispatch(setUserId(userData.id));
      dispatch(setAuthToken(userData.token))
    } else {
      dispatch(setIsAuthenticated(false));
      dispatch(setUserId(''));
      dispatch(setAuthToken(''))
    }
  };

  useEffect(() => {
    handleCheckAuthStatus();
  }, []);

  return (
    <div className='w-full h-full min-h-screen bg-slate-700'>
      <Script src='https://accounts.google.com/gsi/client' async defer />
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
