import EventCard from '@/components/events/event-card';
import camboEventsApi from '@/services/axios-config';
import {
  selectUserState,
  setSavedEventIds,
  setSavedEvents,
} from '@/store/user';
import { EventType, SavedEventType, UserStateType } from '@/utils/types';
import React, { useEffect, useState } from 'react';
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
    }
  }, []);

  return (
    <div className='min-h-screen flex flex-col items-center justify-start my-10 gap-3'>
      {savedEvents.map((savedEvent, index) => (
        <EventCard key={index} event={savedEvent.event} />
      ))}
    </div>
  );
}
