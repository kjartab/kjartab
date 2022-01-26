import L from "leaflet";
import { LeafletMapContext } from "../../core";
import { createLeafletComponent } from "../../core/leafletComponent";
import { destroyLayer, OtherProps } from "../common";

const immutableProps = ['options'] as const; 

export type PopupProps =  {  
    options?: L.PopupOptions
    onClick?: (event: L.LeafletEvent) => void
    
 } & OtherProps;
 
export function bindPopup(context: LeafletMapContext, popup: L.Popup) : L.Popup {
    const { featureGroup, layerGroup, layer } = context;    
    if (layer) {
        layer.bindPopup(popup);
        return popup;
    }
    if (featureGroup) {
        featureGroup.bindPopup(popup); 
        return popup;
    }
    if (layerGroup) {
        layerGroup.bindPopup(popup);
        return popup;
    }
    return popup;
}

export const Popup = createLeafletComponent<L.Popup, PopupProps>({
    name: "Popup",
    create(context, props) {   
        const element = L.popup(props.options);
        bindPopup(context, element);
        return element;  
    },
    update(element, props, prevProps, context) {  
        const { layer } = context;
        if (layer?.getPopup() != element) {
            layer?.bindPopup(element);
        } 

        return element;
    },
    destroy : (element, context) => destroyLayer(context, element), 
    leafletImmutableProps: immutableProps
    
})

