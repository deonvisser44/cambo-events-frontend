import React from 'react';
import Link from 'next/link';

interface Props {
  label: string;
  path: string;
  setIsOpen: (value: boolean) => void;
}

export default function MobileNavButton({ label, path, setIsOpen }: Props) {
  return (
    <Link
      href={path}
      onClick={() => setIsOpen(false)}
      className='hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium'
    >
      {label}
    </Link>
  );
}
