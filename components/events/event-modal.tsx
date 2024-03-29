import { EventType, EventsStateType, UserStateType } from '@/utils/types';
import React, { useState } from 'react';
import { DateTime } from 'ts-luxon';
import dynamic from 'next/dynamic';
import { useDispatch, useSelector } from 'react-redux';
import Bookmark from './event-bookmark';
import { useRouter } from 'next/router';
import EditButton from './edit-button';
import DeleteIcon from '../icons/delete';
import DeleteModal from './delete-modal';
import { categoryColors } from '@/utils/constants';
import { replaceUnderscores } from '@/utils/helpers';
import { selectEventsState, setCurrentEvent } from '@/store/events';

const EventMap = dynamic(() => import('./event-map'), {
  ssr: false,
});

interface Props {
  event: EventType;
  setIsEventModalOpen: (value: boolean) => void;
}

export default function EventModal({ event, setIsEventModalOpen }: Props) {
  const router = useRouter();
  const eventsState: EventsStateType = useSelector(selectEventsState);
  const dispatch = useDispatch();
  const { savedEventIds } = eventsState;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { id, name, description, location, start_date, end_date, category } =
    event;
  const luxonStartDate = DateTime.fromISO(new Date(start_date).toISOString());
  const startDateToUSe = luxonStartDate.toLocaleString(DateTime.DATETIME_MED);
  const luxonEndDate = DateTime.fromISO(new Date(end_date).toISOString());
  const EndDateToUSe = luxonEndDate.toLocaleString(DateTime.DATETIME_MED);
  const isEventSavedForUser = savedEventIds.includes(id);
  const isOnMyEventsPage = router.pathname.includes('my-events');

  const handleModalDivClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleBackDropClick = () => {
    setIsEventModalOpen(false);
  };

  const handleDeleteIconClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(setCurrentEvent(event));
    setIsDeleteModalOpen(true);
  };

  return (
    <div
      className=' bg-gray-400 bg-opacity-75 z-50 fixed top-0 left-0 flex items-center w-full h-full'
      onClick={handleBackDropClick}
    >
      <div className='h-fit w-1/3 mx-auto my-auto rounded-lg bg-gradient-to-r from-indigo-500 via-violet-500 to-orange-400 p-1'>
        <div
          onClick={handleModalDivClick}
          className='  flex flex-col mx-auto my-auto rounded-lg bg-slate-400'
        >
          <div className='px-2 py-2 gap-1 flex flex-col'>
            <div className='flex justify-between'>
              <h1 className='text-xl font-semibold'>{name}</h1>
              {isOnMyEventsPage ? (
                <div className='flex gap-2'>
                  <DeleteIcon onClick={handleDeleteIconClick} />
                  <EditButton event={event} />
                </div>
              ) : (
                <Bookmark
                  isSavedForUser={isEventSavedForUser}
                  eventId={event.id}
                />
              )}
            </div>

            <div className='flex gap-2 w-full'>
              {category.map((item, index) => {
                const categoryWithoutUnderscores = replaceUnderscores(item);
                return (
                  <p
                    key={index}
                    style={{
                      backgroundColor: categoryColors[item.toLocaleLowerCase()],
                    }}
                    className='rounded-lg bg-slate-700 px-2 py-1 text-white text-xs'
                  >
                    {categoryWithoutUnderscores.toUpperCase()}
                  </p>
                );
              })}
            </div>
          </div>

          <div className='flex flex-col w-full px-2 gap-2 py-1'>
            <p>{startDateToUSe}</p>
            <p className='text-sm bg-slate-300 px-2 rounded-md'>
              {description}
            </p>
            {/* <p>
              <span className='font-semibold underline'>To:</span>{' '}
              {EndDateToUSe}
            </p> */}
            <EventMap lat={Number(location.lat)} lng={Number(location.lng)} />
          </div>
          {isDeleteModalOpen && (
            <DeleteModal setIsDeleteModalOpen={setIsDeleteModalOpen} />
          )}
        </div>
      </div>
    </div>
  );
}
