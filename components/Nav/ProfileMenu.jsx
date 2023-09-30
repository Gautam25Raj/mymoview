'use client';

import React, { useEffect } from 'react';
import {
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from '@material-tailwind/react';
import {
  UserCircleIcon,
  ChevronDownIcon,
  PowerIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { login, logout } from '@/redux/slice/authSlice';
import Avatar, { genConfig } from 'react-nice-avatar';

const profileMenuItems = [
  {
    label: 'My Profile',
    icon: UserCircleIcon,
    href: '/profile',
  },
  {
    label: 'Sign Out',
    icon: PowerIcon,
  },
];

async function checkUser() {
  const res = await fetch(`${process.env.URL}/api/auth/check`);

  if (!res.ok) {
    console.log('No user found');
  }

  return res.json();
}

async function getAvatar() {
  const res = await fetch(`${process.env.URL}/api/avatar`);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [avatar, setAvatar] = React.useState('');
  const dispatch = useDispatch();
  const router = useRouter();

  const { isAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    const checkAuth = async () => {
      console.log('checking auth');
      const { user_id, username, email } = await checkUser();

      console.log(user_id, username, email);
      if (!email) {
        return;
      }
      console.log('dispatching login');

      dispatch(login({ id: user_id, name: username, email }));

      const { avatar } = await getAvatar();
      setAvatar(avatar);
    };

    checkAuth();
    setIsLoggedIn(isAuth);
  }, [isAuth, dispatch]);

  const closeMenu = () => setIsMenuOpen(false);

  const handleClick = (label) => {
    closeMenu();
    if (label === 'Sign Out') {
      fetch(`${process.env.URL}/api/auth/logout`);
      console.log('sign out');
      setIsLoggedIn(isAuth);
      dispatch(logout());
    } else {
      router.push('/profile');
    }
  };

  return isLoggedIn ? (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            style={{ width: '36px', height: '36px' }}
            {...genConfig(avatar)}
          />

          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? 'rotate-180' : ''
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={() => handleClick(label)}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? 'hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10'
                  : ''
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? 'text-red-500' : ''}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? 'red' : 'inherit'}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  ) : (
    <Link
      href="/register"
      className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 bg-gray-800 hover:bg-gray-700 hover:scale-105 focus:bg-gray-800 active:scale-95 ml-auto"
    >
      Sign Up Now
    </Link>
  );
}

export default ProfileMenu;
