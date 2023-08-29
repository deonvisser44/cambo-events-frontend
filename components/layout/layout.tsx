import React from 'react';
import Footer from './footer';
import Navbar from './navbar';
import Script from 'next/script';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectUserState,
  setAuthToken,
  setHasAccessTokenBeenAddedToInterceptor,
  setIsAuthenticated,
  setUserId,
} from '@/store/user';
import { useEffect } from 'react';
import {
  SavedEventType,
  UserAuthResponseUserDataType,
  UserStateType,
} from '@/utils/types';
import camboEventsApi, {
  addAccessTokenToInterceptor,
} from '@/services/axios-config';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Montserrat } from 'next/font/google';
import {
  selectEventsState,
  setSavedEventIds,
  setSavedEvents,
} from '@/store/events';

const montserrat = Montserrat({
  subsets: ['cyrillic'],
  variable: '--font-montserrat',
});

interface Props {
  children: JSX.Element;
}

export default function Layout({ children }: Props) {
  const dispatch = useDispatch();
  const userState: UserStateType = useSelector(selectUserState);
  const { hasAccessTokenBeenAddedToInterceptor } = userState;

  const fetchSavedEvents = async () => {
    const response = await camboEventsApi.get('/event/saved');
    const eventIds: string[] = response.data.map(
      (savedEvent: SavedEventType) => savedEvent.event.id
    );
    dispatch(setSavedEvents(response.data));
    dispatch(setSavedEventIds(eventIds));
  };

  const handleCheckAuthStatus = async () => {
    const user = localStorage.getItem('user');
    const userData: UserAuthResponseUserDataType = user ? JSON.parse(user) : '';
    if (user) {
      if (!hasAccessTokenBeenAddedToInterceptor) {
        addAccessTokenToInterceptor(userData.token);
        dispatch(setHasAccessTokenBeenAddedToInterceptor(true));
      }
      dispatch(setIsAuthenticated(true));
      dispatch(setUserId(userData.id));
      dispatch(setAuthToken(userData.token));
      await fetchSavedEvents();
    } else {
      dispatch(setIsAuthenticated(false));
      dispatch(setUserId(''));
      dispatch(setAuthToken(''));
    }
  };

  useEffect(() => {
    handleCheckAuthStatus();
  }, []);

  return (
    <div
      className={`w-full h-full min-h-screen bg-gradient-to-tl from-darkBlue via-slate-700 to-slate-900 ${montserrat.variable} font-mono`}
    >
      <Script src='https://accounts.google.com/gsi/client' async defer />
      <Navbar />
      {children}
      <Footer />
      <ToastContainer position='bottom-center' />
    </div>
  );
}
