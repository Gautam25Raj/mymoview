'use client';

import React from 'react';
import { MenuItem } from '@material-tailwind/react';
import { UserCircleIcon, FilmIcon, TvIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import SearchBtn from './SearchBtn';

const navListItems = [
  {
    label: 'Home',
    href: '/',
    icon: UserCircleIcon,
  },
  {
    label: 'Movies',
    href: '/explore/movies',
    icon: FilmIcon,
  },
  {
    label: 'TV Shows',
    href: '/explore/shows',
    icon: TvIcon,
  },
];

function NavList() {
  return (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      {navListItems.map(({ label, icon, href }, key) => (
        <Link key={label} href={href}>
          <p className="text-white">
            <MenuItem className="flex items-center gap-2 lg:rounded-full lg:hover:text-white lg:hover:bg-gray-800 lg:hover:scale-105 lg:active:scale-95">
              {React.createElement(icon, { className: 'h-[18px] w-[18px]' })}{' '}
              {label}
            </MenuItem>
          </p>
        </Link>
      ))}
    </ul>
  );
}

export default NavList;
