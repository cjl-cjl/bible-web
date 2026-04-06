import SignUpForm from './signupform';
import Image from 'next/image';
import { getSessionUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

const SignUpPage = async () => {
  const session = await getSessionUser();
  if (session) {
    redirect('/');
  }
  return (
    <div className="flex h-screen">
      <div className="w-1/3 hidden md:block relative h-full">
        <Image
          fill={true}
          src="/placeholder1.jpg"
          className="w-full h-full object-cover"
          alt="An image to fill the empty space"
        ></Image>
      </div>
      <div className="w-full md:w-2/3 flex items-center justify-center">
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUpPage;
