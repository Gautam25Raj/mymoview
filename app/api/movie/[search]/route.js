import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const search = params.search;

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${search}?language=en-US&page=1`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NTY0ZjJlNGY3NTUyM2ZjNzVjOTgwODI0ODJlZTUzZCIsInN1YiI6IjYwYWU1Y2FmMTI2ZWMzMDAyYTJmMDI3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5xB-lQ4ecASTcrpt2GqiY8z2telqqoCzLO0wBN0AkXo',
      },
    }
  );
  const data = await res.json();

  return NextResponse.json({ data });
}
