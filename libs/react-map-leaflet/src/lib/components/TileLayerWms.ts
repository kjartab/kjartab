import L from "leaflet";
import { createLeafletComponent } from "../hooks/useLeafletComponent";
import { createLayer, destroyLayer } from "./common";

export type WmsLayerProps = { url: string } & L.WMSOptions;

export const TileLayerWms = createLeafletComponent<L.TileLayer, WmsLayerProps>({
    name: "TileLayer.Wms",
    create(context, props) {  
        const {url, ...options } = props;  
        const element = L.tileLayer.wms(props.url, options); 
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

