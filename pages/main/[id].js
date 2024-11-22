// pages/main/[id].js
import Link from 'next/link';
import Layout from '../../components/Layout';
import { getAllIdsMain, getDataMain } from '../../lib/datalist';

// Fetch data for the dynamic page
export async function getStaticProps({ params }) {
    const itemData = await getDataMain(params.id);
    return {
        props: {
            itemData,
        },
    };
}

// Define all valid paths for dynamic routes
export async function getStaticPaths() {
    const paths = await getAllIdsMain();
    return {
        paths,
        fallback: false,
    };
}

export default function Card({ itemData }) {
    // Destructure the data from itemData
    const { 
        post_title, 
        post_author, 
        post_date, 
        post_content, 
        commonName, 
        latinName, 
        favoriteFood 
    } = itemData;

    return (
        <Layout>
            <article className="card col-9">
                <div className="card-body">
                    <h5 className="card-title">Post Title: {post_title}</h5>
                    <p className="card-text small">Author ID: {post_author}</p>
                    <p className="card-text small">Date: {post_date}</p>

                    <div 
                        className="card-text mt-2 small" 
                        dangerouslySetInnerHTML={{ __html: post_content }} 
                    />

                    <hr />
{/* 
                    <h3>Custom Fields:</h3>
                    {commonName && <p>Common Name: {commonName}</p>}
                    {latinName && <p>Latin Name: {latinName}</p>}
                    {favoriteFood && <p>Favorite Food: {favoriteFood}</p>} */}

                    <Link href="/" className="btn btn-secondary small mt-2">
                        Back
                    </Link>
                </div>
            </article>
        </Layout>
    );
}