export default function useMovies() {
  const getNowPlayingMovies = async () => {
    const res = await fetch(`${process.env.URL}/api/movie/getNowPlayingMovies`);

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return res.json();
  };

  return { getNowPlayingMovies };
}
