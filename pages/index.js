// pages/index.js
import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import { getListMain } from '../lib/datalist';

// GET STATIC PROPS
export async function getStaticProps() {
    const allDataMain = getListMain(); // Data from shogunMain.json
    return {
      props: { allDataMain }
    };
}

// HOME COMPONENT
export default function Home({ allDataMain }) {
  return (
    <Layout>
    
      <hr/>
      <h1 className="text-center">List of Posts</h1>
      <hr/>
      <h2>Posts</h2>
      <div className="list-group">
        {allDataMain.map(({ id, Character }) => {
          
          return (
            <Link key={id} href={`/main/${id}`} className={`list-group-item list-group-item-action`}>
              {Character}
            </Link>
          );
        })}
      </div>

      {/* Secondary Characters
      <h4 className="mt-3">More Characters</h4>
      <Link href="/secondary" className="btn btn-secondary ">
        View Supporting Characters
      </Link> */}
    </Layout>
  );
}
