'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from '@material-tailwind/react';
import DrawerWindow from './DrawerWindow';

const SearchBtn = () => {
  const [open, setOpen] = React.useState(false);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  return (
    <>
      <button
        onClick={openDrawer}
        className="flex items-center justify-center rounded-full gap-2 bg-white lg:rounded-full lg:hover:text-white lg:hover:bg-gray-200 lg:hover:scale-105 lg:active:scale-95 fixed bottom-16 w-14 h-14 lg:h-20 lg:w-20 right-10 z-[9994]"
      >
        <MagnifyingGlassIcon className="text-black w-10 h-10" />
      </button>

      <DrawerWindow open={open} closeDrawer={closeDrawer} />
    </>
  );
};

export default SearchBtn;
