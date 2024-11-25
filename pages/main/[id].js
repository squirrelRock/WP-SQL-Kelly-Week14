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

// define all valid paths for dynamic routes
export async function getStaticPaths() {
    const paths = await getAllIdsMain();
    return {
        paths,
        fallback: false,
    };
}

export default function Card({ itemData }) {
  
    const { 
       
            postType,
            postContent,
    
           
            postTitle,
            
       
    } = itemData;

    return (
        <Layout>
            <article className="card col-9">
                <div className="card-body">
                    <h2>Posts from {postType}</h2>
                    <h5 className="card-title">Post Title: {postTitle}</h5>
                    {/* <p className="card-text small">Author ID: {author}</p>
                  
                    <p className="card-text small">Rock ID: {rockID}</p>
                    <p className="card-text small">Price: ${rockPrice}</p> */}
                    <div 
                        className="card-text mt-2 small" 
                        dangerouslySetInnerHTML={{ __html: post_content }} 
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