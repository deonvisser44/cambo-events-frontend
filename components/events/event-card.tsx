import { EventType } from '@/utils/types';
import React, { useState } from 'react';
import { DateTime } from 'ts-luxon';
import Close from '../icons/close';
import Expand from '../icons/expand';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import EventMap from './event-map';

const myIcon = new Icon({
  iconUrl: 'https://www.svgrepo.com/show/449139/location-pin-filled.svg',
  iconSize: [32, 32],
});

interface Props {
  event: EventType;
}

export default function EventCard({ event }: Props) {
  const [isShowMoreOpen, setIsShowMoreOpen] = useState(false);
  const {
    id,
    host_id,
    name,
    description,
    location,
    image,
    start_time,
    end_time,
    category,
  } = event;
  const luxonStartDate = DateTime.fromJSDate(start_time);
  const startDateToUSe = luxonStartDate.toLocaleString(DateTime.DATETIME_MED);
  const luxonEndDate = DateTime.fromJSDate(end_time);
  const EndDateToUSe = luxonEndDate.toLocaleString(DateTime.DATETIME_MED);

  const toggleShowMore = () => {
    setIsShowMoreOpen((prevState) => !prevState);
  };

  return (
    <div className='border border-gray-400 w-[90%] flex flex-col rounded-lg bg-slate-400'>
      <div onClick={toggleShowMore} className='px-2 py-2 gap-1 flex flex-col'>
        <h1 className='text-lg font-semibold'>{name}</h1>
        <p className='text-xs'>{startDateToUSe}</p>
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
      <button
        onClick={toggleShowMore}
        className='underline w-full bg-slate-300 text-black flex justify-center rounded-md'
      >
        {isShowMoreOpen ? <Close /> : <Expand />}
      </button>
      {isShowMoreOpen && (
        <div className='flex flex-col w-full px-2 gap-2 py-2'>
          <p className='text-sm'>{description}</p>
          <p>
            <span className='font-semibold'>From:</span> {startDateToUSe}
          </p>
          <p>
            <span className='font-semibold'>To:</span> {EndDateToUSe}
          </p>
          <EventMap lat={Number(location.lat)} lng={Number(location.lng)} />
        </div>
      )}
    </div>
  );
}
