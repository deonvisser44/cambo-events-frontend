import camboEventsApi from '@/services/axios-config';
import { selectUserState, setIsAuthModalOpen } from '@/store/user';
import { EventsStateType, UserStateType } from '@/utils/types';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BookMarkFilled from '../icons/bookmark-filled';
import BookmarkUnfilled from '../icons/bookmark-unfilled';
import { selectEventsState, setSavedEvents } from '@/store/events';

interface Props {
  isSavedForUser: boolean;
  eventId: string;
}

export default function Bookmark({ isSavedForUser, eventId }: Props) {
  const dispatch = useDispatch();
  const [isSaved, setIsSaved] = useState(isSavedForUser);
  const userState: UserStateType = useSelector(selectUserState);
  const eventsState: EventsStateType = useSelector(selectEventsState);
  const { isUserAuthenticated } = userState;
  const { savedEvents } = eventsState;

  const markEventAsSaved = async (eventId: string) => {
    if (isUserAuthenticated) {
      await camboEventsApi.post('/event/saved', {
        id: eventId,
      });
      setIsSaved(true);
    } else {
      dispatch(setIsAuthModalOpen(true));
    }
  };

  const removeAsSaved = async (eventId: string) => {
    await camboEventsApi.delete('/event/saved', {
      params: { id: eventId },
    });
    setIsSaved(false);
    const remainingSavedEvents = savedEvents.filter(
      (savedEvent) => savedEvent.event.id !== eventId
    );
    dispatch(setSavedEvents(remainingSavedEvents));
  };

  const handleBookmarkClick = async (
    event: React.MouseEvent<HTMLButtonElement>,
    isSaved: boolean,
    eventId: string
  ) => {
    event.stopPropagation();
    if (isSaved) {
      await removeAsSaved(eventId);
    } else {
      await markEventAsSaved(eventId);
    }
  };

  const iconToShow = isSaved ? <BookMarkFilled /> : <BookmarkUnfilled />;
  return (
    <button onClick={(event) => handleBookmarkClick(event, isSaved, eventId)}>
      {iconToShow}
    </button>
  );
}
