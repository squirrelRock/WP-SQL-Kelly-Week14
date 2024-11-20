import { useState } from 'react';
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


// - getStaticPaths() function  is defined by next.js, tells next.js all valid URLs: 1,2,3 etc.
export async function getStaticPaths() {
  const paths = await getAllIdsMain();
  return {
    paths,
    fallback: false
  };
}




export default function Card({ itemData }) {


  return (
    <Layout>
      <article className="card col-9">
        <div className={`card-body `}>
          <h5 className="card-title">Post Title: {itemData.post_title}</h5>
          <p className="card-text small">Author ID: {itemData.post_author}</p>
          <p className="card-text small">Date: {itemData.post_date}</p>
          
        <div className="card-text mt-2 small" dangerouslySetInnerHTML={{__html: itemData.post_content}} />

    
          <hr/>
          <h6 className="card-subtitle mb-2 text-body-secondary d-flex justify-content-between align-items-center">
  {/* <span>
    Actor: {'\u00A0'}
    <a href={itemData.IMDb} target="_blank" rel="noopener noreferrer" className="card-link">
      {itemData.Actor}
    </a>
  </span>
  <a href={itemData.IMDb} target="_blank" rel="noopener noreferrer" className="mark">
    <u>IMDb</u>
  </a> */}
</h6>
<Link href="/" className="btn btn-secondary small mt-2">
        Back
      </Link>


        </div>
      </article>
    </Layout>
  );
}
