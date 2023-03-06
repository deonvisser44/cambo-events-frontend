import React from 'react';
import Pin from '../icons/pin';

interface Props {
  text: string;
}

export default function LocationPin({ text }: Props) {
  return (
    <div className='flex'>
      <Pin />
      <p className='text-xs'>{text}</p>
    </div>
  );
}
