"use client"; // This is a client componentimport React, {useState} from 'react';
import React from 'react';
import { usePathname } from 'next/navigation';
import Frontpage from './Frontpage/page';
import Movies from './Movies/page';
import Toprated from './Toprated/page';
import Profile from './Profile/page';

const Home = () => {
  const pathName = usePathname();

  return (
    <>
      {pathName === '/' && <Frontpage />}
      {pathName === '/Movies' && <Movies />}
      {pathName === '/Mylist' && <Toprated  />}
      {pathName === '/Profile' && <Profile  />}
    </>
  );
}

export default Home;