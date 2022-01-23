import L from "leaflet";  
import { createLeafletComponent } from "../../core/leafletComponent";
import { createLayer, destroyLayer } from "../common";

export type VideoOverlayProps = { 
    video: string | string[],
    bounds: L.LatLngBoundsExpression } 
    & L.VideoOverlayOptions;

export const VideoOverlay = createLeafletComponent<L.VideoOverlay, VideoOverlayProps>({
    name: "VideoOverlay",
    create(context, props) {  
        const {video, bounds, ...options } = props;  
        const element = L.videoOverlay(video, bounds, options)
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

