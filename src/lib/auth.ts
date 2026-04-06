'use server';

import { cookies } from 'next/headers';
import { usersApiUrl } from './env';
import { User } from './types';

const getActualPayloadFromApi = async (accessToken: string) => {
  const response = await fetch(`${usersApiUrl}/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    // Probably an error with the backend.
    console.error(response);
    return null;
  }
  const data = await response.json();
  return data;
};

export const getSessionUser = async (): Promise<User | null> => {
  const cookieStore = await cookies();
  const accessToken: string = cookieStore.get('access_token')?.value as string;
  if (!accessToken) {
    return null;
  }
  return await getActualPayloadFromApi(accessToken);
};
