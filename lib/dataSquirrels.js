// lib/dataSquirrels.js

import { fetcher } from './fetchHelper';

// get all IDs
export async function getAllIdsSquirrels() {
  const allSData = await fetcher('https://dev-kdurkin-sql.pantheonsite.io/wp-json/twentytwentyone-child/v1/squirrelsEndpoint');
  
  console.log('Fetched Data:', allSData); // Ensure `ID` is present and valid
  return allSData.map((item) => ({
    params: { id: item.ID.toString() },
  }));
}

// get data by ID
export async function getDataSquirrels(idRequested) {
  const allSData = await fetcher('https://dev-kdurkin-sql.pantheonsite.io/wp-json/twentytwentyone-child/v1/squirrelsEndpoint');
  const objMatch = allSData.filter((obj) => obj.ID.toString() === idRequested);
  return objMatch.length > 0 ? objMatch[0] : null;
}

// get sorted list of data
export async function getListSquirrels() {
    const allSData = await fetcher('https://dev-kdurkin-sql.pantheonsite.io/wp-json/twentytwentyone-child/v1/squirrelsEndpoint');
  
    // Sort by post_title
    allSData.sort((a, b) => a.post_title.localeCompare(b.post_title));
  
    return allSData.map((item) => ({
      id: item.ID.toString(),
      post_title: item.post_title,
      username: item.user_login ? item.user_login.toString() : 'Not available',
      post_date: item.post_date ? item.post_date.toString() : 'No date available',
      post_content: item.post_content,
      common: item.common ? item.common.toString() : 'not specified',
      latin: item.latin ? item.latin.toString() : 'not specified',
      food: item.food || 'no preference',
    }));
  }