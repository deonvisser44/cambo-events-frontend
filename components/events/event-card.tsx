import { EventType, UserStateType } from '@/utils/types';
import React, { useState } from 'react';
import { DateTime } from 'ts-luxon';
import Close from '../icons/close';
import Expand from '../icons/expand';
import 'leaflet/dist/leaflet.css';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { selectUserState } from '@/store/user';
import Bookmark from './event-bookmark';

const EventMap = dynamic(() => import('./event-map'), { ssr: false });

interface Props {
  event: EventType;
}

export default function EventCard({ event }: Props) {
  const userState: UserStateType = useSelector(selectUserState);
  const { savedEventIds } = userState;
  const [isShowMoreOpen, setIsShowMoreOpen] = useState(false);
  const {
    id,
    name,
    description,
    location,
    image,
    start_date,
    end_date,
    category,
  } = event;
  const luxonStartDate = DateTime.fromISO(new Date(start_date).toISOString());
  const startDateToUSe = luxonStartDate.toLocaleString(DateTime.DATETIME_MED);
  const luxonEndDate = DateTime.fromISO(new Date(end_date).toISOString());
  const EndDateToUSe = luxonEndDate.toLocaleString(DateTime.DATETIME_MED);
  const isEventSavedForUser = savedEventIds.includes(id);

  const toggleShowMore = () => {
    setIsShowMoreOpen((prevState) => !prevState);
  };

  return (
    <div className='border border-gray-400 w-[90%] flex flex-col rounded-lg bg-slate-400'>
      <div onClick={toggleShowMore} className='px-2 py-2 gap-1 flex flex-col'>
        <div className='flex justify-between'>
          <h1 className='text-lg font-semibold'>{name}</h1>
          <Bookmark isSavedForUser={isEventSavedForUser} eventId={event.id} />
        </div>

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
