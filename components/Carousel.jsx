import { useRef } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import CarouselItem from './carousel/CarouselItem';

const Carousel = ({ data, loading, type, noGenre }) => {
  const carouselContainer = useRef();

  const navigation = (direction) => {
    const container = carouselContainer.current;

    const scrollAmount =
      direction === 'left'
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);

    container.scrollTo({
      left: scrollAmount,
      behavior: 'smooth',
    });
  };

  if (data?.length === 0)
    return (
      <div>Oops!! No {type === 'movie' ? 'movies' : 'tv shows'} found 😢</div>
    );

  const SkelitonItem = () => {
    return (
      <div>
        <div className="bg-gray-800 h-64 md:h-80 aspect-1/1.5 rounded-md mb-7 skeleton"></div>
        <div className="textBlock">
          <div className="bg-gray-800 w-full h-5 mb-2 rounded-lg skeleton"></div>
          <div className="bg-gray-800 w-3/4 h-5 mb-2 rounded-lg skeleton"></div>
          <div className="bg-gray-800 h-5 w-3/5 rounded-lg skeleton"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="mb-12 relative">
      <div className="left-4 text-white absolute top-[40%] -translate-y-1/2 cursor-pointer opacity-60 z-20 hidden md:block md:hover:opacity-100 bg-black rounded-full p-2">
        <ArrowLeftIcon className="w-8 h-8" onClick={() => navigation('left')} />
      </div>

      <div className="right-4 text-white absolute top-[40%] -translate-y-1/2 cursor-pointer opacity-60 z-20 hidden md:block md:hover:opacity-100 bg-black rounded-full p-2">
        <ArrowRightIcon
          className="w-8 h-8"
          onClick={() => navigation('right')}
        />
      </div>

      {loading ? (
        <div className="flex gap-3 md:gap-5">
          <SkelitonItem />
          <SkelitonItem />
          <SkelitonItem />
          <SkelitonItem />
          <SkelitonItem />
        </div>
      ) : (
        <div
          className="flex gap-4 overflow-y-hidden -mx-5 px-5 md:gap-5 md:m-0 md:p-0 no-scrollbar::-webkit-scrollbar no-scrollbar"
          ref={carouselContainer}
        >
          {data?.map((item) => (
            <CarouselItem
              key={item.id}
              item={item}
              type={type}
              noGenre={noGenre}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
