'use server';

import { usersApiUrl } from '@/lib/env';
import { getCookieOptions } from '@/lib/utils';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginUser(formData: FormData) {
  const emailorusername = formData.get('emailorusername') as string;
  const password = formData.get('password') as string;
  const remember = formData.get('remember') === 'on';
  const redirectPath = formData.get('redirect') as string;
  // const location = "unknown" // TODO: fix
  // const device = "Some browser" // TODO: Fix with user agent
  const requestBody = {
    emailorusername,
    password,
    remember,
  };
  const response = await fetch(`${usersApiUrl}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });
  const tokens = await response.json();
  const cookieOptions = getCookieOptions(remember);
  const cookieStore = await cookies();
  cookieStore.set('access_token', tokens.access_token, cookieOptions);
  cookieStore.set('refresh_token', tokens.refresh_token, cookieOptions);
  if (remember) {
    cookieStore.set('remember', 'true', cookieOptions);
  }
  redirect(redirectPath);
}
