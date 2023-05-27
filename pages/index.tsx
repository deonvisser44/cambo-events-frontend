import Head from 'next/head';
import Script from 'next/script';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectUserState,
  setAuthToken,
  setIsAuthenticated,
  setUserId,
} from '@/store/user';
import { useEffect, useRef, useState } from 'react';
import {
  EventType,
  UserAuthResponseUserDataType,
  UserStateType,
} from '@/utils/types';
import camboEventsApi from '@/services/axios-config';
import EventCard from '@/components/events/event-card';
import AuthModal from '@/components/events/auth-modal';
import dynamic from 'next/dynamic';
import { groupByDay } from '@/utils/helpers';
import { DateTime } from 'ts-luxon';
import { SingleValue } from 'react-select';
import { categoryOptions } from '@/utils/constants';
import InfiniteScroll from 'react-infinite-scroll-component';

const CategorySearch = dynamic(
  () => import('@/components/events/category-search'),
  {
    ssr: false,
  }
);

const AreaSearch = dynamic(
  () => import('@/components/events/area-search'),
  {
    ssr: false,
  }
);

interface Props {
  events: EventType[];
}

const SELECT_OPTIONS = [{ value: 'ALL', label: 'ALL' }, ...categoryOptions];

export default function Home({ events }: Props) {
  const dispatch = useDispatch();
  const userState: UserStateType = useSelector(selectUserState);
  const { isAuthModalOpen } = userState;
  const [eventsToUse, setEventsToUse] = useState(events);
  const [currentPage, setCurrentPage] = useState(2);
  const [searchedCategory, setSearchedCategory] = useState<
    SingleValue<{
      label: string;
      value: string;
    }>
  >(SELECT_OPTIONS[0]);
  const [searchedArea, setSearchedArea] = useState<
    SingleValue<{
      label: string;
      value: string;
    }>
  >(SELECT_OPTIONS[0]);
  const eventsGroupedByDate = groupByDay(eventsToUse);
  const lastItemRef = useRef();

  const getEvents = async () => {
    const { data } = await camboEventsApi.get(`/event`, {
      params: { category: searchedCategory?.value, page: currentPage },
    });
    setEventsToUse((prevEvents) => [...prevEvents, ...data]);
    setCurrentPage((currentValue) => currentValue + 1);
  };

  const getEventsAfterSearchChange = async () => {
    const { data } = await camboEventsApi.get(`/event`, {
      params: {
        ...(searchedCategory?.value !== 'ALL' && {
          category: searchedCategory?.value,
        }),
        page: 1,
        ...(searchedArea?.value !== 'ALL' && { area: searchedArea?.value }),
      },
    });
    setEventsToUse([...data]);
  };

  useEffect(() => {
    getEventsAfterSearchChange();
  }, [searchedCategory, searchedArea]);

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
        <title>
          Cambo Events - Find, share and post events happening in Cambodia
        </title>
        <meta
          name='description'
          content='Find, share and post events happening in Cambodia'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
        <meta
          property='og:title'
          content='Cambo Events - Find, share and post events happening in Cambodia'
        />
        <meta
          property='og:description'
          content='Find, share and post events happening in Cambodia'
        />
        <meta property='og:image' content='/favicon.ico' />
      </Head>
      <main className='min-h-screen min-w-screen'>
        <Script src='https://accounts.google.com/gsi/client' async defer />
        <CategorySearch
          setSearchedCategory={setSearchedCategory}
          searchedCategory={searchedCategory}
        />
        <AreaSearch
          setSearchedArea={setSearchedArea}
          searchedArea={searchedArea}
        />

        <InfiniteScroll
          dataLength={eventsToUse.length}
          next={getEvents}
          hasMore={true}
          loader={<h3></h3>}
        >
          <div className='min-h-screen md:min-h-fit flex flex-col items-center md:items-start md:w-3/5 md:mt-10 my-10 md:mx-auto md:my-auto'>
            {eventsGroupedByDate.map((eventsArray, arrayIndex) => {
              const date = DateTime.fromISO(
                eventsArray[0]?.start_date as string
              );
              const formattedDate = date.toFormat('d LLL, yyyy');
              return (
                <div
                  key={arrayIndex}
                  className='w-full flex flex-col items-center'
                >
                  <p className='text-xl text-white'>{formattedDate}</p>
                  <hr className='w-1/5 md:w-3/5 my-2 h-[4px] rounded-lg border-none bg-gradient-to-r from-indigo-500 via-violet-500 to-orange-500' />
                  <div className='md:min-h-fit flex flex-col md:grid md:grid-cols-3 items-center md:items-start w-full md:w-full mt-1 md:mt-2 pb-10 gap-3 md:gap-6 md:mx-auto md:my-auto'>
                    {eventsArray.map((event, index) => {
                      const isLastDateGroup =
                        arrayIndex === eventsGroupedByDate.length - 1;
                      const isLastEventForDate =
                        index === eventsArray.length - 1;
                      const isLast = isLastDateGroup && isLastEventForDate;
                      const eventRef = isLast ? lastItemRef : null;
                      return <EventCard key={index} event={event} />;
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </InfiniteScroll>
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
