import { EventType } from '@/utils/types';
import React from 'react';
import { useDispatch } from 'react-redux';
import EditIcon from '../icons/edit';
import { useRouter } from 'next/router';
import { setCurrentEvent } from '@/store/events';

interface Props {
  event: EventType;
}

export default function EditButton({ event }: Props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleEditClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(setCurrentEvent(event));
    router.replace('/edit-event');
  };
  return <button onClick={handleEditClick}>{<EditIcon />}</button>;
}
