import L, { TileLayer as LTileLayer, TileLayerOptions as LTileLayerOptions } from "leaflet";
import { createLeafletComponent } from "../../core/leafletComponent"; 
import { createLayer, destroyLayer, OtherProps } from "../common";

export type TileLayerProps =  { url: string } & LTileLayerOptions;

export const TileLayer = createLeafletComponent<LTileLayer, TileLayerProps>({
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

