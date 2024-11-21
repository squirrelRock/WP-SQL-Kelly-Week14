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

    // parse scf_fields 
    jDataMain.forEach(item => {
        if (item.scf_fields) {
            try {
                // converting my scf_fields to valid JSON
                let x = '{"' + item.scf_fields + '"}';
                x = x.replaceAll(',', '","');
                x = x.replaceAll(':', '":"');
                item.scf_fields = JSON.parse(x); 
            } catch (error) {
                console.error("Error parsing scf_fields for item:", item, error);
                item.scf_fields = {}; 
            }
        } else {
            item.scf_fields = {}; 
        }
    });

    // Sort the data by post title
    jDataMain.sort((a, b) => a.post_title.localeCompare(b.post_title));

    // mapping the fields
    const allData = jDataMain.map(item => {
        return {
            id: item.ID.toString(),
            Character: item.post_title,
            content: item.post_content, 
            commonName: item.scf_fields.common_name || null, 
            latinName: item.scf_fields.latin_name || null,
            favoriteFood: item.scf_fields.favorite_food || null,
        };
    });

    console.log("AllData:", allData); 
    return allData;
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
