export default function useMovies() {
  const getNowPlayingMovies = async () => {
    const res = await fetch(`${process.env.URL}/api/movie/nowPlaying`);

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return res.json();
  };

  return { getNowPlayingMovies };
}
