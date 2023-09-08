import dayjs from 'dayjs';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Rating from '../../carousel/Rating';

const Results = ({ item, type }) => {
  const router = useRouter();

  const posterUrl = item.poster_path
    ? 'https://image.tmdb.org/t/p/w342' + item.poster_path
    : '/no-image.jpg';

  return (
    <div
      className="md:p-2 md:hover:opacity-80 cursor-pointer md:hover:bg-gray-900 md:rounded-md"
      onClick={() =>
        router.push(
          `/explore/${
            item.media_type
              ? item.media_type
              : type === 'tvshow'
              ? 'tv'
              : 'movie'
          }/${item.id}`
        )
      }
    >
      <div className="relative mb-2 flex items-end justify-between p-2 h-64 md:h-80 aspect-1/1.5 rounded-md overflow-hidden bg-gray-800">
        <Image
          src={posterUrl}
          fill
          alt={item.title}
          objectFit="cover"
          className=""
        />

        <Rating rating={item.vote_average.toFixed(1)} />
      </div>

      <div className="flex flex-col">
        <h3 className="text-base mb-1 md:text-xl  whitespace-nowrap max-w-[210px] overflow-hidden">
          {item.title || item.name}
        </h3>

        <span className="text-sm opacity-50">
          {dayjs(item.release_date || item.first_air_date).format(
            'MMM D, YYYY'
          )}
        </span>
      </div>
    </div>
  );
};

export default Results;
