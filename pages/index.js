// pages/index.js
import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import { getListMain } from '../lib/datalist';

// GET STATIC PROPS
export async function getStaticProps() {
    const allDataMain = await getListMain(); 
    return {
      props: { allDataMain }
    };
}

// HOME COMPONENT

export default function Home({ allData }) {
    return (
        <Layout home>
          <h1 className="text-center">List of Posts</h1>
          <div className="list-group">
            {allData.map(({ id, name }) => (
              <Link key={id} href={`/${id}`}>
                <a className="list-group-item list-group-item-action">{name}</a>
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

