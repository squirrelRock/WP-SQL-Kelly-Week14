// pages/rocks4sale/[id].js
import Link from 'next/link';
import Layout from '../../components/Layout';
import useSWR from 'swr';
import { fetcher } from '../../lib/fetchHelper';
import Image from 'next/image';

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
  const itemData = fallbackData;

  if (!itemData) return <p>Loading...</p>;

  const { post_title, post_date, post_content, rockID, rock_price, rock_name, rock_image } = itemData;
  const formattedPrice = rock_price ? `$${parseFloat(rock_price).toFixed(2)}` : 'Price not available';
  return (
    <Layout>
      <div style={{ backgroundColor: '#825822', padding: '20px', minHeight: '100vh' }}>
        <article className="card mx-auto" style={{ maxWidth: '600px', backgroundColor: '#fff', borderRadius: '10px', padding: '20px', boxShadow: '0px 4px 8px rgba(0,0,0,0.2)' }}>
          <div className="card-body">
            <h2 className="card-title text-center" style={{ color: '#5a3d1a' }}>{post_title || 'No title available'}</h2>
            <hr />
            <p className="card-text">
              <strong>Date:</strong> {post_date ? post_date.split(' ')[0] : 'No date available'}
            </p>
            <p className="card-text">
              <strong>Rock ID:</strong> {rockID || 'No rock ID'}
            </p>
            <p className="card-text">
            <strong>Price:</strong> {formattedPrice}
            </p>
            <p className="card-text">
              <strong>Rock Name:</strong> {rock_name || 'Unnamed rock'}
            </p>
            <div className="card-text mt-3" style={{ lineHeight: '1.6' }} dangerouslySetInnerHTML={{ __html: post_content }} />
            {rock_image && (
              <div className="text-center my-4">
                <Image
                  src={rock_image}
                  width={400}
                  height={300}
                  alt="Rock for Sale"
                  style={{ borderRadius: '10px' }}
                />
              </div>
            )}
            <div className="text-center mt-4">
              <Link href="/rocks4sale" className="btn btn-secondary">
                Back
              </Link>
            </div>
          </div>
        </article>
      </div>
    </Layout>
  );
}