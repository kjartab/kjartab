import L, { TileLayer as LTileLayer, TileLayerOptions as LTileLayerOptions } from "leaflet";
import { createLeafletComponent } from "../hooks/useLeafletComponent";
import { createLayer, destroyLayer } from "./common";

export type TileLayerProps =  { url: string } & LTileLayerOptions;

export const TestTileLayer = createLeafletComponent<LTileLayer, TileLayerProps>({
    name: "TileLayer",
    create(context, props) {  
        const {url, ...options } = props;  
        const element = L.tileLayer(props.url, options);
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

