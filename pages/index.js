// pages/index.js
import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import { getListMain } from '../lib/datalist';



export async function getStaticProps() {
    const allData = await getListMain();
    console.log("allData in getStaticProps:", allData); 

    return {
        props: {
            allData, 
        },
    };
}

// HOME COMPONENT

export default function Home({ allData }) {
  if (!allData || allData.length === 0) {
      return <p>no data</p>;
  }

  return (
      <Layout home>
          <h1 className="text-center">List of Posts</h1>
          <div className="list-group">
              {allData.map(({ id, Character, commonName, latinName, favoriteFood, content }) => (
                <Link 
                key={id} 
                href={`/${id}`} 
                className="list-group-item list-group-item-action"
              >
                  <h2>{Character}</h2>
                  <div dangerouslySetInnerHTML={{ __html: content }} />
                
                  <div className="small py-3">
                    
                    <h3>Custom Fields:</h3>
                      {commonName && <p>Common Name: {commonName}</p>}
                      {latinName && <p>Latin Name: {latinName}</p>}
                      {favoriteFood && <p>Favorite Food: {favoriteFood}</p>}
                  </div>
              </Link>
              ))}
          </div>
      </Layout>
  );
}

// HOME COMPONENT - old

// export default function Home({ allDataMain }) {
//     return (
//         <Layout>
//           <h1 className="text-center">List of Posts</h1>
//             <div className="list-group">
//                 {allDataMain.map(({ id, Character, link }) => (
//                   <a key={id} href={link} target="_blank" rel="noopener noreferrer" className="list-group-item list-group-item-action">
//                         {Character}
//                     </a>
//                 ))}
//             </div>
//         </Layout>
//     );
// }

