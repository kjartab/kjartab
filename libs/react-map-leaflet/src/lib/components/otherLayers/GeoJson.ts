import L, { TileLayer as LTileLayer, GeoJSON as LGeoJSON } from "leaflet";
import geojson, { Feature } from 'geojson';
import { createLeafletComponent } from "../../core/leafletComponent"; 
import { createLayer, destroyLayer, OtherProps } from "../common";

export type GeoJsonProps = L.GeoJSONOptions<any> &   {
    geojson: geojson.GeoJsonObject | undefined 
 } & OtherProps;

export const GeoJson = createLeafletComponent<LGeoJSON, GeoJsonProps>({
    name: "GeoJson",
    create(context, props) {
        const { geojson, ...rest } = props;
        const element = L.geoJSON(geojson, rest);   
        createLayer(context, element);
        console.log(element);
        return element;
    }, 
    update(element, props, prevProps, context) {
        console.log("update", props, prevProps); 
        const { geojson, ...rest } = props;
    },
    destroy(element, context) {
        destroyLayer(context, element);
    }
})

