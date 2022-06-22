import Head from 'next/head';
import { Appwrite } from 'appwrite';

export default function Movie({ movie }) {
  return (
    <div className="max-w-2xl py-2 mx-auto">
      <Head>
        <title>{movie.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h2 className="font-bold text-2xl pt-10 text-white mb-2">{movie.title}</h2>
      <span>{movie.year}</span>
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.query;

  const sdk = new Appwrite();
  sdk.setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT).setProject(process.env.NEXT_PUBLIC_PROJECT_ID);

  const res = sdk.database.getDocument(process.env.NEXT_PUBLIC_COLLECTION_ID, id);

  res.then(
    (response) => {
      return response;
    },
    (error) => {
      return error;
    },
  );

  const movie = await res;

  return {
    props: {
      movie,
    },
  };

};
