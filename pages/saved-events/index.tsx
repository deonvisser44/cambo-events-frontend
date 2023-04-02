import EventCard from '@/components/events/event-card';
import LoginPrompt from '@/components/events/login-prompt';
import camboEventsApi from '@/services/axios-config';
import {
  selectUserState,
  setSavedEventIds,
  setSavedEvents,
} from '@/store/user';
import { SavedEventType, UserStateType } from '@/utils/types';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function SavedEvents() {
  const dispatch = useDispatch();
  const userState: UserStateType = useSelector(selectUserState);
  const { isUserAuthenticated, savedEvents } = userState;

  const fetchSavedEvents = async () => {
    const response = await camboEventsApi.get('/event/saved');
    dispatch(setSavedEvents(response.data));
    const eventIds: string[] = response.data.map(
      (savedEvent: SavedEventType) => savedEvent.event.id
    );
    dispatch(setSavedEventIds(eventIds));
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
    <main className='min-h-screen min-w-screen'>
      <div className='min-h-screen md:min-h-fit flex flex-col md:grid md:grid-cols-2 items-center md:items-start md:w-3/5 md:mt-10 my-10 gap-3 md:gap-6 md:mx-auto md:my-auto'>
        {savedEvents.map((savedEvent, index) => (
          <EventCard key={index} event={savedEvent.event} />
        ))}
      </div>
    </main>
  );
}
