import {dataArrayObject} from '../lib/datafactor'; 


// Function to get all IDs for shogunMain.json
export  async function getAllIdsMain() {

    const jDataMain = await dataArrayObject(1);

    return jDataMain.map(item => ({
        params: {
            id: item.ID.toString()
        }
    }));
}





// Function to get sorted list for shogunMain.json
export async function getListMain() {
''
     const jDataMain = await dataArrayObject(1);
console.log(jDataMain);
    // sort json array by post title
    jDataMain.sort(function (a, b) {
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

    const jDataMain = await dataArrayObject(1);

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
