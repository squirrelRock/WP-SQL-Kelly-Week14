// pages/rocks4sale/[id].js
import Link from 'next/link';
import Layout from '../../components/Layout';
import useSWR from 'swr';
import { fetcher } from '../../lib/fetchHelper';
import Image from 'next/image'
 



export async function getStaticPaths() {
  const res = await fetcher(
    'https://dev-kdurkin-sql.pantheonsite.io/wp-json/twentytwentyone-child/v1/rockSQLdbEndpoint'
  );
  const paths = res.map((item) => ({
    params: { id: item.ID.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
    const res = await fetcher(
      'https://dev-kdurkin-sql.pantheonsite.io/wp-json/twentytwentyone-child/v1/rockSQLdbEndpoint'
    );
  
    // filter to get the matching item
    const filterData = res.filter((item) => item.ID.toString() === params.id);
    const itemData = filterData.length > 0 ? filterData[0] : null; 
  
    console.log('Filtered Item Data:', itemData); 
  
    return {
      props: {
        fallbackData: itemData,
      },
      revalidate: 1, 
    };
  }

  export default function Card({ fallbackData }) {
    const itemData = fallbackData; //using fallback data directly for debugging
  
    if (!itemData) return <p>Loading...</p>;
  
    const { post_title, post_date, post_content, rockID, rock_price, rock_name, rock_image } = itemData;
  
    return (
      <Layout>
        <article className="card col-9">
          <div className="card-body">
            <h5 className="card-title">Post Title: {post_title || 'No title available'}</h5>
            <p className="card-text small">
                  Date: {post_date ? post_date.split(' ')[0] : 'No date available'}
              </p>
            <p className="card-text small">Rock ID: {rockID || 'No rock ID'}</p>
            <p className="card-text small">Price: {rock_price || 'No price available'}</p>
            <p className="card-text small">Rock Name: {rock_name || 'Unnamed rock'}</p>
            <div className="card-text mt-2 small" dangerouslySetInnerHTML={{ __html: post_content }} />
            <Image
      src={rock_image}
      width={400}
      height={300}
      
      alt="rock for sale"
    />
    <br/>
            <Link href="/" className="btn btn-secondary small mt-2">Back</Link>
          </div>
        </article>
      </Layout>
    );
  }