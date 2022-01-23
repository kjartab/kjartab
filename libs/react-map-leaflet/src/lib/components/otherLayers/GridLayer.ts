import L  from "leaflet";
import { createLeafletComponent } from "../../core/leafletComponent"; 
import { createLayer, destroyLayer, OtherProps } from "../common";


export type GridLayerProps =  { 
    options?: L.GridLayerOptions 
 } & OtherProps;

export const GridLayer = createLeafletComponent<L.GridLayer, GridLayerProps>({
    name: "LayerGroup",
    create(context, props) {
        if (!context.leafletMap)return;
        const element = L.gridLayer(props.options); 
        createLayer(context, element);
        return element;
    },
    destroy(element, context) {
        destroyLayer(context, element);
    }
})

