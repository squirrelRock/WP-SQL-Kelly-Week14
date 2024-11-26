// lib/datalistSQLdb.js

import { fetcher } from './fetchHelper';

// get all IDs
export async function getAllIdsSQLdb() {
  const allRockData = await fetcher('https://dev-kdurkin-sql.pantheonsite.io/wp-json/twentytwentyone-child/v1/rockSQLdbEndpoint');
  return allRockData.map((item) => ({
    params: { id: item.ID.toString() },
  }));
}

// get data by ID
export async function getDataSQLdb(idRequested) {
  const allRockData = await fetcher('https://dev-kdurkin-sql.pantheonsite.io/wp-json/twentytwentyone-child/v1/rockSQLdbEndpoint');
  const objMatch = allRockData.filter((obj) => obj.ID.toString() === idRequested);
  return objMatch.length > 0 ? objMatch[0] : null;
}

// get sorted list of data
export async function getListSQLdb() {
    const allRockData = await fetcher('https://dev-kdurkin-sql.pantheonsite.io/wp-json/twentytwentyone-child/v1/rockSQLdbEndpoint');
  
    // Sort by post_title
    allRockData.sort((a, b) => a.post_title.localeCompare(b.post_title));
  
    return allRockData.map((item) => ({
      id: item.ID.toString(),
      post_title: item.post_title,
      post_date: item.post_date ? item.post_date.toString() : 'No date available',
      post_content: item.post_content,
      rockID: item.rockID ? item.rockID.toString() : 'No rock ID',
      rock_price: item.rock_price ? item.rock_price.toString() : 'No price available',
      rock_name: item.rock_name || 'Unnamed rock',
    }));
  }