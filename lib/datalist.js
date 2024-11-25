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
                console.error("error is in parsing scf_fields for-:", item, error);
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
            postTitle: item.post_title,
            postContent: item.post_content, 
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

