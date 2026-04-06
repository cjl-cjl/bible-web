'use server';

import { usersApiUrl } from '@/lib/env';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function logout(formData: FormData) {
  let redirectPath = formData.get('redirect') as string;
  if (redirectPath === '') {
    redirectPath = '/';
  }
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refresh_token')?.value;
  await fetch(`${usersApiUrl}/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Refresh: refreshToken || '',
    },
  });
  cookieStore.delete('access_token');
  cookieStore.delete('refresh_token');
  cookieStore.delete('remember');
  redirect(redirectPath);
}
