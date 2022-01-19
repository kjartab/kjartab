import L, { TileLayer as LTileLayer, FeatureGroup as LFeatureGroup } from "leaflet";
import { createLeafletComponent } from "../hooks/useLeafletComponent";
import { createLayer, destroyLayer, OtherProps } from "./common";


export type FeatureGroupProps =  {
    layers?: L.Layer[],
    options?: L.LayerOptions,
    bindPopup?: () => void
 } & OtherProps;

export const FeatureGroup = createLeafletComponent<LFeatureGroup, FeatureGroupProps>({
    name: "FeatureGroup",
    create(context, props) { 
        const element = L.featureGroup(props.layers, props.options);
        if (context.leafletMap) {
            context.leafletMap.addLayer(element);
        } 
        return element;
    }, 
    destroy(element, context) {
        destroyLayer(context, element);
    },
    provide(element) {
        return { 
            featureGroup: element 
        }
    }
})

