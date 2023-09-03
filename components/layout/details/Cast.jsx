import React from 'react';
import Image from 'next/image';

const Cast = ({ data, loading }) => {
  const skeleton = () => {
    return (
      <div className="skItem">
        <div className="circle skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };
  return (
    <div className="castSection">
      <div className="w-full max-w-screen-2xl mx-auto px-20">
        <div className="sectionHeading">Main Cast</div>
        {!loading ? (
          <div className="listItems no-scrollbar no-scrollbar::-webkit-scrollbar">
            {data?.map((item) => {
              return (
                <div className="listItem" key={item.id}>
                  <div className="circle w-[175px] h-[175px]">
                    <Image
                      src={
                        item.profile_path
                          ? `https://image.tmdb.org/t/p/original${item.profile_path}`
                          : '/no-image.jpg'
                      }
                      width={175}
                      height={175}
                      alt={item.name}
                      className="w-[175px] h-[175px] object-cover rounded-full"
                    />
                  </div>

                  <div className="row">
                    <div className="text-lg font-bold">{item.name}</div>
                    <div className="text-sm opacity-70">{item.character}</div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="castSkeleton">
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cast;
