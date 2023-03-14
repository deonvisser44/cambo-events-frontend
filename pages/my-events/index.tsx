import EventCard from '@/components/events/event-card';
import camboEventsApi from '@/services/axios-config';
import { selectUserState } from '@/store/user';
import { EventType, UserStateType } from '@/utils/types';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function MyEvents() {
  const userState: UserStateType = useSelector(selectUserState);
  const { isUserAuthenticated, user_id } = userState;
  const [userEvents, setUserEvents] = useState<EventType[]>([]);

  const fetchUserCreatedEvents = async () => {
    const response = await camboEventsApi.get('/event', {
      params: { host_id: user_id },
    });
    setUserEvents(response.data);
  };

  useEffect(() => {
    if (isUserAuthenticated) {
      fetchUserCreatedEvents();
    }
  }, []);

  return (
    <div className='min-h-screen flex flex-col items-center justify-start my-10 gap-3'>
      {userEvents.map((event, index) => (
        <EventCard key={index} event={event} />
      ))}
    </div>
  );
}
