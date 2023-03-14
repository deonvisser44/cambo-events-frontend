import camboEventsApi from '@/services/axios-config';
import React, { useState } from 'react';
import BookMarkFilled from '../icons/bookmark-filled';
import BookmarkUnfilled from '../icons/bookmark-unfilled';

interface Props {
  isSavedForUser: boolean;
  eventId: string;
}

export default function Bookmark({ isSavedForUser, eventId }: Props) {
  const [isSaved, setIsSaved] = useState(isSavedForUser);

  const markEventAsSaved = async (eventId: string) => {
    await camboEventsApi.post('/event/saved', {
      event_id: eventId,
    });
    setIsSaved(true);
  };

  const removeAsSaved = async (eventId: string) => {
    await camboEventsApi.delete('/event/saved', { params: { event_id: eventId } });
    setIsSaved(false);
  };

  const handleBookmarkClick = async (event: React.MouseEvent<HTMLButtonElement>, isSaved: boolean, eventId: string) => {
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
