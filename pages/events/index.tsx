import EventCard from '@/components/events/event-card';
import camboEventsApi from '@/services/axios-config';
import { EventType } from '@/utils/types';
import React from 'react';

interface Props {
  events: EventType[]
}

export default function Events({ events }: Props) {
  return (
    <div className='min-h-screen flex flex-col items-center justify-start my-10 gap-3'>
      {events.map((event, index) => (
        <EventCard key={index} event={event} />
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  const response = await camboEventsApi.get('/event');
  const events = response.data;

  return {
    props: {
      events,
    },
  }
}
