import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { usersApiUrl, encodedJwtKey } from './lib/env';
import { jwtVerify } from 'jose';
import { getCookieOptions } from './lib/utils';
import { errors as JoseErrors } from 'jose';
import type { JwtPayloadData } from './lib/types';

export async function proxy(request: NextRequest) {
  // Read tokens
  let accessToken = request.cookies.get('access_token')?.value as string;
  let refreshToken = request.cookies.get('refresh_token')?.value as string;
  const remember =
    (request.cookies.get('remember')?.value as string) === 'true';
  if (!accessToken || !refreshToken) {
    // If for some reason, something is not valid, clear session and render response
    request.cookies.delete('access_token');
    request.cookies.delete('refresh_token');
    request.cookies.delete('remember');
    const response = NextResponse.next({ request: request });
    response.cookies.delete('access_token');
    response.cookies.delete('refresh_token');
    response.cookies.delete('remember');
    return response;
  }

  let payload: JwtPayloadData;
  try {
    // Check if payload verification succeeds
    payload = await jwtVerify(accessToken, encodedJwtKey);
    const now = Math.floor(Date.now() / 1000);
    // Check if expiry is soon, because, in some server components, there could be a delay between checking tokens and getting session for backend. The app should not error out.
    if (payload.payload.exp! - now < 30) {
      const refreshResponse = await fetch(`${usersApiUrl}/refreshtoken`, {
        method: 'POST',
        headers: {
          Refresh: refreshToken,
        },
      });

      if (!refreshResponse.ok) {
        // If response is not ok, reuse tokens could be detected and soft lock the app until cookies are cleared. So, clear session and render response
        request.cookies.delete('access_token');
        request.cookies.delete('refresh_token');
        request.cookies.delete('remember');
        console.error(await refreshResponse.json());
        const response = NextResponse.next({ request: request });
        response.cookies.delete('access_token');
        response.cookies.delete('refresh_token');
        response.cookies.delete('remember');
        return response;
      }
      const responseJson = await refreshResponse.json();
      accessToken = responseJson.access_token;
      refreshToken = responseJson.refresh_token;
      // New tokens are obtained. So, set the cookies.
      const cookieOptions = getCookieOptions(remember);
      request.cookies.set({
        name: 'access_token',
        value: accessToken,
        ...cookieOptions,
      });

      request.cookies.set({
        name: 'refresh_token',
        value: refreshToken,
        ...cookieOptions,
      });

      request.cookies.set({
        name: 'remember',
        value: String(remember),
        ...cookieOptions,
      });
    }
    // If verification succeeds and whether tokens refreshed or not, render response (now the tokens will be valid for atleast 30 seconds (within current response))
    const response = NextResponse.next({
      request: request,
    });
    const cookieOptions = getCookieOptions(remember);
    response.cookies.set({
      name: 'access_token',
      value: accessToken,
      ...cookieOptions,
    });

    response.cookies.set({
      name: 'refresh_token',
      value: refreshToken,
      ...cookieOptions,
    });

    response.cookies.set({
      name: 'remember',
      value: String(remember),
      ...cookieOptions,
    });
    return response;
  } catch (err) {
    // Token errored out, so check if it's an expiry error. If expiry, just refresh tokens
    if (err instanceof JoseErrors.JWTExpired) {
      const refreshResponse = await fetch(`${usersApiUrl}/refreshtoken`, {
        method: 'POST',
        headers: {
          Refresh: refreshToken,
        },
      });
      if (!refreshResponse.ok) {
        // If response is not ok, reuse tokens could be detected and soft lock the app until cookies are cleared. So, clear session and render response
        request.cookies.delete('access_token');
        request.cookies.delete('refresh_token');
        request.cookies.delete('remember');
        console.error(await refreshResponse.json());
        const response = NextResponse.next({ request: request });
        response.cookies.delete('access_token');
        response.cookies.delete('refresh_token');
        response.cookies.delete('remember');
        return response;
      }
      // Response was ok. so, set new tokens as cookies.
      const responseJson = await refreshResponse.json();
      accessToken = responseJson.access_token;
      refreshToken = responseJson.refresh_token;
      payload = await jwtVerify(accessToken, encodedJwtKey);
      const cookieOptions = getCookieOptions(remember);
      request.cookies.set({
        name: 'access_token',
        value: accessToken,
        ...cookieOptions,
      });

      request.cookies.set({
        name: 'refresh_token',
        value: refreshToken,
        ...cookieOptions,
      });

      request.cookies.set({
        name: 'remember',
        value: String(remember),
        ...cookieOptions,
      });
      const response = NextResponse.next({
        request: request,
      });
      const newCookieOptions = getCookieOptions(remember);
      response.cookies.set({
        name: 'access_token',
        value: accessToken,
        ...newCookieOptions,
      });

      response.cookies.set({
        name: 'refresh_token',
        value: refreshToken,
        ...newCookieOptions,
      });

      response.cookies.set({
        name: 'remember',
        value: String(remember),
        ...newCookieOptions,
      });
      return response;
    }
    // Now, the error is something other than expired tokens. So tokens could be tampererd with or server db errors. So, clear session and render response.
    else {
      console.error(err);
      request.cookies.delete('access_token');
      request.cookies.delete('refresh_token');
      request.cookies.delete('remember');
      const response = NextResponse.next({ request: request });
      response.cookies.delete('access_token');
      response.cookies.delete('refresh_token');
      response.cookies.delete('remember');
      return response;
    }
  }
}

export const config = {
  matcher: [
    '/',
    '/(TOVBSI|KJV|WEB|ASV|WEBU|MLSVP|GOVBSI|OOVBSI)(/.*)?',
    '/settings',
    '/about',
    '/faq',
    '/tips',
    '/resources',
    '/blog',
    '/search',
  ],
};
