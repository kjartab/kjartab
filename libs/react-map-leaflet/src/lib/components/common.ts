import { Layer, LayerOptions } from "leaflet";
import { ReactNode } from "react";
import { LeafletMapContext } from "../core";

export type OtherProps = {
    children?: ReactNode; 
};

export function createLayer(context: LeafletMapContext, layer: Layer) {
    const { featureGroup, layerGroup, leafletMap } = context;    
    if (featureGroup && !featureGroup.hasLayer(layer)) {
        featureGroup.addLayer(layer); 
        return;
    }
    if (layerGroup && !layerGroup.hasLayer(layer)) {
        layerGroup.addLayer(layer);
        return;
    }
    if (leafletMap && !leafletMap.hasLayer(layer)) { 
        leafletMap.addLayer(layer); 
    } 
} 

export function destroyLayer(context: LeafletMapContext, layer: Layer) { 
    const { featureGroup, layerGroup, leafletMap } = context;   
    if (featureGroup && featureGroup.hasLayer(layer)) { 
        featureGroup.removeLayer(layer);
        return;
    }
    if (layerGroup && layerGroup.hasLayer(layer)) { 
        layerGroup.removeLayer(layer);
        return;
    }
    if (leafletMap && leafletMap.hasLayer(layer)) {
        leafletMap.removeLayer(layer); 
    }
}