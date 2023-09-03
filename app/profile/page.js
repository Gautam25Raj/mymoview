import { useSelector } from 'react-redux';

async function getUser(email) {
  const res = await fetch(`${process.env.URL}/api/user/${email}`);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

// async function getUser(email) {
//   const res = await fetch(`${process.env.URL}/api/user/${email}`);

//   if (!res.ok) {
//     throw new Error('Failed to fetch data');
//   }

//   return res.json();
// }

export default function Home() {
  return (
    <main>
      <h1>Profile</h1>
    </main>
  );
}
