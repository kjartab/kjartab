import L, { LatLngExpression, PolylineOptions } from "leaflet";
import { createLeafletComponent } from "../../core/leafletComponent";
import { createLayer, destroyLayer, OtherProps } from "../common";

export type PolylineProps =  { 
    latlngs: LatLngExpression[] | LatLngExpression[][], 
    options?: PolylineOptions 
    
 } & OtherProps; 

 const immutableProps = ['options'] as const; 

export const Polyline = createLeafletComponent<L.Polyline, PolylineProps>({
    name: "Polyline",
    create(context, props) { 
        const element = L.polyline(props.latlngs, props.options);
        createLayer(context, element);
        return element;
    }, 
    update(element, props, prevProps, context) {  
    },
    destroy(element, context) {
        destroyLayer(context, element);
    },
    provide(element) { 
        return {
            layer: element
        }
    },
    leafletImmutableProps: immutableProps
})

