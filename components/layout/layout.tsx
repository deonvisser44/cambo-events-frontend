import React from 'react';
import Footer from './footer';
import Navbar from './navbar';

interface Props {
  children: JSX.Element;
}

export default function Layout({ children }: Props) {
  return (
    <div className='w-full h-full min-h-screen bg-slate-700'>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
