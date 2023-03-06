import React from 'react';
import Link from 'next/link';

interface Props {
  label: string;
  path: string;
}

export default function DesktopNavButton({ label, path }: Props) {
  return (
    <Link
      href={path}
      className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
    >
      {label}
    </Link>
  );
}
