// import { NextResponse } from 'next/server';

// export async function GET(request) {
//   const bearerToken = process.env.BEARER_TOKEN;
//   const apiKey = process.env.API_KEY;

//   const res = await fetch(
//     `https://cloud.syncloop.com/tenant/1693563382145/packages.MeMoView.tmdb.movies.getTopMovies.main?apiKey=${apiKey}`,
//     {
//       headers: {
//         Authorization: `Bearer ${bearerToken}`,
//         'Content-Type': 'application/json',
//       },
//     }
//   );
//   const data = await res.json();

//   return NextResponse.json(data.response.jsonDoc);
// }

import { NextResponse } from 'next/server';

export async function GET(request) {
  const apiKey = process.env.API_KEY;

  const res = await fetch(
    `https://api.themoviedb.org/3/configuration?api_key=${apiKey}`,
    {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NTY0ZjJlNGY3NTUyM2ZjNzVjOTgwODI0ODJlZTUzZCIsInN1YiI6IjYwYWU1Y2FmMTI2ZWMzMDAyYTJmMDI3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5xB-lQ4ecASTcrpt2GqiY8z2telqqoCzLO0wBN0AkXo`,
        'Content-Type': 'application/json',
      },
    }
  );
  const data = await res.json();

  return NextResponse.json(data);
}
