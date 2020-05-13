
import React, { createRef } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import Feature from 'ol/Feature';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { XYZ as XyzSource, Vector as VectorSource } from 'ol/source';
import { fromLonLat } from 'ol/proj';
import { Polyline } from 'ol/format';
import { Point } from 'ol/geom';
import { Style, Stroke, Icon } from 'ol/style';
import 'ol/ol.css';

import { getRoutePolyline6 } from './osrm';

import workerMarker from './marker-worker.svg';
import clientMarker from './marker-client.svg';
import config from './config';
import './plan-map.css'

const styles = {
    'route': new Style({
        stroke: new Stroke({
            color: [120, 120, 255, 0.5],
            width: 6,
        })
    }),
    'routeHighlight': new Style({
        stroke: new Stroke({
            color: [120, 120, 255, 1],
            width: 10,
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
    'clientHighlight': new Style({
        image: new Icon({
            anchor: [0.5, 1],
            src: clientMarker,
            scale: 2,
        })
    }),
};

class PlanMap extends React.Component {
    constructor(prop) {
        super(prop);
        this.onError = prop.onError;
        this.last_route_highlights = [];
        this.last_client_highlights = [];
        this.map_ref = createRef();
        this.vector_source = new VectorSource({});
        this.map = new Map({
            view: new View({
                center: fromLonLat([11.5, 46.5]),
                zoom: 9
            }),
            layers: [
                new TileLayer({
                    source: new XyzSource({
                        attributions: config.map.attributions,
                        attributionsCollapsible: true,
                        url: config.map.xyz_url,
                    })
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
            this.last_route_highlights.forEach((feature) => {
                feature.set('type', 'route');
            });
            this.last_route_highlights = [];
            const hover_feature = this.map.getFeaturesAtPixel(event.pixel).find((feature) => feature.get('type').substr(0, 6) === 'client');
            if (hover_feature) {
                const hover_route_feature = hover_feature.get('route');
                hover_route_feature.set('type', 'routeHighlight');
                this.last_route_highlights = [hover_route_feature];
                if (this.props.onTaskHover) {
                    this.props.onTaskHover(hover_feature.get('task'));
                }
            } else {
                const hover_features = this.map.getFeaturesAtPixel(event.pixel).filter((feature) => feature.get('type').substr(0, 5) === 'route');
                hover_features.forEach((feature) => {
                    feature.set('type', 'routeHighlight');
                    this.last_route_highlights.push(feature);
                });
                if (this.props.onTaskHover) {
                    this.props.onTaskHover(null);
                }
            }
        });
    }

    componentDidMount() {
        this.map.setTarget(this.map_ref.current);
    }

    async fillVectorSource(plan) {
        this.vector_source.clear();
        try {
            for (let worker in plan) {
                for (let day in plan[worker]) {
                    if (plan[worker][day].length > 0) {
                        const worker_coords = [plan[worker][day][0].worker.lon, plan[worker][day][0].worker.lat];
                        const client_coords = plan[worker][day].map(task => [task.client.lon, task.client.lat]);
                        let feature;
                        try {
                            const polyline = await getRoutePolyline6([worker_coords, ...client_coords, worker_coords]);
                            feature = new Feature({
                                type: 'route',
                                geometry: new Polyline({
                                    factor: 1e6
                                }).readGeometry(polyline, {
                                    dataProjection: 'EPSG:4326',
                                    featureProjection: 'EPSG:3857'
                                }),
                            });
                            this.vector_source.addFeature(feature);
                        } catch (e) { }
                        this.vector_source.addFeature(new Feature({
                            type: 'worker',
                            geometry: new Point(fromLonLat(worker_coords)),
                        }));
                        this.vector_source.addFeatures(plan[worker][day].map((task) => {
                            return new Feature({
                                task: task,
                                route: feature,
                                type: 'client',
                                geometry: new Point(fromLonLat([task.client.lon, task.client.lat])),
                            });
                        }));
                    }
                }
            }
        } catch (e) {
            if (this.onError) {
                this.onError(e);
            }
        }
    }

    componentDidUpdate(prevProps) {
        this.map.updateSize();
        if (this.props.highlightClient != prevProps.highlightClient) {
            this.last_client_highlights.forEach((feature) => {
                feature.set('type', 'client');
            });
            this.last_client_highlights = [];
        }
        if (this.props.highlightClient !== null && this.props.highlightClient !== -1) {
            const feature = this.vector_source.getFeatures().find((feature) => feature.get('type') === 'client' && feature.get('task').client.id === this.props.highlightClient);
            if (feature) {
                this.last_client_highlights = [feature];
                feature.set('type', 'clientHighlight');
            }
        }
        if (prevProps.plan !== this.props.plan) {
            this.fillVectorSource(this.props.plan);
        }
    }

    render() {
        return (
            <div style={{ width: '100%', height: '100%' }} ref={this.map_ref}>
            </div>
        );
    }
}

export default PlanMap;

