import L from "leaflet";
import { createLeafletComponent } from "../hooks/useLeafletComponent";
import { createLayer, destroyLayer } from "./common";

export type ImageOverlayProps = { 
    imageUrl: string, 
    bounds: L.LatLngBoundsExpression } 
    & L.ImageOverlayOptions;

export const ImageOverlay = createLeafletComponent<L.ImageOverlay, ImageOverlayProps>({
    name: "TileLayer.Wms",
    create(context, props) {  
        const {imageUrl, bounds, ...options } = props;  
        const element = L.imageOverlay(imageUrl, bounds, options)
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

