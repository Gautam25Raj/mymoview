import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ReactPlayer from 'react-player';

import PlayIcon from './PlayIcon';

async function getVideos(type, id) {
  const res = await fetch(
    `${process.env.URL}/api/details/${type}/${id}/videos`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

const VideosList = () => {
  const { mediaType, id } = useParams();
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);
  const [videoId, setVideoId] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const data = await getVideos(mediaType, id);
      setVideos(data);
      setVideoId(data?.results[0]?.key);
      setLoading(false);
    };
    getData();
  }, [id, mediaType]);

  const SkelitonItem = () => {
    return (
      <div className="w-1/2 md:w-1/3 xl:w-1/4">
        <div className="bg-gray-800 w-full aspect-video rounded-md mb-7 skeleton"></div>
        <div className="bg-gray-800 w-3/4 h-5 mb-2 rounded-lg skeleton"></div>
      </div>
    );
  };

  return (
    <div className="relative mb-12">
      <div className="w-full max-w-screen-2xl mx-auto px-5">
        <div className="text-2xl text-white mb-6">Official Videos</div>
        {!loading ? (
          <div>
            <div className="w-full md:w-4/5 aspect-video bg-gray-800 mx-auto rounded-lg mb-10">
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${videoId}`}
                controls
                width="100%"
                height="100%"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto no-scrollbar::-webkit-scrollbar no-scrollbar -mx-5 px-5 md:gap-5 md:m-0 md:p-0">
              {videos?.results?.length > 0 ? (
                videos?.results?.map((video) => (
                  <div
                    className="w-1/2 md:w-1/3 xl:w-1/4 shrink-0 cursor-pointer hover:scale-90 hover:opacity-60 transition"
                    key={video.id}
                    onClick={() => {
                      setVideoId(video.key);
                    }}
                  >
                    <div className="mb-4 relative object-cover rounded-lg overflow-hidden flex aspect-video videoThumbnail">
                      <Image
                        src={`https://i.ytimg.com/vi/${video.key}/hqdefault.jpg`}
                        layout="fill"
                        alt={video.name}
                        className="object-cover rounded-lg transition-all"
                      />
                      <PlayIcon />
                    </div>

                    <div className="text-sm md:text-base">{video.name}</div>
                  </div>
                ))
              ) : (
                <div></div>
              )}
            </div>
          </div>
        ) : (
          <div>
            <div className="w-full md:w-4/5 aspect-video bg-gray-800 mx-auto rounded-lg mb-10 skeleton"></div>
            <div className="flex gap-2 overflow-x-auto no-scrollbar::-webkit-scrollbar no-scrollbar -mx-5 px-5 md:gap-5 md:m-0 md:p-0">
              <SkelitonItem />
              <SkelitonItem />
              <SkelitonItem />
              <SkelitonItem />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideosList;
