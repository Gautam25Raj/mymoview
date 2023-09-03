'use client';

import Rating from '@/components/carousel/Rating';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import PlayIcon from './PlayIcon';

async function getDetails(type, id) {
  const res = await fetch(`${process.env.URL}/api/details/${type}/${id}`);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

const DetailsHeader = ({ credits }) => {
  const { mediaType, id } = useParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const data = await getDetails(mediaType, id);
      setDetails(data);
      setLoading(false);
    };
    getData();
  }, [id, mediaType]);

  const convertFromMinutes = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins < 10 ? `0${mins}` : mins}m`;
  };

  const director = credits?.filter((credit) => credit.job === 'Director');
  const writer = credits?.filter(
    (credit) =>
      credit.job === 'Writer' ||
      credit.job === 'Screenplay' ||
      credit.job === 'Story'
  );

  return loading ? (
    <div>Loading...</div>
  ) : (
    <section className="w-full bg-black p-24 mb-12 relative">
      <div className="w-full h-full absolute top-0 left-0 opacity-50 overflow-hidden">
        <Image
          src={`https://image.tmdb.org/t/p/original${details?.backdrop_path}`}
          layout="fill"
          objectFit="cover"
          alt=""
          className="object-cover"
        />
      </div>

      <div className="w-full h-1/4 absolute bottom-0 left-0 hero-bg"></div>

      <div className="flex items-center w-full h-full gap-12">
        {details?.poster_path ? (
          <div className="border-8 border-white/40 z-10 flex rounded-xl">
            <Image
              src={`https://image.tmdb.org/t/p/original${details?.poster_path}`}
              width={350}
              height={525}
              alt=""
              className="w-[350px]"
            />
          </div>
        ) : (
          <div className="border-8 border-white/40 z-10 flex rounded-xl">
            <Image src="/no-image-jpg" width={350} height={525} alt="" />
          </div>
        )}

        <div className="z-10 text-white">
          <h2 className="text-5xl font-bold mb-2">
            {`${details?.title || details?.name} `}
            <span className="text-4xl opacity-80 font-normal">
              (
              {dayjs(details?.release_date || details?.first_air_date).format(
                'YYYY'
              )}
              )
            </span>
          </h2>

          {details?.tagline && (
            <h3 className="text-xl font-medium mb-4 opacity-70">
              {details?.tagline}
            </h3>
          )}

          <div className="flex gap-4 mb-8">
            {details?.genres?.map((genre) => (
              <span
                key={genre.name}
                className="text-sm bg-white text-black py-1 px-1.5 rounded-md"
              >
                {genre.name}
              </span>
            ))}
          </div>

          <div className="flex gap-8 mb-8">
            <Rating
              rating={details?.vote_average?.toFixed(1)}
              size="w-24 h-24"
              font="28px"
            />
          </div>

          <div className="max-w-lg mb-12">
            <h3 className="text-3xl mb-2">Overview</h3>
            <p>{details?.overview && details?.overview}</p>
          </div>

          <div className="border-b py-4 flex">
            {details && details?.status && (
              <div className="mr-2 flex flex-wrap">
                <span className="mr-2 font-bold">Status: </span>
                <span className="mr-2 opacity-50">{' ' + details?.status}</span>
              </div>
            )}

            {details && details.release_date && (
              <div className="mr-2 flex flex-wrap">
                <span className="mr-2 font-bold">Release Date: </span>
                <span className="mr-2 opacity-50">
                  {dayjs(details.release_date).format('MMM DD, YYYY')}
                </span>
              </div>
            )}

            {details && details?.runtime && (
              <div className="mr-2 flex flex-wrap">
                <span className="mr-2 font-bold">Runtime: </span>
                <span className="mr-2 opacity-50">
                  {' ' + convertFromMinutes(details?.runtime)}
                </span>
              </div>
            )}
          </div>

          {director && director?.length > 0 && (
            <div className="border-b py-4 flex">
              <div className="mr-2 flex flex-wrap">
                <span className="mr-2 font-bold">Director: </span>
                <span className="mr-2 opacity-50">
                  {director?.map((d, i) => (
                    <span key={d.name}>
                      {d.name}
                      {director?.length - 1 !== i && ', '}
                    </span>
                  ))}
                </span>
              </div>
            </div>
          )}

          {writer && writer?.length > 0 && (
            <div className="border-b py-4 flex">
              <div className="mr-2 flex flex-wrap">
                <span className="mr-2 font-bold">Writer: </span>
                <span className="mr-2 opacity-50">
                  {writer?.map((d, i) => (
                    <span key={d.name}>
                      {d.name}
                      {writer?.length - 1 !== i && ', '}
                    </span>
                  ))}
                </span>
              </div>
            </div>
          )}

          {details && details?.created_by?.length > 0 && (
            <div className="border-b py-4 flex">
              <div className="mr-2 flex flex-wrap">
                <span className="mr-2 font-bold">Creator: </span>
                <span className="mr-2 opacity-50">
                  {details?.created_by?.map((d, i) => (
                    <span key={d.name}>
                      {d.name}
                      {details?.created_by?.length - 1 !== i && ', '}
                    </span>
                  ))}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DetailsHeader;