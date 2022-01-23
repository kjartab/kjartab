import L from "leaflet";
import { createLeafletComponent } from "../../core/leafletComponent";
import { destroyLayer, OtherProps } from "../common";

export type ToolTipProps =  {  
    options?: L.TooltipOptions
    onClick?: (event: L.LeafletEvent) => void
    
 } & OtherProps;
  

export const ToolTip = createLeafletComponent<L.Tooltip, ToolTipProps>({
    name: "ToolTip",
    create(context, props) {   
        const element = L.tooltip(props.options);  
        return element;  
    },
    update(element, props, prevProps, context) {  
        const { layer } = context; 
        return element;
    },
    destroy(element, context) {
        destroyLayer(context, element);
    } 
})

