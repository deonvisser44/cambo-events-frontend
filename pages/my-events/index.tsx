import EventCard from '@/components/events/event-card';
import LoginPrompt from '@/components/events/login-prompt';
import LoadingSpinner from '@/components/layout/loading-spinner';
import camboEventsApi from '@/services/axios-config';
import { selectUserState } from '@/store/user';
import { groupByDay } from '@/utils/helpers';
import { EventType, UserStateType } from '@/utils/types';
import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { DateTime } from 'ts-luxon';

export default function MyEvents() {
  const userState: UserStateType = useSelector(selectUserState);
  const { isUserAuthenticated, user_id, currentEvent } = userState;
  const [userEvents, setUserEvents] = useState<EventType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const eventsGroupedByDate = groupByDay(userEvents);

  const fetchUserCreatedEvents = async () => {
    setIsLoading(true);
    const response = await camboEventsApi.get('/event', {
      params: { host_id: user_id },
    });
    setUserEvents(response.data);
    setIsLoading(false);
  };

  const handleUpdateListAfterDelete = () => {
    const remainingEvents = userEvents.filter(
      (event) => event.id !== currentEvent.id
    );
    setUserEvents(remainingEvents);
  };

  useEffect(() => {
    if (isUserAuthenticated) {
      fetchUserCreatedEvents();
    } else {
      setUserEvents([]);
    }
  }, [isUserAuthenticated]);

  if (!isUserAuthenticated) {
    return <LoginPrompt text='Please login to see your events.' />;
  } else if (userEvents.length < 1) {
    return (
      <div className='flex flex-col justify-around items-center min-h-screen px-4'>
        <p className='text-white text-2xl text-center'>
          You haven&apos;t posted any events yet.
        </p>
        <Link href='/post-event'>
          <button className='rounded-lg bg-slate-500 text-white w-full py-1 px-4 text-lg hover:bg-slate-400 hover:scale-105 transition-all duration-200'>
            Post Event
          </button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>My Events - Cambo Events</title>
        <meta
          name='description'
          content='Find, share and post events happening in Cambodia'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
        <meta property='og:title' content='My Events - Cambo Events' />
        <meta
          property='og:description'
          content='Find, share and post events happening in Cambodia'
        />
        <meta property='og:image' content='/favicon.ico' />
      </Head>
      <main className='min-h-screen min-w-screen'>
        {isLoading ? (
          <div className='mx-auto mt-20 flex items-center justify-center'>
            <LoadingSpinner />
          </div>
        ) : (
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
                    {eventsArray.map((event, index) => (
                      <EventCard
                        key={index}
                        event={event}
                        handleUpdateListAfterDelete={
                          handleUpdateListAfterDelete
                        }
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </>
  );
}
