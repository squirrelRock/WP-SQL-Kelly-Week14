// lib/dataChipmunks.js

import { fetcher } from './fetchHelper';

// get all IDs
export async function getAllIdsChip() {
  const allChipData = await fetcher('https://dev-kdurkin-sql.pantheonsite.io/wp-json/twentytwentyone-child/v1/chipEndpoint');
  
  console.log('Fetched Data in getAllIdsChip:', allChipData); 

  if (!Array.isArray(allChipData)) {
    throw new Error('Expected an array but received: ' + JSON.stringify(allChipData));
  }


  return allChipData.map((item) => ({
    params: { id: item.ID.toString() },
  }));
}

// get data by ID
export async function getDataChip(idRequested) {
  const allChipData = await fetcher('https://dev-kdurkin-sql.pantheonsite.io/wp-json/twentytwentyone-child/v1/chipEndpoint');
  const objMatch = allChipData.filter((obj) => obj.ID.toString() === idRequested);
  return objMatch.length > 0 ? objMatch[0] : null;
}

// get sorted list of data
export async function getListChip() {
    const allChipData = await fetcher('https://dev-kdurkin-sql.pantheonsite.io/wp-json/twentytwentyone-child/v1/chipEndpoint');
  
    console.log('Mapped List in getListChip:', allChipData);
    
    // Sort by post_title
    allChipData.sort((a, b) => a.post_title.localeCompare(b.post_title));
  
    return allChipData.map((item) => ({
      id: item.ID.toString(),
      post_title: item.post_title,
      user_login: item.user_login ? item.user_login.toString() : 'Not available',
      post_date: item.post_date ? item.post_date.toString() : 'No date available',
      post_content: item.post_content ? item.post_content.toString() : 'not specified',
      first_name: item.first_name ? item.first_name.toString() : 'not specified',
      last_name: item.last_name ? item.last_name.toString() : 'not specified',
      common: item.common ? item.common.toString() : 'not specified',
      latin: item.latin ? item.latin.toString() : 'not specified',
      fav_color: item.fav_color ? item.fav_color.toString() : 'not specified',
    }));
  }