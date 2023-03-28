import CopyIcon from '@/components/icons/copy';
import React from 'react';
import { toast } from 'react-toastify';

export default function ContactPage() {
  const handleCopyEmail = () => {
    navigator.clipboard.writeText('deonvisser@protonmail.com');
    toast.info('Copied to clipboard');
  };

  return (
    <div className='min-h-screen flex flex-col justify-center items-center gap-5 text-2xl text-center px-6'>
      <p className='text-slate-400'>
        For any issues or recommendations please reach out to me at
      </p>
      <div className='flex gap-3'>
        <p className='text-slate-300'>deonvisser@protonmail.com</p>
        <button onClick={handleCopyEmail}>
          <CopyIcon />
        </button>
      </div>
    </div>
  );
}
