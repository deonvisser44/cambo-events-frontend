import Head from 'next/head';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { useDispatch } from 'react-redux';
import { setAuthToken, setIsAuthenticated, setUserId } from '@/store/user';
import { useEffect } from 'react';
import { EventType, UserAuthResponseUserDataType } from '@/utils/types';
import camboEventsApi from '@/services/axios-config';
import EventCard from '@/components/events/event-card';

const inter = Inter({ subsets: ['latin'] });

interface Props {
  events: EventType[];
}

export default function Home({ events }: Props) {
  const dispatch = useDispatch();

  const handleCheckAuthStatus = () => {
    const user = localStorage.getItem('user');
    const userData: UserAuthResponseUserDataType = user ? JSON.parse(user) : '';
    if (user) {
      dispatch(setIsAuthenticated(true));
      dispatch(setUserId(userData.id));
      dispatch(setAuthToken(userData.token));
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
    <>
      <Head>
        <title>Cambo Events</title>
        <meta name='description' content="See what's happening around you!" />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='min-h-screen min-w-screen'>
        <Script src='https://accounts.google.com/gsi/client' async defer />
        <div className='min-h-screen flex flex-col items-center justify-start my-10 gap-3'>
          {events.map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const response = await camboEventsApi.get('/event');
  const events = response.data;

  return {
    props: {
      events,
    },
  };
}
