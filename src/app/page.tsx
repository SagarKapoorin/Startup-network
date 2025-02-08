'use client';

import google from '@/assets/google1.png'
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { AnimatedBackground } from '@/components/Animation';

export default function Home() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
      <AnimatedBackground/>
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg m-4 z-10">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Sign in
          </h1>
          <p className="text-sm text-gray-500">
            to continue to the application
          </p>
        </div>

        <button
          className="group w-full flex items-center justify-center gap-3 bg-white px-6 py-4 text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
          onClick={() => {
            console.log('Google login clicked');
              signIn("google");
          }}
        >
          <Image src={google.src} alt='Google' className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform duration-200"/>
          <span className="text-sm font-semibold">Continue with Google</span>
        </button>

        <div className="text-center text-xs text-gray-500 space-y-4">
          <p>
            By continuing, you agree to our{' '}
            <a href="#" className="text-blue-600 hover:text-blue-700 underline underline-offset-2">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-blue-600 hover:text-blue-700 underline underline-offset-2">
              Privacy Policy
            </a>
          </p>
          <p>
            Need help?{' '}
            <a href="#" className="text-blue-600 hover:text-blue-700 underline underline-offset-2">
              Contact support
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}