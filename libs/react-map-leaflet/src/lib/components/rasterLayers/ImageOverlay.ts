import L from "leaflet"; 
import { createLeafletComponent } from "../../core/leafletComponent";
import { createLayer, destroyLayer } from "../common";

export type ImageOverlayProps = { 
    imageUrl: string, 
    bounds: L.LatLngBoundsExpression } 
    & L.ImageOverlayOptions;

export const ImageOverlay = createLeafletComponent<L.ImageOverlay, ImageOverlayProps>({
    name: "ImageOverlay",
    create(context, props) {  
        const {imageUrl, bounds, ...options } = props;  
        const element = L.imageOverlay(imageUrl, bounds, options)
        createLayer(context, element); 
        return element;
    },
    destroy : (element, context) => destroyLayer(context, element),
    provide : (element) => ({ layer: element })    
})

