import L, { TileLayer as LTileLayer, FeatureGroup as LFeatureGroup } from "leaflet";
import { createLeafletComponent } from "../../core/leafletComponent"; 
import { createLayer, destroyLayer, OtherProps } from "../common";


const immutableProps = ['options'] as const;

export type FeatureGroupProps =  {
    layers?: L.Layer[],
    options?: L.LayerOptions,
    bindPopup?: () => void
 } & OtherProps;

export const FeatureGroup = createLeafletComponent<LFeatureGroup, FeatureGroupProps>({
    name: "FeatureGroup",
    create(context, props) { 
        const element = L.featureGroup(props.layers, props.options);
        createLayer(context, element);
        return element;
    },
    destroy : (element, context) => destroyLayer(context, element),
    provide(element) {
        return { 
            featureGroup: element 
        }
    }, 
    leafletImmutableProps: immutableProps
})

