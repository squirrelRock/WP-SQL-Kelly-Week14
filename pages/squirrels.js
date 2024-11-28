import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import useSWR from 'swr';
import { fetcher } from '../lib/fetchHelper';

export async function getStaticProps() {
  // Fetch data during build
  const allSData = await fetcher(
    'https://dev-kdurkin-sql.pantheonsite.io/wp-json/twentytwentyone-child/v1/squirrelsEndpoint'
  );

  return {
    props: {
      fallbackData: allSData,
    },
    revalidate: 1,
  };
}

export default function Squirrels({ fallbackData }) {
  // SWR to fetch data dynamically
  const { data: allSData, error } = useSWR(
    'https://dev-kdurkin-sql.pantheonsite.io/wp-json/twentytwentyone-child/v1/squirrelsEndpoint',
    fetcher,
    { fallbackData }
  );

  if (error) return <p>Error loading data...</p>;
  if (!allSData) return <p>Loading...</p>;

  return (
    <Layout>
     
      <div style={{ backgroundColor: '#eef6f1', minHeight: '100vh', padding: '20px' }}>
        <h1 className="text-center py-4">Squirrel Posts</h1>
        <div className="container">
          <div className="row g-3">
            {allSData.map(({ ID, post_title, post_date }) => (
              <div className="col-lg-4 col-md-6 col-sm-12" key={ID}>
                <Link href={`squirrels/${ID}`} className="text-decoration-none">
                  <div
                    className="card h-100"
                    style={{
                      borderRadius: '10px',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                      transition: 'transform 0.2s',
                    }}
                  >
                    <div className="card-body">
                      <h5 className="card-title">{post_title || 'Untitled Post'}</h5>
                      <p className="card-text text-muted small">
                       
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}