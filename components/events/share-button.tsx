import React from 'react';
import ShareIcon from '../icons/share';
import { toast } from 'react-toastify';

interface Props {
  eventId: string;
}

export default function ShareButton({ eventId }: Props) {
  const handleShareClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/shared-event/${eventId}`
    );
    toast.info('Link copied to clipboard!');
  };
  return (
    <button onClick={handleShareClick}>
      <ShareIcon />
    </button>
  );
}
