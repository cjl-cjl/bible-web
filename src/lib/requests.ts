import { cookies } from 'next/headers';
import { versesApiUrl, usersApiUrl } from './env';
import { getJoinedUrls } from './utils';

export const makeVersesRequest = async (
  endpoint: string,
  requestType: string,
  body?: unknown,
) => {
  try {
    const res = await fetch(getJoinedUrls([versesApiUrl, endpoint]), {
      method: requestType,
      headers: {
        'Content-Type': 'application/json',
      },
      body: requestType !== 'GET' ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
      console.error(
        `Request to ${versesApiUrl}/${endpoint} returned a not ok status code.`,
      );
    }
    return await res.json();
  } catch (error) {
    console.error(
      `Error making request to ${versesApiUrl}/${endpoint}. The error was ${error}.`,
    );
    return null;
  }
};

export const makeUsersRequest = async (
  endpoint: string,
  requestType: string,
  body?: unknown,
) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token');
  if (accessToken == null) {
    return null;
  }
  const acutalUrl = getJoinedUrls([usersApiUrl, endpoint]);
  try {
    const res = await fetch(acutalUrl, {
      method: requestType,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken.value}`,
      },
      body: requestType !== 'GET' ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) {
      console.error(`Request to ${acutalUrl} returned a not ok status code.`);
    }
    return await res.json();
  } catch (error) {
    console.error(
      `Error making request to ${acutalUrl}. The error was ${error}.`,
    );
    return null;
  }
};

export const makeUsersRequestFormBody = async (
  endpoint: string,
  requestType: string,
  body: Record<string, string | number | boolean | null | undefined>,
) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token');
  if (accessToken == null) {
    return null;
  }
  const formBody = new URLSearchParams();
  for (const [key, value] of Object.entries(body)) {
    if (value !== undefined && value !== null) {
      formBody.append(key, String(value));
    }
  }
  const acutalUrl = getJoinedUrls([usersApiUrl, endpoint]);
  try {
    const res = await fetch(acutalUrl, {
      method: requestType,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${accessToken.value}`,
      },
      body: formBody,
    });
    if (!res.ok) {
      console.error(`Request to ${acutalUrl} returned a not ok status code.`);
    }
    return await res.json();
  } catch (error) {
    console.error(
      `Error making request to ${acutalUrl}. The error was ${error}.`,
    );
    return null;
  }
};
