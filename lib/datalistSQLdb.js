// lib/datalistSQLdb.js

import { fetcher } from './fetchHelper';

// Get all IDs
export async function getAllIdsSQLdb() {
  const allRockData = await fetcher('https://dev-kdurkin-sql.pantheonsite.io/wp-json/twentytwentyone-child/v1/rockSQLdbEndpoint');
  return allRockData.map((item) => ({
    params: { id: item.ID.toString() },
  }));
}

// Get data by ID
export async function getDataSQLdb(idRequested) {
  const allRockData = await fetcher('https://dev-kdurkin-sql.pantheonsite.io/wp-json/twentytwentyone-child/v1/rockSQLdbEndpoint');
  const objMatch = allRockData.filter((obj) => obj.ID.toString() === idRequested);
  return objMatch.length > 0 ? objMatch[0] : null;
}

// Get sorted list of data
export async function getListSQLdb() {
  const allRockData = await fetcher('https://dev-kdurkin-sql.pantheonsite.io/wp-json/twentytwentyone-child/v1/rockSQLdbEndpoint');

  // Sort by post_title
  allRockData.sort((a, b) => a.post_title.localeCompare(b.post_title));

  return allRockData.map((item) => ({
    id: item.ID.toString(),
    postTitle: item.post_title,
    postContent: item.post_content,
    rockID: item.rockID || null,
    price: item.rock_price || null,
    rockName: item.rock_name || null,
  }));
}