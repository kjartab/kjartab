import L from "leaflet";
import { LeafletMapContext } from "../core";
import { createLeafletComponent } from "../hooks/useLeafletComponent";
import { destroyLayer, OtherProps } from "./common";

export type PopupProps =  {  
    options?: L.PopupOptions
    onClick?: (event: L.LeafletEvent) => void
    
 } & OtherProps;
 
export function bindPopup(context: LeafletMapContext, popup: L.Popup) : L.Popup {
    const { featureGroup, layerGroup, layer } = context;    
    if (layer) {
        console.log("layer poup");
        layer.bindPopup(popup);
        return popup;
    }
    if (featureGroup) {
        console.log("featuregroup poup");
        featureGroup.bindPopup(popup); 
        return popup;
    }
    if (layerGroup) {
        console.log("layergroup poup");
        layerGroup.bindPopup(popup);
        return popup;
    }
    return popup;
}

export const Popup = createLeafletComponent<L.Popup, PopupProps>({
    name: "Popup",
    create(context, props) {   
        const element = L.popup(props.options);
        const { layer } = context;
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
    destroy(element, context) {
        destroyLayer(context, element);
    } 
})

