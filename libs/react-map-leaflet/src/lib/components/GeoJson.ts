import L, { TileLayer as LTileLayer, GeoJSON as LGeoJSON } from "leaflet";
import geojson from 'geojson';
import { createLeafletComponent } from "../hooks/useLeafletComponent"; 
import { createLayer, destroyLayer, OtherProps } from "./common";

export type GeoJsonProps =  {
    geojson: geojson.GeoJsonObject | undefined,
    options: L.GeoJSONOptions<any> | undefined 
 } & OtherProps;

export const GeoJson = createLeafletComponent<LGeoJSON, GeoJsonProps>({
    name: "GeoJson",
    create(context, props) {
        const element = L.geoJSON(props.geojson, props.options);  
        createLayer(context, element);
        return element;
    },
    update(element, props, prevProps, context) { 
        // update
    },
    destroy(element, context) {
        destroyLayer(context, element);
    }
})

