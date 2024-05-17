"use client";

import Link from "next/link";

export default function HomeSite() {
  return (
    <div className="flex items-start justify-center min-h-screen bg-gray-100">
      <div className="mt-10 flex space-x-4">
        <h1 className="text-xl font-bold text-gray-800">
          <Link href="/Dashboard/Form/RegisterForm">
            <p className="px-4 py-2 text-white bg-orange-500 rounded hover:bg-orange-600">
              Sign Up
            </p>
          </Link>
        </h1>
        <h1 className="text-xl font-bold text-gray-800">
          <Link href="/Dashboard/Form/LoginForm">
            <p className="px-4 py-2 text-white bg-orange-500 rounded hover:bg-orange-600">
              Sign In
            </p>
          </Link>
        </h1>
      </div>
    </div>
  );
}
