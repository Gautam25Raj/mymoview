'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

const UserBtn = () => {
  const [watched, setWatched] = useState([]);
  const [fav, setFav] = useState([]);
  const [watchLater, setWatchLater] = useState([]);

  const [isFavorite, setIsFavorite] = useState();
  const [isWatched, setIsWatched] = useState();
  const [isWatchLater, setIsWatchLater] = useState();

  const { mediaType, id } = useParams();
  console.log(mediaType);

  const handleAddWatched = async (userId, tmdbId) => {
    console.log('Add Watched');
  };

  const handleAddFavorite = async (userId, tmdbId) => {
    try {
      const apiType = mediaType === 'movie' ? 'movies' : 'tv';

      console.log(`/api/user/${userId}/${apiType}/fav`);
      const res = await fetch(`/api/user/${userId}/${apiType}/fav`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          tmdbId,
        }),
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddWatchLater = () => {
    console.log('Add Watch Later');
  };

  const handleRemoveWatched = () => {
    console.log('Remove Watched');
  };

  const handleRemoveFavorite = () => {
    console.log('Remove Favorite');
  };

  const handleRemoveWatchLater = () => {
    console.log('Remove Watch Later');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiType = mediaType === 'movie' ? 'movies' : 'tv';

        let [w, f, wl] = await Promise.all([
          fetch(`${process.env.URL}/api/user/${6}/${apiType}/watched`),
          fetch(`${process.env.URL}/api/user/${6}/${apiType}/fav`),
          fetch(`${process.env.URL}/api/user/${6}/${apiType}/watchLater`),
        ]);

        const watchedData = await w.json();
        const favData = await f.json();
        const watchLaterData = await wl.json();

        setWatched(watchedData);
        setFav(favData);
        setWatchLater(watchLaterData);

        setIsFavorite(
          fav.some((obj) => {
            console.log(obj.tmdb_id);
            console.log(obj.tmdb_id == id);
            return obj.tmdb_id == id;
          })
        );
        setIsWatched(
          watched.some((obj) => {
            console.log(obj.tmdb_id);
            console.log(obj.tmdb_id == id);
            return obj.tmdb_id == id;
          })
        );
        setIsWatchLater(
          watchLater.some((obj) => {
            console.log(obj.tmdb_id);
            console.log(obj.tmdb_id == id);
            return obj.tmdb_id == id;
          })
        );

        console.log(isFavorite);
        console.log(isWatched);
        console.log(isWatchLater);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className="mb-6 flex gap-3">
      {isWatched ? (
        <button
          className="bg-gray-900 px-3 py-2 rounded-full hover:opacity-80 hover:scale-105"
          onClick={handleRemoveWatched}
        >
          Remove Watched
        </button>
      ) : (
        <button
          className="bg-gray-900 px-3 py-2 rounded-full hover:opacity-80 hover:scale-105"
          onClick={handleAddWatched}
        >
          Add Watched
        </button>
      )}

      {isFavorite ? (
        <button
          className="bg-gray-900 px-3 py-2 rounded-full hover:opacity-80 hover:scale-105"
          onClick={handleRemoveFavorite}
        >
          Remove Favorite
        </button>
      ) : (
        <button
          className="bg-gray-900 px-3 py-2 rounded-full hover:opacity-80 hover:scale-105"
          onClick={() => handleAddFavorite(6, id)}
        >
          Add Favorite
        </button>
      )}

      {isWatchLater ? (
        <button
          className="bg-gray-900 px-3 py-2 rounded-full hover:opacity-80 hover:scale-105"
          onClick={handleRemoveWatchLater}
        >
          Remove Watch Later
        </button>
      ) : (
        <button
          className="bg-gray-900 px-3 py-2 rounded-full hover:opacity-80 hover:scale-105"
          onClick={handleAddWatchLater}
        >
          Add Watch Later
        </button>
      )}
    </div>
  );
};
export default UserBtn;
