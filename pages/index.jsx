import Head from 'next/head';
import Link from 'next/link';
import { Appwrite } from 'appwrite';


export default function Home({movies}) {
  return (
    <div className="max-w-2xl py-2 mx-auto">
      <Head>
        <title>AppWrite Next</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h2 className="font-bold text-2xl pt-10 mb-10 text-white">Movies</h2>

      {movies?.documents.map((movie) => (
        <Link href={`/movies/${movie.$id}`} key={movie.$id}>
          <a className="block relative bg-slate-800 rounded-xl shadow-lg shadow-none ring-1 ring-inset ring-white/10 p-4 mb-4 max-w-lg hover:bg-slate-700">
            <h5 className="mb-2 text-1xl font-bold tracking-tight text-white">{movie.title}</h5>
            <p className="font-normal">{movie.year}</p>
          </a>
        </Link>
      ))}
    </div>
  );
}

export const getServerSideProps = async () => {
  const sdk = new Appwrite();
  sdk.setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT).setProject(process.env.NEXT_PUBLIC_PROJECT_ID);

  const res = sdk.database.listDocuments(process.env.NEXT_PUBLIC_COLLECTION_ID);

  res.then(
    (response) => {
      return response;
    },
    (error) => {
      return error;
    },
  );

  const movies = await res;

  return {
    props: {
      movies,
    },
  };
};
