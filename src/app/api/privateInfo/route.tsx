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

  return new NextResponse('Authorized', {
    status: 200,
    headers: {
      'Set-Cookie': `accessCode=${accessCode}; Path=/; expires=${new Date(
        Date.now() + 1000 * 60 * 60 * 24 * 365,
      ).toUTCString()}; httpOnly;`,
    },
  });
}
