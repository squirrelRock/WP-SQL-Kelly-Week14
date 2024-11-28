// pages/chipmunks.js
import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import { getListChip } from '../lib/dataChipmunks';

export async function getStaticProps() {
    // Fetch data at build time
    const allChipData = await getListChip();
    return {
        props: {
            allChipData,
        },
        revalidate: 1, // Optional for incremental static regeneration
    };
}

export default function Chipmunks({ allChipData }) {
    if (!allChipData || allChipData.length === 0) {
        return (
            <Layout>
                <p>No chipmunks found.</p>
            </Layout>
        );
    }

    return (
        <Layout>
            <h1 className="text-center py-5">Chipmunk Video Submissions</h1>
            <div className="list-group">
                {allChipData.map(({ id, post_title, post_date }) => (
                    <Link
                        key={id}
                        href={`chipmunks/${id}`}
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