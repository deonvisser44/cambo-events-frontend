import React from 'react';
import Link from 'next/link';

interface Props {
  label: string;
  path: string;
}

export default function MobileNavButton({ label, path }: Props) {
  return (
    <Link
      href={path}
      className='hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium'
    >
      {label}
    </Link>
  );
}
