
import config from './config';

let cache = { };

if(typeof localStorage !== "undefined" && localStorage.getItem('nominatim_cache')) {
    cache = JSON.parse(localStorage.getItem('nominatim_cache'));
}

export async function getCoordinatedForAddress(address) {
    if(address) {
        if(!cache[address]) {
            cache[address] = new Promise(async (resolve, reject) => {
                try {
                    const result = await fetch(config.nominatim_api_location + `/search?q=${address}&format=json&limit=1`);
                    if (!result.ok) {
                        throw new Error(`Code ${result.status}`);
                    } else {
                        const json = await result.json();
                        if (json.length === 0) {
                            throw new Error("Not found");
                        } else {
                            resolve();
                            cache[address] = [parseFloat(json[0].lon), parseFloat(json[0].lat)];
                            if (typeof localStorage !== "undefined") {
                                localStorage.setItem('nominatim_cache', JSON.stringify(cache));
                            }
                        }
                    }
                } catch (e) {
                    reject(e);
                }
            });
        }
        const promise = cache[address];
        if(promise instanceof Promise) {
            try {
                await promise;
            } catch (e) {
                throw e;
            }
        }
        return cache[address];
    } else {
        throw new Error("Not found");
    }
}

