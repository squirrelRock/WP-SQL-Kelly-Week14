// pages/squirrels/[id].js
import Link from 'next/link';
import Layout from '../../components/Layout';
import { getAllIdsSquirrels, getDataSquirrels } from '../../lib/dataSquirrels';

// Fetch data for the dynamic page
export async function getStaticProps({ params }) {
    const itemData = await getDataSquirrels(params.id);
    return {
        props: {
            itemData,
        },
    };
}

// Define all valid paths for dynamic routes
export async function getStaticPaths() {
    const paths = await getAllIdsSquirrels();
    console.log('Dynamic Paths:', paths); 
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
        user_login, 
        common, 
        latin, 
        food, 
    } = itemData;

    return (
        <Layout>
            <div className="squirrel-page">
                <div className="squirrel-card">
                    <div className="squirrel-card-body">
                        <h2 className="squirrel-card-title">{post_title}</h2>
                        <hr />
                        <p className="squirrel-text">
                            <strong>Posting by:</strong> {user_login || 'Unknown'}
                        </p>
                        <p className="squirrel-text">
                            <strong>Date:</strong>{' '}
                            {post_date ? post_date.split(' ')[0] : 'No date available'}
                        </p>
                        <div
                            className="squirrel-content"
                            dangerouslySetInnerHTML={{
                                __html: post_content || '<p>No content available</p>',
                            }}
                        />
                        <hr />
                        <h4 className="squirrel-profile-title">Profile:</h4>
                        <ul className="squirrel-profile-list">
                            {common && <li><strong>Clan:</strong> {common}</li>}
                            {latin && <li><strong>Latin Name:</strong> {latin}</li>}
                            {food && <li><strong>Favorite Food:</strong> {food}</li>}
                        </ul>
                        <Link href="/squirrels" className="btn btn-secondary squirrel-back-btn">
                            Back
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    );
}