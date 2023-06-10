import EventCard from '@/components/events/event-card';
import LoginPrompt from '@/components/events/login-prompt';
import LoadingSpinner from '@/components/layout/loading-spinner';
import camboEventsApi from '@/services/axios-config';
import {
  selectUserState,
  setSavedEventIds,
  setSavedEvents,
} from '@/store/user';
import { groupSavedEventByDay } from '@/utils/helpers';
import { SavedEventType, UserStateType } from '@/utils/types';
import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DateTime } from 'ts-luxon';

export default function SavedEvents() {
  const dispatch = useDispatch();
  const userState: UserStateType = useSelector(selectUserState);
  const { isUserAuthenticated, savedEvents } = userState;
  const [isLoading, setIsLoading] = useState(false);
  const savedEventsGroupedByDate = groupSavedEventByDay(savedEvents);

  const fetchSavedEvents = async () => {
    setIsLoading(true);
    const response = await camboEventsApi.get('/event/saved');
    dispatch(setSavedEvents(response.data));
    const eventIds: string[] = response.data.map(
      (savedEvent: SavedEventType) => savedEvent.event.id
    );
    dispatch(setSavedEventIds(eventIds));
    setIsLoading(false);
  };

  useEffect(() => {
    if (isUserAuthenticated) {
      fetchSavedEvents();
    } else {
      setSavedEventIds([]);
      setSavedEvents([]);
    }
  }, [isUserAuthenticated]);

  if (!isUserAuthenticated) {
    return <LoginPrompt text='Please login to see your saved events.' />;
  } else if (savedEvents.length < 1) {
    return (
      <div className='flex flex-col justify-around items-center min-h-screen px-4'>
        <p className='text-white text-2xl text-center'>
          You haven&apos;t saved any events yet.
        </p>
        <Link href='/'>
          <button className='rounded-lg bg-slate-500 text-white w-full py-1 px-4 text-lg hover:bg-slate-400 hover:scale-105 transition-all duration-200'>
            See Events
          </button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Saved Events - Cambo Events</title>
        <meta
          name='description'
          content='Find, share and post events happening in Cambodia'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
        <meta property='og:title' content='Saved Events - Cambo Events' />
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
            {savedEventsGroupedByDate.map((savedEventsArray, arrayIndex) => {
              const date = DateTime.fromISO(
                savedEventsArray[0]?.start_date as string
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
                    {savedEventsArray.map((event, index) => (
                      <EventCard key={index} event={event} />
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
