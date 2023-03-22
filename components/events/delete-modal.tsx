import camboEventsApi from '@/services/axios-config';
import { selectUserState } from '@/store/user';
import { UserStateType } from '@/utils/types';
import React from 'react';
import { useSelector } from 'react-redux';

interface Props {
  setIsDeleteModalOpen: (value: boolean) => void;
  handleUpdateListAfterDelete: () => void;
}

export default function DeleteModal({ setIsDeleteModalOpen, handleUpdateListAfterDelete }: Props) {
  const userState: UserStateType = useSelector(selectUserState);
  const { currentEvent } = userState;

  const handleModalDivClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleDelete = async () => {
    await camboEventsApi.delete('/event', {
      params: { event_id: currentEvent.id },
    });
    setIsDeleteModalOpen(false);
    handleUpdateListAfterDelete();
  };

  return (
    <div
      className=' bg-gray-400 bg-opacity-75 z-50 fixed top-0 left-0 flex items-center w-full h-full'
      onClick={() => setIsDeleteModalOpen(false)}
    >
      <div
        className=' bg-slate-600 rounded-md gap-5 flex flex-col justify-around p-4 mx-auto my-auto w-4/5 md:w-1/5 min-h-[350px] md:min-h-[300px]'
        onClick={handleModalDivClick}
      >
        <p className='text-xl font-semibold text-center text-white'>
          Are you sure you want to delete {currentEvent.name}?
        </p>
        <div className='grid grid-cols-2 gap-2 w-full'>
          <button
            className='text-lg bg-gray-400 text-white px-3 py-1 rounded-md'
            onClick={() => setIsDeleteModalOpen(false)}
          >
            Cancel
          </button>
          <button
            className='text-lg bg-red-500 text-white px-3 py-1 rounded-md'
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
