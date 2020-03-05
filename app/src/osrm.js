
import config from './config';

export async function getDistanceMatrix(coordinates) {
    try {
        let result = await fetch(config.osrm_api_location + `/table/v1/driving/${coordinates.map(c => c.join(',')).join(';')}`);
        if(result.status !== 200) {
            throw new Error(`Code ${result.status}`);
        } else {
            const json = await result.json();
            if(json.code === "Ok") {
                return json.durations;
            } else {
                throw new Error(json.code);
            }
        }
    } catch(e) {
        throw e;
    }
}

export async function getRoutePolyline6(coordinates) {
    try {
        let result = await fetch(config.osrm_api_location + `/route/v1/driving/${coordinates.map(c => c.join(',')).join(';')}?overview=full&geometries=polyline6`);
        if(result.status !== 200) {
            throw new Error(`Code ${result.status}`);
        } else {
            const json = await result.json();
            if(json.code === "Ok") {
                return json.routes[0].geometry;
            } else {
                throw new Error(json.code);
            }
        }
    } catch(e) {
        throw e;
    }
}

