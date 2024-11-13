//main/[id].js

import Link from 'next/link';
import Layout from '../../components/Layout';
import { getAllIdsMain, getDataMain } from '../../lib/datalist';


// - getStaticProps() function is defined by next.js to retrieve data to use for the dynamic page
export async function getStaticProps( { params } ) {
  const itemData = await getDataMain(params.id);
  return {
    props: {
      itemData
    }
  };
}


//getStaticPaths() function  is defined by next.js, tells next.js all valid URLs: 1,2,3 etc.
export async function getStaticPaths() {
  const paths = getAllIdsMain();
  return {
    paths,
    fallback: false
  };
}


export default function Card({ itemData }) {
 

  return (
    <Layout>
      <article className="card col-9">
        <div >
          <h5 className="card-title">Character: {itemData.Character}</h5>
          
          
        
          <hr/>
     
 
<Link href="/" className="btn btn-secondary small mt-2">
        Back
      </Link>


        </div>
      </article>
    </Layout>
  );
}
