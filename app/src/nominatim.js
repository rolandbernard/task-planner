
import config from './config';
import resolve from 'resolve';

let cache = {
    "Via Sabbionara 1, 36071 ARZIGNANO": [11.3697115, 45.5117757],
    "Via Crispi 15, 39100 BOLZANO": [11.3583474, 46.49805],
    "Säbenertorgasse 2, 39042 BRIXEN": [11.6568621, 46.7158647],
    "Freiheitsstrasse 40, 39042 MERAN": [11.1638196, 46.6705174],
    "Via Santa Croce, 77 , 38123 TRENTO": [11.1240829185249, 46.06266515],
    "Galileo-Galilei-Str. 2 , 39100 BOZEN": [11.3413219, 46.4873981],
    "Via Stazione 28 , 39010 GARGAZZONE": [11.1986062, 46.5787909],
    "Via Crispi 15, 39100 BOLZANO": [11.3583474, 46.49805],
    "Fabrikstraße 7, 39045 FRANZENSFESTE": [11.5658908, 46.8098363],
    "Elvaser Straße 8 , 39042 BRIXEN": [11.6593449, 46.71834],
    "Rienzfeldstraße 30 , 39031 BRUNECK": [11.9281335, 46.8020609],
    "Obertal 45 , 39030 ANTHOLZ": [12.1275168, 46.8736719],
    "Via Gilm 1/A , 39100 BOLZANO": [11.3499216, 46.4957955],
    "Via Durone, 53 , 38079 TIONE DI TRENTO": [10.730921871875, 46.03736955],
    "piazza Municipio 1, 39040 SALORNO": [11.212524, 46.2390728],
    "Via Santa Croce, 77 , 38123 TRENTO": [11.1240829185249, 46.06266515],
    "Siemensstraße 4/C, 39100 BOZEN": [11.3324146, 46.4828521],
    "Gasteig, Innerrust 2 , 39040 RATSCHINGS": [11.4037304, 46.8802862],
    "Via Siemens 29 , 39100 BOLZANO": [11.3271168612225, 46.4807944],
    "Via Siemens 29 , 39100 BOLZANO": [11.3271168612225, 46.4807944],
    "Via Galvani 6/c, 39100 BOLZANO": [11.3320781, 46.4750087],
    "Via Siemens 29 , 39100 BOLZANO": [11.3271168612225, 46.4807944],
    "Mitterweg 14/B , 39100 BOZEN": [11.5678423, 46.6083621],
    "Negrellistr. 16 , 39100 BOZEN": [11.3547801, 46.4981125],
    "Via Crispi 15, 39100 BOLZANO": [11.3583474, 46.49805],
    "Pacinottistrasse 12 , 39100 BOZEN": [11.3303934, 46.4820846],
    "Via Crispi 15, 39100 BOLZANO": [11.3583474, 46.49805],
    "Via Crispi 15, 39100 BOLZANO": [11.3583474, 46.49805],
    "Via Crispi 15, 39100 BOLZANO": [11.3583474, 46.49805],
    "Kapuzinergasse 10, 39100 BOZEN": [11.3522297, 46.4964121],
    "Brennerstraße 72, 39042 Brixen": [11.6525118, 46.7283475],
    "Luigi-Negrelli-Straße 6, 39100 Bozen": [11.3323606, 46.4708107],
    "Luigi-Negrelli-Straße 6, 39100 Bozen": [11.3323606, 46.4708107],
    "Luigi-Negrelli-Straße 6, 39100 Bozen": [11.3323606, 46.4708107],
    "Luigi-Negrelli-Straße 6, 39100 Bozen": [11.3323606, 46.4708107],
};

if(typeof localStorage !== "undefined" && localStorage.getItem('nominatim_cache')) {
    cache = { ...cache, ...JSON.parse(localStorage.getItem('nominatim_cache')) };
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

