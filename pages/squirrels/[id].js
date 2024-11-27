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
        post_author, 
        post_date, 
        post_content,
        user_login, 
        common, 
        latin, 
        food, 
    } = itemData;

    return (
        <Layout>
            <article className="card col-9">
                <div className="card-body">
                    <h2 className="card-title">{post_title}</h2>
                    <p className="card-text small">Name: {user_login}</p>
                    <p className="card-text small"> Date: {post_date ? post_date.split(' ')[0] : 'No date available'} </p>

                    <div 
                        className="card-text mt-2 small" 
                        dangerouslySetInnerHTML={{ __html: post_content }} 
                    />

                    <hr />

                    <h4>Profile:</h4>
                    {common && <p>Clan: {common}</p>}
                    {latin && <p>Latin Name: {latin}</p>}
                    {food && <p>Favorite Food: {food}</p>}

                    <Link href="/" className="btn btn-secondary small mt-2">
                        Back
                    </Link>
                </div>
            </article>
        </Layout>
    );
}