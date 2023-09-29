'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Avatar, { genConfig } from 'react-nice-avatar';

import ProfileCarousel from '@/components/profile/ProfileCarousel';

async function getUser(id) {
  const res = await fetch(`${process.env.URL}/api/user/${id}`);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default function Home() {
  const { user } = useSelector((state) => state.auth);

  const [favM, setFavM] = useState({});
  const [favTv, setFavTv] = useState({});
  const [wM, setWM] = useState({});
  const [wTv, setWTv] = useState({});
  const [wlM, setWlM] = useState({});
  const [wlTv, setWlTv] = useState({});
  const [avatar, setAvatar] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      if (user.id != '') {
        let [favM, favTv, watchedM, watchedTv, wlM, wlTv, avatar] =
          await Promise.all([
            fetch(`${process.env.URL}/api/user/${user.id}/movies/fav`),
            fetch(`${process.env.URL}/api/user/${user.id}/tv/fav`),
            fetch(`${process.env.URL}/api/user/${user.id}/movies/watched`),
            fetch(`${process.env.URL}/api/user/${user.id}/tv/watched`),
            fetch(`${process.env.URL}/api/user/${user.id}/movies/watchLater`),
            fetch(`${process.env.URL}/api/user/${user.id}/tv/watchLater`),
            fetch(`${process.env.URL}/api/avatar`),
          ]);

        const favMData = await favM.json();
        setFavM(favMData);

        const favTvData = await favTv.json();
        setFavTv(favTvData);

        const watchedMData = await watchedM.json();
        setWM(watchedMData);

        const watchedTvData = await watchedTv.json();
        setWTv(watchedTvData);

        const wlMData = await wlM.json();
        setWlM(wlMData);

        const wlTvData = await wlTv.json();
        setWlTv(wlTvData);

        const avatarData = await avatar.json();
        setAvatar(avatarData);
      }
    };
    fetchData();
  }, [user]);

  return (
    <main className="w-full">
      <div className="absolute top-[68px] left-0 w-full h-80 bg-yellow-200 profile-bg"></div>

      <section className="bg-gray-900 rounded-2xl relative z-10 mt-44 px-10 mx-5 2xl:mx-0">
        <div className="flex justify-between items-start">
          <div className="flex mt-8 gap-5 items-start">
            <div className="flex flex-col items-center justify-center max-w-[80px] text-center">
              <span className="font-bold mb-1">
                {wM && wM.length > 0 ? wM.length : 0}
              </span>
              <p className="opacity-60">Watched Movies</p>
            </div>

            <div className="flex flex-col items-center justify-center max-w-[80px] text-center">
              <span className="font-bold mb-1">
                {favM && favM.length > 0 ? favM.length : 0}
              </span>
              <p className="opacity-60">Favorite Movies</p>
            </div>

            <div className="flex flex-col items-center justify-center max-w-[80px] text-center">
              <span className="font-bold mb-1">
                {wlM && wlM.length > 0 ? wlM.length : 0}
              </span>
              <p className="opacity-60">Watch Later</p>
            </div>
          </div>

          <div className="-translate-y-24 bg-blue-gray-300 w-48 h-48 overflow-hidden rounded-full">
            {avatar && user && user.id && (
              <Avatar
                style={{ width: '12rem', height: '12rem' }}
                {...genConfig(avatar)}
              />
            )}
          </div>

          <div className="flex mt-8 gap-5">
            <div className="flex flex-col items-center justify-center max-w-[80px] text-center">
              <span className="font-bold mb-1">
                {wlTv && wlTv.length > 0 ? wlTv.length : 0}
              </span>
              <p className="opacity-60">Watch Later</p>
            </div>

            <div className="flex flex-col items-center justify-center max-w-[80px] text-center">
              <span className="font-bold mb-1">
                {favTv && favTv.length > 0 ? favTv.length : 0}
              </span>
              <p className="opacity-60">Favorite Shows</p>
            </div>

            <div className="flex flex-col items-center justify-center max-w-[80px] text-center">
              <span className="font-bold mb-1">
                {wTv && (wTv.length > 0 ? wTv.length : 0)}
              </span>
              <p className="opacity-60">Watched Shows</p>
            </div>
          </div>
        </div>

        {user && (
          <div className="border-b-2 border-gray-500 pb-10">
            <h2 className="text-center text-4xl font-bold mb-2">
              {user?.name}
            </h2>
            <h3 className="text-center text-xl opacity-60">{user?.email}</h3>
          </div>
        )}

        {user && (
          <section className="mt-10 pb-0.5">
            {wM && (
              <section className="relative mb-16 px-4">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-2xl text-white">Watched Movies</h3>
                </div>

                <ProfileCarousel items={wM} type={'movie'} />
              </section>
            )}

            {favM && (
              <section className="relative mb-16 px-4">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-2xl text-white">Favorites Movies</h3>
                </div>

                <ProfileCarousel items={favM} type={'movie'} />
              </section>
            )}

            {wlM && (
              <section className="relative mb-16 px-4">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-2xl text-white">Watch Later Movies</h3>
                </div>

                <ProfileCarousel items={wlM} type={'movie'} />
              </section>
            )}

            {wTv && (
              <section className="relative mb-16 px-4">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-2xl text-white">Watched Tv Shows</h3>
                </div>

                <ProfileCarousel items={wTv} type={'tv'} />
              </section>
            )}

            {favTv && (
              <section className="relative mb-16 px-4">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-2xl text-white">Favorites Tv Shows</h3>
                </div>

                <ProfileCarousel items={favTv} type={'tv'} />
              </section>
            )}

            {wlTv && (
              <section className="relative mb-16 px-4">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-2xl text-white">Watch Later Tv Shows</h3>
                </div>

                <ProfileCarousel items={wlTv} type={'tv'} />
              </section>
            )}
          </section>
        )}
      </section>
    </main>
  );
}
