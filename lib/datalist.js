// import dataArrayObject from '../lib/datafactor'; 
import got from 'got';


const dataURL = "https://dev-srjc-fall-2021-cs55-13.pantheonsite.io/wp-json/twentytwentyone-child/v1/latest-posts/1";

// function gets json object from custom endpoint
export async function dataArrayObject() {

  let jsonString;
  try {
    // next line uses got synchronously to retrieve via https our json data from wp site
    jsonString = await got(dataURL);
    console.log(jsonString.body);
  } catch(error) {
    jsonString.body = [];
    console.log(error);
  }

  // convert string from file into json array object
  // const jsonObj = JSON.parse(jsonString);
  const jDataMain = JSON.parse(jsonString.body);

  return jDataMain;

}





// Function to get all IDs for shogunMain.json
export function getAllIdsMain() {
    return jDataMain.map(item => ({
        params: {
            id: item.ID.toString()
        }
    }));
}





// Function to get sorted list for shogunMain.json
export function getListMain() {

      // sort json array by name property
  jsonObj.sort(function (a, b) {
    return a.post_title.localeCompare(b.post_title);
});
   

    // Use map() on array to extract id, name, and gender properties
    return jDataMain.map(item => ({
        id: item.ID.toString(),
        Character: item.post_title
        // gender: item.Gender,
    }));
}






// Function to get data by ID for shogunMain.json
export async function getDataMain(idRequested) {
    const objMatch = jDataMain.filter(obj => obj.id.toString() === idRequested);
    
    let objReturned;
    if (objMatch.length > 0) {
        objReturned = objMatch[0];
    } else {
        objReturned = {};
    }

    return objReturned;
}

// const jDataSecond = dataArrayObject('shogun2nd.json'); // Load the secondary data


// Function to get all IDs for shogun2nd.json
// export function getAllIdsSecond() {
//     return jDataSecond.map(item => ({
//         params: {
//             id: item.id.toString()
//         }
//     }));
// }


// Function to get sorted list for shogun2nd.json
// export function getListSecond() {
    

    // Use map() on array to extract id, name, and gender properties
//     return jDataSecond.map(item => ({
//         id: item.id.toString(),
//         Character: item.Character,
//         gender: item.Gender,
//     }));
// }


// Function to get data by ID for shogun2nd.json
// export async function getDataSecond(id2Requested) {
//     const obj2Match = jDataSecond.filter(obj => obj.id.toString() === id2Requested);
    
//     let obj2Returned;
//     if (obj2Match.length > 0) {
//         obj2Returned = obj2Match[0];
//     } else {
//         obj2Returned = {};
//     }

//     return obj2Returned;
// }
