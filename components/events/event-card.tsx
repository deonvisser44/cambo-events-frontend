import { EventType, UserStateType } from '@/utils/types';
import React, { useEffect, useState } from 'react';
import { DateTime } from 'ts-luxon';
import Close from '../icons/close';
import Expand from '../icons/expand';
import dynamic from 'next/dynamic';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserState, setCurrentEvent } from '@/store/user';
import Bookmark from './event-bookmark';
import { useRouter } from 'next/router';
import EditButton from './edit-button';
import DeleteIcon from '../icons/delete';
import DeleteModal from './delete-modal';
import { isBrowser, isMobile } from 'react-device-detect';
import ShareButton from './share-button';
import { categoryColors } from '@/utils/constants';

const EventMap = dynamic(() => import('./event-map'), {
  ssr: false,
});

const EventModal = dynamic(() => import('./event-modal'), {
  ssr: false,
});

interface Props {
  event: EventType;
  handleUpdateListAfterDelete?: () => void;
}

export default function EventCard({
  event,
  handleUpdateListAfterDelete,
}: Props) {
  const router = useRouter();
  const userState: UserStateType = useSelector(selectUserState);
  const dispatch = useDispatch();
  const { id, name, description, location, start_date, end_date, category } =
    event;
  const { savedEventIds } = userState;
  const [isShowMoreOpen, setIsShowMoreOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [shouldShowOpenButton, setShouldShowOpenButton] = useState(false);
  const [isEventSavedForUser, _] = useState(savedEventIds.includes(id));
  const luxonStartDate = DateTime.fromISO(new Date(start_date).toISOString());
  const startDateToUSe = luxonStartDate.toLocaleString(DateTime.DATETIME_MED);
  const luxonEndDate = DateTime.fromISO(new Date(end_date).toISOString());
  const EndDateToUSe = luxonEndDate.toLocaleString(DateTime.DATETIME_MED);
  const isOnMyEventsPage = router.pathname.includes('my-events');

  useEffect(() => {
    setShouldShowOpenButton(isMobile);
  }, []);

  const toggleShowMore = () => {
    if (shouldShowOpenButton) {
      setIsShowMoreOpen((prevState) => !prevState);
    } else {
      setIsEventModalOpen(true);
    }
  };

  const handleDeleteIconClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(setCurrentEvent(event));
    setIsDeleteModalOpen(true);
  };

  return (
    <div
      className={`w-[90%] md:w-full flex flex-col rounded-lg bg-slate-400  ${
        isBrowser &&
        'hover:bg-violet-300 hover:shadow-xl cursor-pointer transition duration-300'
      }`}
    >
      <div onClick={toggleShowMore} className='px-2 py-2 gap-1 flex flex-col'>
        <div className='flex justify-between'>
          <h1 className='text-lg font-semibold whitespace-nowrap overflow-hidden text-ellipsis'>
            {name}
          </h1>
          {isOnMyEventsPage ? (
            <div className='flex gap-2'>
              <DeleteIcon onClick={handleDeleteIconClick} />
              <EditButton event={event} />
            </div>
          ) : (
            <div className='flex gap-2'>
              <ShareButton eventId={event.id} />
              <Bookmark
                isSavedForUser={isEventSavedForUser}
                eventId={event.id}
              />
            </div>
          )}
        </div>

        <p className='text-xs'>{startDateToUSe}</p>
        <div className='flex gap-2 w-full'>
          {category.map((item, index) => (
            <p
              key={index}
              style={{
                backgroundColor: categoryColors[item.toLocaleLowerCase()],
              }}
              className='rounded-lg px-2 py-1 text-white text-xs'
            >
              {item.toUpperCase()}
            </p>
          ))}
        </div>
      </div>
      {shouldShowOpenButton && (
        <button
          onClick={toggleShowMore}
          className='underline w-full bg-slate-300 text-black flex justify-center rounded-md'
        >
          {isShowMoreOpen ? <Close /> : <Expand />}
        </button>
      )}
      {isShowMoreOpen && (
        <div className='flex flex-col w-full px-2 gap-2 py-1'>
          {/* <p>{startDateToUSe}</p> */}
          <p className='text-sm'>{description}</p>
          {/* <p>
            <span className='font-semibold'>To:</span> {EndDateToUSe}
          </p> */}
          <EventMap lat={Number(location.lat)} lng={Number(location.lng)} />
        </div>
      )}
      {isDeleteModalOpen && (
        <DeleteModal
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          handleUpdateListAfterDelete={handleUpdateListAfterDelete!}
        />
      )}
      {isEventModalOpen && (
        <EventModal event={event} setIsEventModalOpen={setIsEventModalOpen} />
      )}
    </div>
  );
}
