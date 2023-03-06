import EventCard from '@/components/events/event-card';
import { TEST_EVENTS } from '@/utils/constants';
import React from 'react';

export default function Events() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-start my-10 gap-3'>
      {TEST_EVENTS.map((event, index) => (
        <EventCard key={index} event={event} />
      ))}
    </div>
  );
}
