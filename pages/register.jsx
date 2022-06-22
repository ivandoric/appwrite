import Head from 'next/head';
import { useState } from 'react';
import { Appwrite } from 'appwrite';
import { v4 as uuidv4 } from 'uuid';

export default function Register() {
  const [error, setError] = useState();

  const sdk = new Appwrite();
  sdk.setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT).setProject(process.env.NEXT_PUBLIC_PROJECT_ID);

  const handleSubmit = (e) => {
    e.preventDefault();

    let res = sdk.account.create(uuidv4(), e.target.email.value, e.target.password.value);

    res.then(
      (response) => {
        console.log(response);
      },
      (error) => {
        setError(error.message);
      },
    );

  };

  return (
    <div className="max-w-2xl py-2 mx-auto">
      <Head>
        <title>Register</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h2 className="font-bold text-2xl pt-10 text-white mb-2">Register</h2>

      <form className="mt-8 space-y-6" noValidate onSubmit={(e) => handleSubmit(e)}>
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border bg-slate-800 border-slate-600 placeholder-gray-500 rounded-t-md focus:outline-none focus:ring-slate-500 focus:border-slate-500 text-white"
              placeholder="Email address"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border bg-slate-800 border-slate-600 placeholder-gray-500 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-slate-50 text-white"
              placeholder="Password"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign up
          </button>
        </div>
        {error && <div className="bg-red-300 p-2 text-white rounded">{error}</div>}
      </form>
    </div>
  );
}
