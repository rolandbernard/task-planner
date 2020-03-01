
import React, { createRef } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import Feature from 'ol/Feature';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM as OsmSource, Vector as VectorSource } from 'ol/source';
import { fromLonLat } from 'ol/proj';
import { Polyline } from 'ol/format';
import { Point } from 'ol/geom';
import { Style, Stroke, Icon } from 'ol/style';
import 'ol/ol.css';

import { getRoutePolyline6 } from './osrm';

import workerMarker from './marker-worker.svg';
import clientMarker from './marker-client.svg';

const styles = {
    'route': new Style({
        stroke: new Stroke({
            color: [120, 120, 255, 0.5],
            width: 6,
        })
    }),
    'routeHighlight': new Style({
        stroke: new Stroke({
            color: [120, 120, 200, 1],
            width: 9,
        })
    }),
    'routeShadow': new Style({
        stroke: new Stroke({
            color: [120, 120, 255, 0.5],
            width: 6,
        })
    }),
    'worker': new Style({
        image: new Icon({
            anchor: [0.5, 1],
            src: workerMarker,
            scale: 1.5,
        })
    }),
    'client': new Style({
        image: new Icon({
            anchor: [0.5, 1],
            src: clientMarker,
            scale: 1.5,
        })
    }),
};

class PlanMap extends React.Component {
    constructor(prop) {
        super(prop);
        this.map_ref = createRef();
        this.vector_source = new VectorSource({});
        this.map = new Map({
            view: new View({
                center: fromLonLat([11.5, 46.5]),
                zoom: 9
            }),
            layers: [
                new TileLayer({
                    source: new OsmSource()
                }),
                new VectorLayer({
                    source: this.vector_source,
                    style: function (feature) {
                        return styles[feature.get('type')];
                    }
                })
            ],
        });
        this.map.on('pointermove', (event) => {
            const hover_features = this.map.getFeaturesAtPixel(event.pixel).filter((feature) => feature.get('type').substr(0, 5) === 'route');
            const all_features = this.vector_source.getFeatures().filter((feature) => feature.get('type').substr(0, 5) === 'route');
            for(let feature of all_features) {
                if(hover_features.length === 1) {
                    if(hover_features.includes(feature)) {
                        feature.set('type', 'routeHighlight');
                    } else {
                        feature.set('type', 'routeShadow');
                    }
                } else {
                    feature.set('type', 'route');
                }
            }
        });
    }

    componentDidMount() {
        this.map.setTarget(this.map_ref.current);
    }

    async fillVectorSource(plan) {
        this.vector_source.clear();
        for(let worker in plan) {
            for(let day in plan[worker]) {
                if(plan[worker][day].length > 0) {
                    const worker_coords = [plan[worker][day][0].worker.lon, plan[worker][day][0].worker.lat];
                    const client_coords = plan[worker][day].map(task => [task.client.lon, task.client.lat]);
                    const polyline = await getRoutePolyline6([worker_coords, ...client_coords, worker_coords]);
                    const feature = new Feature({
                        type: 'route',
                        geometry: new Polyline({
                            factor: 1e6
                        }).readGeometry(polyline, {
                            dataProjection: 'EPSG:4326',
                            featureProjection: 'EPSG:3857'
                        }),
                    });
                    this.vector_source.addFeature(feature);
                    this.vector_source.addFeature(new Feature({
                        type: 'worker',
                        geometry: new Point(fromLonLat(worker_coords)),
                    }));
                    this.vector_source.addFeatures(client_coords.map((coords) => {
                        return new Feature({
                            type: 'client',
                            geometry: new Point(fromLonLat(coords)),
                        });
                    }));
                }
            }
        }
    }

    componentDidUpdate(prevProps) {
        this.map.updateSize();
        if (prevProps.plan !== this.props.plan) {
            this.fillVectorSource(this.props.plan);
        }
    }

    render() {
        return (
            <div style={{width: '100%', height: '100%'}} ref={this.map_ref}>
            </div>
        );
    }
}

export default PlanMap;

