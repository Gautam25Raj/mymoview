'use client';

import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

import DrawerWindow from './DrawerWindow';

const SearchBtn = () => {
  const [open, setOpen] = React.useState(false);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  return (
    <>
      <button
        onClick={openDrawer}
        className="flex items-center justify-center rounded-full bg-white lg:rounded-full lg:hover:text-white lg:hover:bg-gray-200 lg:hover:scale-105 lg:active:scale-95 fixed bottom-16 w-12 h-12 lg:h-16 lg:w-16 right-10 z-[9994]"
      >
        <MagnifyingGlassIcon className="text-black w-8 h-8" />
      </button>

      <DrawerWindow open={open} closeDrawer={closeDrawer} />
    </>
  );
};

export default SearchBtn;
