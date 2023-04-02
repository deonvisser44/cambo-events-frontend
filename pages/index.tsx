import Head from 'next/head';
import Script from 'next/script';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectUserState,
  setAuthToken,
  setIsAuthenticated,
  setUserId,
} from '@/store/user';
import { useEffect, useState } from 'react';
import {
  EventType,
  UserAuthResponseUserDataType,
  UserStateType,
} from '@/utils/types';
import camboEventsApi from '@/services/axios-config';
import EventCard from '@/components/events/event-card';
import AuthModal from '@/components/events/auth-modal';
import dynamic from 'next/dynamic';

const CategorySearch = dynamic(
  () => import('@/components/events/category-search'),
  {
    ssr: false,
  }
);

interface Props {
  events: EventType[];
}

export default function Home({ events }: Props) {
  const dispatch = useDispatch();
  const userState: UserStateType = useSelector(selectUserState);
  const { isAuthModalOpen } = userState;
  const [searchResults, setSearchResults] = useState<EventType[]>([]);
  const [hasSearchedForEvents, setHasSearchedForEvents] = useState(false);
  const eventsToDisplay = hasSearchedForEvents ? searchResults : events;

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
        <CategorySearch
          setHasSearchedForEvents={setHasSearchedForEvents}
          setSearchResults={setSearchResults}
        />
        <div className='min-h-screen md:min-h-fit flex flex-col md:grid md:grid-cols-2 items-center md:items-start md:w-3/5 md:mt-10 my-10 gap-3 md:gap-6 md:mx-auto md:my-auto'>
          {eventsToDisplay.map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </div>
        {isAuthModalOpen && <AuthModal />}
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
