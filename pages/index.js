// pages/index.js
import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import { getListMain } from '../lib/datalist';

export async function getStaticProps() {
    const allData = await getListMain();
    console.log("allData in getStaticProps:", allData); 

    return {
        props: {
            allData, 
        },
        revalidate: 60,
    };
}

// HOME COMPONENT
export default function Home({ allData }) {
   

    return (
        <Layout home>
            <h1 className="text-center">List of Posts</h1>
            <div className="list-group">
                {allData.map(({ id, Character }) => (
                    <Link 
                        key={id} 
                        href={`main/${id}`} 
                        className="list-group-item list-group-item-action"
                    >
                        <h2 className="py-3">{Character}</h2>
                    </Link>
                ))}
            </div>
        </Layout>
    );
}