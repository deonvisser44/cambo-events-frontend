import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Props {
  label: string;
  path: string;
}

export default function DesktopNavButton({ label, path }: Props) {
  const router = useRouter();
  const pathName = router.pathname;

  const isCurrentPage = () => {
    let isButtonForCurrenPage;
    switch (true) {
      case pathName === '/' && label === 'Events':
        isButtonForCurrenPage = true;
        break;
      case pathName === '/my-events' && label === 'My Events':
        isButtonForCurrenPage = true;
        break;
      case pathName === '/saved-events' && label === 'Saved Events':
        isButtonForCurrenPage = true;
        break;
      case pathName === '/post-event' && label === 'Post Event':
        isButtonForCurrenPage = true;
        break;
      case pathName === '/edit-event' && label === 'Edit Event':
        isButtonForCurrenPage = true;
        break;
      default:
        isButtonForCurrenPage = false;
    }
    return isButtonForCurrenPage;
  };

  return (
    <Link
      href={path}
      className={`${
        isCurrentPage() ? 'text-violet-400 bg-gray-700' : 'text-gray-400'
      } hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium`}
    >
      {label}
    </Link>
  );
}
