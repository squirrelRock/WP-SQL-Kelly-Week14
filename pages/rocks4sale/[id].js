// pages/rocks4sale/[id].js

import Link from 'next/link';
import Layout from '../../components/Layout';
import useSWR from 'swr';
import { fetcher } from '../../lib/fetchHelper';
import { getAllIdsSQLdb, getDataSQLdb } from '../../lib/datalistSQLdb'; // Correct path

// setting the paths 
export async function getStaticPaths() {
  const paths = await getAllIdsSQLdb();
  return {
    paths, 
    fallback: 'blocking', 
  };
}

// get data for the dynamic page
export async function getStaticProps({ params }) {
  const itemData = await getDataSQLdb(params.id);

  return {
    props: {
      fallbackData: itemData || null,
    },
    revalidate: 60, 
  };
}

export default function Card({ fallbackData }) {
 
  const { data: itemData, error } = useSWR(
    `https://dev-kdurkin-sql.pantheonsite.io/wp-json/twentytwentyone-child/v1/rockSQLdbEndpoint`,
    fetcher,
    { fallbackData }
  );
  console.log('Fetched Data via SWR:', itemData);
  console.log('Fallback Data:', fallbackData);
 
  if (error) return <p>Error loading data.</p>;
  if (!itemData) return <p>Loading...</p>;

 
  const { 
    post_title, 
    post_date, 
    post_content, 
    rockID,
    rock_price,
    rock_name, 
  } = itemData;


  return (
    
    <Layout>
        
      <article className="card col-9">
        <div className="card-body">
          <h5 className="card-title">Post Title: {post_title || 'Untitled'}</h5>
          <p className="card-text small">Date: {post_date || 'No date available'}</p>
          <p className="card-text small">Rock ID: {rockID || 'No rock ID'}</p>
          <p className="card-text small">Price: {rock_price || 'No price available'}</p>
          <p className="card-text small">This rock is named: {rock_name || 'Unnamed'}</p>
          <div
            className="card-text mt-2 small"
            dangerouslySetInnerHTML={{ __html: post_content || 'No content available' }}
          />
          <hr />
          <Link href="/" className="btn btn-secondary small mt-2">
            Back
          </Link>
        </div>
      </article>
    </Layout>
  );
}