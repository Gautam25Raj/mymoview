'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar, IconButton, Collapse } from '@material-tailwind/react';
import { Bars2Icon } from '@heroicons/react/24/outline';

import NavList from './Nav/NavList';
import ProfileMenu from './Nav/ProfileMenu';

export default function ComplexNavbar() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);

  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  return (
    <Navbar className="relative mx-auto max-w-screen-2xl p-4 bg-transparent border-none z-[999]">
      <div className="relative mx-auto flex items-center text-blue-gray-900">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.svg"
            className="h-8 mr-3"
            height={32}
            width={32}
            alt="MyMoView Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            MyMoView
          </span>
        </Link>

        <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
          <NavList />
        </div>

        <IconButton
          size="sm"
          color="white"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton>
        <ProfileMenu />
      </div>

      <Collapse open={isNavOpen} className="no-scrollbar::-webkit-scrollbar">
        <NavList />
      </Collapse>
    </Navbar>
  );
}
