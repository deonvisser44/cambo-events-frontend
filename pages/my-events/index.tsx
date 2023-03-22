import EventCard from '@/components/events/event-card';
import LoginPrompt from '@/components/events/login-prompt';
import camboEventsApi from '@/services/axios-config';
import { selectUserState } from '@/store/user';
import { EventType, UserStateType } from '@/utils/types';
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
