// pages/chipmunks/[id].js
import Link from 'next/link';
import Layout from '../../components/Layout';
import { getAllIdsChip, getDataChip } from '../../lib/dataChipmunks';

// Fetch data for the dynamic page
export async function getStaticProps({ params }) {
    const itemData = await getDataChip(params.id);
    return {
        props: {
            itemData,
        },
    };
}

// Define all valid paths for dynamic routes
export async function getStaticPaths() {
    const paths = await getAllIdsChip();
    return {
        paths,
        fallback: false,
    };
}

export default function Card({ itemData }) {
    const { 
        post_title, 
        post_date, 
        post_content, 
        first_name,
        last_name,
        common, 
        latin, 
        food, 
        media_file,
        fav_color,
    } = itemData;

    return (
        <Layout>
            {/* Chipmunks Favorite color as Background Color */}
            <div style={{ backgroundColor: fav_color || '#ffffff', minHeight: '100vh', padding: '20px' }}>
                <article className="card mx-auto" style={{ maxWidth: '600px', backgroundColor: '#ffffff', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <div className="card-body">
                        <h2 className="card-title text-center">{post_title}</h2>
                        <p className="card-text text-center">
                            <strong>Submitted by:</strong> {first_name || 'Unknown'} {last_name || ''} <br />
                            <strong>Date:</strong> {post_date ? post_date.split(' ')[0] : 'No date available'}
                        </p>

                        <hr />

                        {/* Embedded YouTube Video */}
                        {media_file && (
                            <div className="video-container mb-3">
                                <iframe
                                    width="100%"
                                    height="315"
                                    src={media_file.replace('watch?v=', 'embed/')}
                                    title="Chipmunk Media"
                                    style={{ border: '0' }}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        )}

                        <div 
                            className="card-text mt-2 small" 
                            dangerouslySetInnerHTML={{ __html: post_content }}
                        />

                        <hr />

                        <h4>Profile:</h4>
                        <ul>
                            {common && <li><strong>Clan:</strong> {common}</li>}
                            {latin && <li><strong>Latin Name:</strong> {latin}</li>}
                            {food && <li><strong>Favorite Food:</strong> {food}</li>}
                        </ul>

                        <Link href="/chipmunks" className="btn btn-secondary btn-block mt-4">
                            Back
                        </Link>
                    </div>
                </article>
            </div>
        </Layout>
    );
}