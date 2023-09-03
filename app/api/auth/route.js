import { NextResponse } from 'next/server';

export async function POST(request, { params }) {
  const bearerToken = process.env.BEARER_TOKEN;

  const { name, email, password } = await request.json();

  const res = await fetch(
    `https://cloud.syncloop.com/tenant/1693597273751/packages.MyMoView.adapter.APIs.setAPI.setUserInfo.main?name=${name}&email=${email}&password=${password}`,
    {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        'Content-Type': 'application/json',
      },
    }
  );
  const data = await res.json();

  return NextResponse.json({
    id: parseInt(data.id[0]),
    msg: ['User created successfully!'],
    success: true,
  });
}
