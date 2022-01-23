import L, { TileLayer as LTileLayer, LayerGroup as LLayerGroup } from "leaflet";
import { createLeafletComponent } from "../../core/leafletComponent"; 
import { createLayer, destroyLayer, OtherProps } from "../common";


export type LayerGroupProps =  {
    layers?: L.Layer[],
    options?: L.LayerOptions,
    bindPopup?: () => void
 } & OtherProps;

export const LayerGroup = createLeafletComponent<LLayerGroup, LayerGroupProps>({
    name: "LayerGroup",
    create(context, props) {
        if (!context.leafletMap)return;
        const element = L.layerGroup(props.layers, props.options); 
        createLayer(context, element);
        return element;
    },
    update(element, props, prevProps, context) { 
        // update
    },
    destroy(element, context) {
        destroyLayer(context, element);
    }
})

