// datafactor.js
import got from 'got';




// function gets json object from custom endpoint
export async function dataArrayObject() {

    const dataURL = "https://dev-kdurkin-sql.pantheonsite.io/wp-json/twentytwentyone-child/v1/latest-posts/1";
    
  let jsonString;
  try {
    // next line uses got asynchronously to retrieve via https our json data from wp site
    jsonString = await got(dataURL);
    console.log(jsonString.body);
     // convert string from file into json array object
     // const jsonObj = JSON.parse(jsonString);
    return JSON.parse(jsonString.body);

  } catch(error) {
    return [];
    console.log(error);
  }
}
