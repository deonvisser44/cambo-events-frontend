import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { EventType } from '@/utils/types';
import camboEventsApi from '@/services/axios-config';
import dynamic from 'next/dynamic';
import { DateTime } from 'ts-luxon';

const EventMap = dynamic(() => import('@/components/events/event-map'), {
  ssr: false,
});

export default function SharedEvent() {
  const router = useRouter();
  const { id } = router.query;
  const [event, setEvent] = useState<EventType | null>(null);
  useEffect(() => {
    const getEvent = async () => {
      const res = await camboEventsApi.get(`/event/${id}/shared`);
      setEvent(res.data);
    };
    if (id) {
      getEvent();
    }
  }, [id]);
  if (!event) {
    return (
      <div className='min-h-screen flex justify-center items-center'>
        <p className='text-xl font-semibold text-left text-white'>
          Could not find event!
        </p>
      </div>
    );
  } else {
    const { name, description, location, start_date, end_date, category } =
      event;
    const luxonStartDate = DateTime.fromISO(new Date(start_date).toISOString());
    const startDateToUSe = luxonStartDate.toLocaleString(DateTime.DATETIME_MED);
    const luxonEndDate = DateTime.fromISO(new Date(end_date).toISOString());
    const EndDateToUSe = luxonEndDate.toLocaleString(DateTime.DATETIME_MED);
    return (
      <div className='min-h-screen flex flex-col pt-10'>
        <div className='flex flex-col w-[90%] md:w-2/3 lg:w-1/3 mx-auto rounded-lg bg-slate-400'>
          <h1 className='px-2 text-2xl font-semibold'>{name}</h1>
          <div className='px-2 py-2 gap-1 flex flex-col'>
            <div className='flex gap-2 w-full'>
              {category.map((item, index) => (
                <p
                  key={index}
                  className='rounded-lg bg-slate-700 px-2 py-1 text-white text-xs'
                >
                  {item.toUpperCase()}
                </p>
              ))}
            </div>
          </div>

          <div className='flex flex-col w-full px-2 gap-2 py-2'>
            <p className='text-sm bg-slate-300 px-2 rounded-md'>
              {description}
            </p>
            <p>
              <span className='font-semibold'>From:</span> {startDateToUSe}
            </p>
            <p>
              <span className='font-semibold'>To:</span> {EndDateToUSe}
            </p>
            <EventMap lat={Number(location.lat)} lng={Number(location.lng)} />
          </div>
        </div>
      </div>
    );
  }
}
