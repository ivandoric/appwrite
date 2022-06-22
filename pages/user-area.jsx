import { useRouter } from 'next/router';
import { Appwrite } from 'appwrite';
import { useEffect, useState } from 'react';

function UserArea() {
  const [user, setUser] = useState(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const sdk = new Appwrite();
  sdk.setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT).setProject(process.env.NEXT_PUBLIC_PROJECT_ID);

  const res = sdk.account.getSession('current');

  res.then(
    (response) => {
      if (response.current) {
        setIsAuthenticated(true);
      }
    },
    (error) => {
      if (error.code === 401) {
        router.push('/login');
      }
    },
  );

  useEffect(() => {
    const userRes = sdk.account.get();

    userRes.then(
      (response) => {
        setUser(response);
      },
      (error) => {
        console.log(error);
      },
    );

  }, [isAuthenticated]);

  const logout = () => {
    const res = sdk.account.deleteSessions();
    res.then(
      () => router.push('/'),
      (error) => {
        console.log(error);
      },
    );
  };

  if (!isAuthenticated) return null;

  return (
    <section className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2>Hello, {user?.name}</h2>
      <p>This is an authenticated page.</p>

      <button
        onClick={() => logout()}
        className="relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4"
      >
        Logout
      </button>

    </section>
  );
}

export default UserArea;
