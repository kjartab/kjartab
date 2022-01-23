import { MapOptions } from "leaflet";
import React, { useContext } from "react";

export type LeafletProps = {
    options: MapOptions
}

export type LeafletMapContext = {
    leafletMap?: L.Map,
    parentLayer?: boolean
} & LeafletLayerContext

export type LeafletLayerContext ={
    featureGroup?: L.FeatureGroup,
    layerGroup?: L.LayerGroup,
    layer?: L.Layer
}

export const LeafletContext = React.createContext<any>(undefined);


export const useLeaflet = (): LeafletMapContext => useContext(LeafletContext) || {};
