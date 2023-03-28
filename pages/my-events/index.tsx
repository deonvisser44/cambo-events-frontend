import EventCard from '@/components/events/event-card';
import LoginPrompt from '@/components/events/login-prompt';
import camboEventsApi from '@/services/axios-config';
import { selectUserState } from '@/store/user';
import { EventType, UserStateType } from '@/utils/types';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function MyEvents() {
  const userState: UserStateType = useSelector(selectUserState);
  const { isUserAuthenticated, user_id, currentEvent } = userState;
  const [userEvents, setUserEvents] = useState<EventType[]>([]);

  const fetchUserCreatedEvents = async () => {
    const response = await camboEventsApi.get('/event', {
      params: { host_id: user_id },
    });
    setUserEvents(response.data);
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
    }
  }, []);

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
    <main className='min-h-screen min-w-screen'>
      <div className='min-h-screen md:min-h-fit flex flex-col md:grid md:grid-cols-2 items-center md:items-start md:w-3/5 md:mt-10 my-10 gap-3 md:gap-6 md:mx-auto md:my-auto'>
        {userEvents.map((event, index) => (
          <EventCard
            key={index}
            event={event}
            handleUpdateListAfterDelete={handleUpdateListAfterDelete}
          />
        ))}
      </div>
    </main>
  );
}
