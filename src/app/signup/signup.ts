'use server';

import { redirect } from 'next/navigation';
import { usersApiUrl } from '@/lib/env';
import { getCookieOptions } from '@/lib/utils';
import { cookies } from 'next/headers';

export async function signupUser(formData: FormData) {
  const email = formData.get('email') as string;
  const name = formData.get('name') as string;
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;
  const confirmpassword = formData.get('confirmpassword') as string;
  const redirectPath = formData.get('redirect') as string;

  if (password !== confirmpassword) {
    redirect(`/signup?redirect=${encodeURIComponent(redirectPath)}`);
  }

  const requestBody = {
    name,
    username,
    email,
    password,
  };

  const response1 = await fetch(`${usersApiUrl}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  if (response1.ok) {
    const remember = false;
    const loginFormBody = {
      email,
      password,
      remember,
    };
    const response2 = await fetch(`${usersApiUrl}/login`, {
      method: 'POST',
      body: JSON.stringify(loginFormBody),
    });
    const tokens = await response2.json();
    const cookieOptions = getCookieOptions(remember);
    const cookieStore = await cookies();
    cookieStore.set('access_token', tokens.access_token, cookieOptions);
    cookieStore.set('refresh_token', tokens.refresh_token, cookieOptions);
    if (remember) {
      cookieStore.set('remember', 'true', cookieOptions);
    }
    redirect(redirectPath);
  } else {
    console.error(response1);
    redirect(`/signup?redirect=${encodeURIComponent(redirectPath)}`);
  }
}
