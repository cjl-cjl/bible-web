'use client';

import Link from 'next/link';
import { loginUser } from './login';
import Form from 'next/form';
import { useSearchParams } from 'next/navigation';

const LoginPage = () => {
  const pathname = useSearchParams().get('redirect') || '/';
  return (
    <div className="max-w-md w-full space-y-6 mx-8">
      <h1 className="font-bold text-3xl text-left">Log in to your account</h1>
      <Form action={loginUser} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="emailorusername" className="mb-1 font-medium">
            Email or Username
          </label>
          <input
            name="emailorusername"
            type="text"
            id="email"
            required
            className="border rounded px-3 py-2"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="mb-1 font-medium">
            Password
          </label>
          <input
            name="password"
            type="password"
            id="password"
            required
            className="border rounded px-3 py-2"
          />
        </div>
        <div className="flex items-center space-x-2">
          <input
            name="remember"
            type="checkbox"
            id="remember"
            className="h-4 w-4"
          />
          <label htmlFor="remember" className="text-sm">
            Remember me
          </label>
        </div>
        <input type="hidden" name="redirect" value={pathname} />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition hover:cursor-pointer"
        >
          Login
        </button>
      </Form>
      <p className="text-sm text-center">
        Don’t have an account?{' '}
        <Link
          href={`/signup?redirect=${encodeURIComponent(pathname)}`}
          className="text-blue-600 hover:underline"
        >
          Click here to sign up
        </Link>
      </p>
      <p className="text-sm text-center">
        <Link href={pathname} className="text-blue-600 hover:underline">
          Go back
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
