import L  from "leaflet";
import { createLeafletComponent } from "../../core/leafletComponent"; 
import { createLayer, destroyLayer, OtherProps } from "../common";


const immutableProps = ['options'] as const;

export type GridLayerProps =  { 
    options?: L.GridLayerOptions 
 } & OtherProps;

export const GridLayer = createLeafletComponent<L.GridLayer, GridLayerProps>({
    name: "GridLayer",
    create(context, props) { 
        const element = L.gridLayer(props.options); 
        createLayer(context, element);
        return element;
    },
    destroy : (element, context) => destroyLayer(context, element), 
    leafletImmutableProps: immutableProps
})

