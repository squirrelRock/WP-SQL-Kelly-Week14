//pages/squirrels.js
import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import useSWR from 'swr';
import { fetcher } from '../lib/fetchHelper';

export async function getStaticProps() {
  //getting the data during build
  const allSData = await fetcher(
    'https://dev-kdurkin-sql.pantheonsite.io/wp-json/twentytwentyone-child/v1/squirrelsEndpoint'
  );

  return {
    props: {
      fallbackData: allSData, // data for initial render
    },
    revalidate: 1, 
  };
}

export default function Home({ fallbackData }) {
  // SWR to fetch data with fallback from getStaticProps

    const { data: allSData, error } = useSWR(
      'https://dev-kdurkin-sql.pantheonsite.io/wp-json/twentytwentyone-child/v1/squirrelsEndpoint',
      fetcher,
      { fallbackData }
    );
  
    if (error) return <p>Error loading data...</p>;
    if (!allSData) return <p>Loading...</p>;
  
    return (
      <Layout home>
        <h1 className="text-center">List of Squirrel Posts</h1>
        <div className="list-group">
          {allSData.map(({ ID, post_title, post_date }) => (
            <Link
              key={ID}
              href={`squirrels/${ID}`}
              className="list-group-item list-group-item-action"
            >
              <h2 className="py-3">{post_title || 'Untitled Post'}</h2>
              <p className="card-text small">
                  Date: {post_date ? post_date.split(' ')[0] : 'No date available'}
              </p>
            </Link>
          ))}
        </div>
      </Layout>
    );
  }