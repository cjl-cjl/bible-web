'use client';
import Form from 'next/form';
import { signupUser } from './signup';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const SignUpForm = () => {
  const pathname = useSearchParams().get('redirect') || '/';
  return (
    <div className="max-w-md w-full space-y-6 mx-8">
      <h1 className="font-bold text-3xl text-left">
        Sign up for a new account
      </h1>
      <Form action={signupUser} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-1 font-medium">
            Name
          </label>
          <input
            name="name"
            type="text"
            id="name"
            required
            className="border rounded px-3 py-2"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="username" className="mb-1 font-medium">
            Username
          </label>
          <input
            name="username"
            type="text"
            id="username"
            required
            className="border rounded px-3 py-2"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1 font-medium">
            Email
          </label>
          <input
            name="email"
            type="email"
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
        <div className="flex flex-col">
          <label htmlFor="confirmpassword" className="mb-1 font-medium">
            Confirm Password
          </label>
          <input
            name="confirmpassword"
            type="password"
            id="confirmpassword"
            required
            className="border rounded px-3 py-2"
          />
        </div>
        <input type="hidden" name="redirect" value={pathname} />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition hover:cursor-pointer"
        >
          Sign Up
        </button>
      </Form>
      <p className="text-sm text-center">
        Already have an account?{' '}
        <Link
          href={`/login?redirect=${encodeURIComponent(pathname)}`}
          className="text-blue-600 hover:underline"
        >
          Click here to login
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

export default SignUpForm;
