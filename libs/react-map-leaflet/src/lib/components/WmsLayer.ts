import L, { TileLayer as LTileLayer, WMSOptions as LWmsOptions } from "leaflet";
import { createLeafletComponent } from "../hooks/useLeafletComponent";
import { createLayer } from "./common";

export type WmsLayerProps = { url: string } & LWmsOptions;

export const WmsLayer = createLeafletComponent<LTileLayer, WmsLayerProps>({
    name: "TileLayer.Wms",
    create(context, props) {  
        const {url, ...options } = props;  
        const element = L.tileLayer.wms(props.url, options); 
        createLayer(context, element); 
        return element;
    },
    update(element, props, prevProps, context) {
        
    }
    // delete ++
})

