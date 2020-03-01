
import config from './config';

export async function getCoordinatedForAddress(address) {
    if(address) {
        try {
            const result = await fetch(config.nominatimApiLocation + `/search?q=${address}&format=json&limit=1`);
            if(result.status !== 200) {
                throw new Error(`Code ${result.status}`);
            } else {
                const json = await result.json();
                if(json.length === 0) {
                    throw new Error("Not found");
                } else {
                    return [parseFloat(json[0].lon), parseFloat(json[0].lat)];
                }
            }
        } catch(e) {
            throw e;
        }
    } else {
        throw new Error("Not found");
    }
}

