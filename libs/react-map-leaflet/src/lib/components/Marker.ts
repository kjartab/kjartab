import L, { TileLayer as LTileLayer, Marker as LMarker, LatLngExpression, MarkerOptions, featureGroup, layerGroup } from "leaflet";
import { LeafletContext } from "../core";
import { createLeafletComponent } from "../hooks/useLeafletComponent"; 
import { createLayer, destroyLayer, OtherProps } from "./common";

export type EventFn = (event: L.LeafletEvent) => void

export type MarkerProps =  { 
    latlng: LatLngExpression, 
    options?: MarkerOptions
    onClick?: (event: L.LeafletEvent) => void
    
 } & OtherProps; 

export const Marker = createLeafletComponent<LMarker, MarkerProps>({
    name: "Marker",
    create(context, props) {    
        const element = L.marker(props.latlng, props.options);
        createLayer(context, element);         
        return element;
    }, 
    destroy(element, context) {
        destroyLayer(context, element);
    },
    provide(element) { 
        return {
            layer: element
        }
    }
})

