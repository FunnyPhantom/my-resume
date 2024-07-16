import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const codes = [
  'ss', // todo: add code per asked user
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const accessCode = searchParams.get('accessCode');

  if (
    !accessCode ||
    !codes.some(
      (code) => code.toLocaleLowerCase() === accessCode.toLocaleLowerCase(),
    )
  ) {
    return new NextResponse('Not authorized', { status: 401 });
  }
  cookies().set('accessCode', accessCode, {
    maxAge: 60 * 60 * 24 * 14,
    httpOnly: true,
  });

  return new NextResponse('Authorized', {
    status: 200,
  });
}
