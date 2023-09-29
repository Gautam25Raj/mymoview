import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function ToggleLaterButton() {
  const { mediaType, id } = useParams();
  const [isLater, setIsLater] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchLater = async () => {
      try {
        const media = mediaType === 'movie' ? 'movies' : 'tv';

        const res = await fetch(
          `${process.env.URL}/api/user/${user.id}/${media}/watchLater`
        );
        const data = await res.json();

        setIsLater(data.includes(id.toString()));

        data.filter((later) => {
          return later.tmdb_id == id;
        }).length > 0
          ? setIsLater(true)
          : setIsLater(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLater();
  }, [id, mediaType, user]);

  const handleToggleLater = async () => {
    try {
      const media = mediaType === 'movie' ? 'movies' : 'tv';
      setLoading(true);

      if (isLater) {
        // Remove the movie from the user's Laters list
        await fetch(
          `${process.env.URL}/api/user/${user.id}/${media}/watchLater?userId=${user.id}&tmdbId=${id}`,
          {
            method: 'DELETE',
          }
        );
      } else {
        // Add the movie to the user's Laters list
        await fetch(
          `${process.env.URL}/api/user/${user.id}/${media}/watchLater`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: user.id,
              tmdbId: id,
            }),
          }
        );
      }

      setLoading(false);
      setIsLater(!isLater);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      onClick={handleToggleLater}
      className="bg-gray-900 px-4 py-2 rounded-full mb-5"
    >
      {loading ? 'Loading...' : isLater ? 'Remove Laters' : 'Add Laters'}
    </button>
  );
}

export default ToggleLaterButton;
