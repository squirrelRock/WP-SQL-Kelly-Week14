// datafactor.js
import got from 'got';


// // function gets json object from custom endpoint
export async function dataArrayObject() {
  console.log("dataArrayObject: Fetching data...");
    const dataURL = `https://dev-kdurkin-sql.pantheonsite.io/wp-json/twentytwentyone-child/v1/wonderfulEndpoint`;

  let jsonString;
  try {
    // next line uses got asynchronously to retrieve via https our json data from wp site
    jsonString = await got(dataURL);
   
    console.log("Response status code:", jsonString.statusCode);
    console.log("Response headers:", jsonString.headers);
    console.log("Response body:", jsonString.body);
    console.log("dataArrayObject: Fetched result:", jsonString);
    // console.log(jsonString.body);
     // convert string from file into json array object
     // const jsonObj = JSON.parse(jsonString);
    return JSON.parse(jsonString.body);

  } catch(error) {
    console.error("Error fetching data:", error);
    return [];
   
  }
}

// // function gets json object from custom endpoint
export async function dataArrayObjectSQLdb() {
  console.log("dataArrayObjectSQLdb: Fetching data...");
  const dataURL = `https://dev-kdurkin-sql.pantheonsite.io/wp-json/twentytwentyone-child/v1/rockSQLdbEndpoint`;

  let jsonString;
  try {
    // next line uses got asynchronously to retrieve via https our json data from wp site
    jsonString = await got(dataURL);
   
    console.log("Response status code:", jsonString.statusCode);
    console.log("Response headers:", jsonString.headers);
    console.log("Response body:", jsonString.body);
  
    // console.log(jsonString.body);
     // convert string from file into json array object
     // const jsonObj = JSON.parse(jsonString);
    return JSON.parse(jsonString.body);

  } catch(error) {
    console.error("Error fetching data from rockSQLdbEndpoint:", error);
    return [];
   
  }
}


