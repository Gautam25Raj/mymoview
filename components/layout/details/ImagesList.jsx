import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Carousel } from '@material-tailwind/react';

async function getImages(type, id) {
  const res = await fetch(
    `${process.env.URL}/api/details/${type}/${id}/images`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

const ImagesList = () => {
  const { mediaType, id } = useParams();
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [imageId, setImageId] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const data = await getImages(mediaType, id);
      setImages(data);
      console.log(data);
      setImageId(data.posters[0].file_path);
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
        <div className="text-2xl text-white mb-6">Official Images</div>
        {!loading ? (
          <div>
            <div className="w-full md:w-4/5 aspect-video bg-gray-800 mx-auto rounded-lg mb-10">
              <Image
                src={`https://image.tmdb.org/t/p/original/${imageId}`}
                layout="fill"
                alt={imageId ? imageId : 'No Image'}
                className="object-cover rounded-lg transition-all"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto no-scrollbar::-webkit-scrollbar no-scrollbar -mx-5 px-5 md:gap-5 md:m-0 md:p-0">
              {images?.backdrops?.length > 0 ? (
                images?.backdrops?.map((image) => (
                  <div
                    className="w-1/2 md:w-1/3 xl:w-1/4 shrink-0 cursor-pointer hover:scale-90 hover:opacity-60 transition"
                    key={image.id}
                    onClick={() => {
                      setImageId(image.file_path);
                    }}
                  >
                    <div className="mb-4 relative object-cover rounded-lg overflow-hidden flex aspect-video">
                      <Image
                        src={`https://image.tmdb.org/t/p/original/${image.file_path}`}
                        layout="fill"
                        alt={image.file_path ? image.file_path : 'No Image'}
                        className="object-cover rounded-lg transition-all"
                      />
                    </div>
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
export default ImagesList;
