// lib/datalist.js
import {dataArrayObject} from '../lib/datafactor'; 


// Function to get all IDs for shogunMain.json
export  async function getAllIdsMain() {

    const jDataMain = await dataArrayObject();

    return jDataMain.map(item => ({
        params: {
            id: item.ID.toString()
        }
    }));
}





// // Function to make sorted list for json endpoint data


export async function getListMain() {
    const jDataMain = await dataArrayObject();

    jDataMain.forEach(function (item) {
        console.log("scf_fields:", item.scf_fields); 
    });

    
    jDataMain.forEach(
        function(item) {
          // reformat string contained in delimited acf field data, add curlies and quotes
          let x = '{"' + item.scf_fields + '"}';
          // https://www.w3schools.com/jsref/jsref_replace.asp
          // x = x.replace(/,/g,'","');
          x = x.replaceAll(',','","');
          // x = x.replace(/:/g,'":"');
          x = x.replaceAll(':','":"');

          console.log("modified scf_fields:", x);

          // now that we have a string that is in valid json format, convert it to json
          // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
          let y = JSON.parse(x);
          console.log(y);
          console.log(y.common_name);
          item.scf_fields = y;
        }
      );

     // sort json array by post title
     jDataMain.sort(function (a, b) {
        return a.post_title.localeCompare(b.post_title);
        });

    // find the URL 
    return jDataMain.map(item => {
  

        return {
            id: item.ID.toString(),
            Character: item.post_title,
           
        };
    });
}




// Function to get data by ID for shogunMain.json
export async function getDataMain(idRequested) {

    const jDataMain = await dataArrayObject();

    const objMatch = jDataMain.filter(obj => obj.ID.toString() === idRequested);
    
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
