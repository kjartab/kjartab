import L, { LatLngExpression, Marker as LMarker, MarkerOptions } from "leaflet";
import { createLeafletComponent } from "../../core/leafletComponent";
import { shallowEquals } from "../../core/utils";
import { createLayer, destroyLayer, OtherProps } from "../common";

export type EventFn = (event: L.LeafletEvent) => void

const immutableProps = ['options'] as const; 

export type MarkerProps =  { 
    latlng: LatLngExpression, 
    options?: MarkerOptions
 } & OtherProps; 

export const Marker = createLeafletComponent<LMarker, MarkerProps>({
    name: "Marker",
    create(context, props) {    
        console.log(props.options);
        const element = L.marker(props.latlng, props.options);
        createLayer(context, element); 
        console.log("create marker", element, props.options);
        return element;
    },
    update(element, props, prevProps, context) { 
        if (!shallowEquals(props.latlng, prevProps.latlng)) {
            element.setLatLng(props.latlng); 
        }
    },
    destroy : (element, context) => destroyLayer(context, element),
    provide : (element) => ({ layer: element }),
    leafletImmutableProps: immutableProps
})

