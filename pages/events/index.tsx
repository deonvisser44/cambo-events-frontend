import EventCard from '@/components/events/event-card';
import camboEventsApi from '@/services/axios-config';
import React, { useEffect, useState } from 'react';

export default function Events() {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    const response = await camboEventsApi.get('/event');
    setEvents(response.data);
  };

  useEffect(() => {
    fetchEvents()
  }, [])
  return (
    <div className='min-h-screen flex flex-col items-center justify-start my-10 gap-3'>
      {events.map((event, index) => (
        <EventCard key={index} event={event} />
      ))}
    </div>
  );
}
