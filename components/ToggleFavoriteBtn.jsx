import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function ToggleFavoriteButton() {
  const { mediaType, id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const media = mediaType === 'movie' ? 'movies' : 'tv';

        const res = await fetch(
          `${process.env.URL}/api/user/${user.id}/${media}/fav`
        );
        const data = await res.json();

        setIsFavorite(data.includes(id.toString()));

        data.filter((fav) => {
          return fav.tmdb_id == id;
        }).length > 0
          ? setIsFavorite(true)
          : setIsFavorite(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFavorites();
  }, [id, mediaType, user]);

  const handleToggleFavorite = async () => {
    try {
      const media = mediaType === 'movie' ? 'movies' : 'tv';
      setLoading(true);

      if (isFavorite) {
        // Remove the movie from the user's favorites list
        await fetch(
          `${process.env.URL}/api/user/${user.id}/${media}/fav?userId=${user.id}&tmdbId=${id}`,
          {
            method: 'DELETE',
          }
        );
      } else {
        // Add the movie to the user's favorites list
        await fetch(`${process.env.URL}/api/user/${user.id}/${media}/fav`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user.id,
            tmdbId: id,
          }),
        });
      }

      setLoading(false);
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      onClick={handleToggleFavorite}
      className="bg-gray-900 px-4 py-2 rounded-full mb-5"
    >
      {loading ? 'Loading...' : isFavorite ? 'Remove Favorite' : 'Add Favorite'}
    </button>
  );
}

export default ToggleFavoriteButton;
