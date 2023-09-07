import React from 'react';
import Image from 'next/image';

const Cast = ({ data, loading }) => {
  const Skeleton = () => {
    return (
      <div>
        <div className="bg-gray-800 w-[175px] aspect-1/1.5 rounded-md mb-4 skeleton"></div>
        <div className="bg-gray-800 w-3/4 h-5 rounded-md mx-auto mb-2 skeleton"></div>
        <div className="bg-gray-800 w-3/4 h-5 rounded-md mx-auto skeleton"></div>
      </div>
    );
  };

  return (
    <div className="relative mb-12">
      <div className="w-full max-w-screen-2xl mx-auto px-5">
        <div className="text-2xl text-white mb-6">Main Cast</div>
        {!loading ? (
          <div className="flex gap-10 -mx-5 px-5 no-scrollbar no-scrollbar::-webkit-scrollbar overflow-y-hidden">
            {data?.slice(0, 30)?.map((item) => {
              return (
                <div className="text-center text-white" key={item.id}>
                  <div className="w-[175px] aspect-1/1.5 bg-gray-800 rounded-lg">
                    <Image
                      src={
                        item.profile_path
                          ? `https://image.tmdb.org/t/p/original${item.profile_path}`
                          : '/no-image.jpg'
                      }
                      width={175}
                      height={262}
                      alt={item.name}
                      className="object-cover rounded-lg"
                    />
                  </div>

                  <div className="">
                    <div className="text-lg font-bold">{item.name}</div>
                    <div className="text-sm opacity-70">{item.character}</div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex gap-5 overflow-y-hidden -mx-5 px-5 skeleton skeleton::after">
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        )}
      </div>
    </div>
  );
};

export default Cast;
