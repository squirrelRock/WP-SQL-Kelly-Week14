// pages/rocks4sale.js
import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import useSWR from 'swr';
import { fetcher } from '../lib/fetchHelper';

export async function getStaticProps() {
  const allData = await fetcher(
    'https://dev-kdurkin-sql.pantheonsite.io/wp-json/twentytwentyone-child/v1/rockSQLdbEndpoint'
  );

  return {
    props: {
      fallbackData: allData,
    },
    revalidate: 60,
  };
}

export default function RocksForSale({ fallbackData }) {
  const { data: allData, error } = useSWR(
    'https://dev-kdurkin-sql.pantheonsite.io/wp-json/twentytwentyone-child/v1/rockSQLdbEndpoint',
    fetcher,
    { fallbackData }
  );

  if (error) return <p>Error loading data...</p>;
  if (!allData) return <p>Loading...</p>;

  return (
    <Layout home>
      <div className="p-2">
        <h1 className="text-center mb-4 py-5">Rocks for Sale</h1>
        <div className="rocks-sale-grid">
          {allData.map(({ ID, post_title }) => (
            <Link key={ID} href={`rocks4sale/${ID}`} className="rocks-sale-card">
              <div className="rocks-sale-card-content">
                <h2>{post_title || 'Untitled Post'}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}