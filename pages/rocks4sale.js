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
      <div className="p-1">
        <h1 className="page-title">Rocks for Sale</h1 >
        <div className="grid-container">
          {allData.map(({ ID, post_title, rock_image }) => (
            <Link key={ID} href={`rocks4sale/${ID}`} className="grid-item">
              <div className="card">
                <div className="image-container">
                  <img
                    src={rock_image}
                    alt={post_title || 'Rock for Sale'}
                    className="rock-image"
                  />
                </div>
                <h2 className="card-title">{post_title || 'Untitled Post'}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
     
    </Layout>
  );
}