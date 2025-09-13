'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft ,User} from 'lucide-react';


export default function SignupPage() {
  const router = useRouter();


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <User className="h-64 w-64 text-gray-800 mx-auto mb-4" />
           <p className="text-gray-600">
            User registration is only available through the admin dashboard.
          </p>
          <Link
            href="/auth/login"
            className="inline-flex items-center mt-4 text-blue-600 hover:text-blue-500"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
