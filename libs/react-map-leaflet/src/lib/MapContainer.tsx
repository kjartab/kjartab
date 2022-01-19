import { useEffect, useRef, useState } from "react";
import { LeafletContext, LeafletMapContext, LeafletProps } from "./core/LeafletContext";
import L, { map } from 'leaflet';
import "leaflet/dist/leaflet.css";

export const MapContainer : React.FC<LeafletProps> = (props) => {

    const ref = useRef<HTMLDivElement>(null);
    const [ initalized, setInitialized] = useState(false);
    const [ leafletMap, setLeafletMap] = useState<L.Map>();
    
    useEffect(() => { 
        if (ref?.current && !initalized) {
            const leafletMap = map(ref.current, props.options);
            leafletMap.on('click', () => { console.log("test")})
            setInitialized(true);
            setLeafletMap(leafletMap);
        }

        return () => { };
    }, [ref]); 
    
    return <div style={{height: "100vh"}} ref={ref}>
        { leafletMap &&  <LeafletContext.Provider value={leafletMap ? { leafletMap: leafletMap as L.Map} : undefined}>{props.children}</LeafletContext.Provider>}
      
    </div> 
}

export default MapContainer;
