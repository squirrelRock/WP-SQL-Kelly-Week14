import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import useSWR from 'swr';
import { fetcher } from '../lib/fetchHelper';

export async function getStaticProps() {
  //getting the data during build
  const allData = await fetcher(
    'https://dev-kdurkin-sql.pantheonsite.io/wp-json/twentytwentyone-child/v1/rockSQLdbEndpoint'
  );

  return {
    props: {
      fallbackData: allData, // data for initial render
    },
    revalidate: 60, 
  };
}

export default function Home({ fallbackData }) {
  // SWR to fetch data with fallback from getStaticProps
  const { data: allData, error } = useSWR(
    'https://dev-kdurkin-sql.pantheonsite.io/wp-json/twentytwentyone-child/v1/rockSQLdbEndpoint',
    fetcher,
    {
      fallbackData, // to use the static data initially
      refreshInterval: 30000, //revalidate every 30 seconds
    }
  );

  // loading and error states
  if (error) return <p>Error loading data...</p>;
  if (!allData) return <p>Loading...</p>;

  return (
    <Layout home>
      <h1 className="text-center">List of Rock Posts</h1>
      <div className="list-group">
        {allData.map(({ ID, post_title }) => (
          <Link
            key={ID}
            href={`rocks4sale/${ID}`}
            className="list-group-item list-group-item-action"
          >
            <h2 className="py-3">{post_title || 'Untitled Post'}</h2>
          </Link>
        ))}
      </div>
    </Layout>
  );
}