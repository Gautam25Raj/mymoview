import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function ToggleWatchedButton() {
  const { mediaType, id } = useParams();
  const [isWatched, setIsWatched] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchWatched = async () => {
      try {
        const media = mediaType === 'movie' ? 'movies' : 'tv';

        const res = await fetch(
          `${process.env.URL}/api/user/${user.id}/${media}/watched`
        );
        const data = await res.json();

        setIsWatched(data.includes(id.toString()));

        data.filter((watched) => {
          return watched.tmdb_id == id;
        }).length > 0
          ? setIsWatched(true)
          : setIsWatched(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWatched();
  }, [id, mediaType, user]);

  const handleToggleWatched = async () => {
    try {
      const media = mediaType === 'movie' ? 'movies' : 'tv';
      setLoading(true);

      if (isWatched) {
        // Remove the movie from the user's Watcheds list

        await fetch(
          `${process.env.URL}/api/user/${user.id}/${media}/watched?userId=${user.id}&tmdbId=${id}`,
          {
            method: 'DELETE',
          }
        );
      } else {
        // Add the movie to the user's Watcheds list

        await fetch(`${process.env.URL}/api/user/${user.id}/${media}/watched`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user.id,
            tmdbId: id,
            date_watched: new Date().toISOString().slice(0, 10),
          }),
        });
      }

      setLoading(false);
      setIsWatched(!isWatched);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      onClick={handleToggleWatched}
      className="bg-gray-900 px-4 py-2 rounded-full mb-5"
    >
      {loading ? 'Loading...' : isWatched ? 'Remove Watched' : 'Add Watched'}
    </button>
  );
}

export default ToggleWatchedButton;
