import { headers } from 'next/headers';
import { protocol, vercelURL } from 'src/helpers/env';

const baseURL = () => {
  const host = headers().get('host');
  return `${protocol}://${host || vercelURL}`;
};

export { baseURL };
