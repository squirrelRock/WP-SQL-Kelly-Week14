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
           
            <div style={{ backgroundColor: '#eef6f1', minHeight: '100vh', padding: '20px' }}>
                <h1 className="text-center py-4">Chipmunk Video Submissions</h1>
                <div className="container">
                    <div className="row g-4">
                        {allChipData.map(({ id, post_title, post_date }) => (
                            <div className="col-lg-4 col-md-6 col-sm-12" key={id}>
                                <Link href={`chipmunks/${id}`} className="text-decoration-none">
                                    <div
                                        className="card h-100"
                                        style={{
                                            borderRadius: '10px',
                                            backgroundColor: '#ffffff',
                                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                            transition: 'transform 0.2s',
                                        }}
                                    >
                                        <div className="card-body">
                                            <h5 className="card-title text-center">{post_title || 'Untitled Post'}</h5>
                                            <p className="card-text text-center text-muted small">
                                                {post_date ? post_date.split(' ')[0] : 'No date available'}
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