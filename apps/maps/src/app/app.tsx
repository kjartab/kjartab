import styled from '@emotion/styled';  
import L, { LatLngBounds, LatLngExpression, MarkerOptions } from 'leaflet';
import { Point, LineString, Polygon, Feature } from 'geojson';
import { FeatureGroup, GeoJson, LayerGroup, MapContainer, Marker, Polyline, Popup, TileLayer, TileLayerWms } from 'react-map-leaflet';  
import { useState } from 'react';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const StyledApp = styled.div`
  // Your style here
`;

export function App() { 
  const lat = 63.3; 
  const [lng, setLng ] = useState(10.3);

  const latlng : LatLngExpression = [63.3, lng];
  const [opts, setOpts]= useState<MarkerOptions>({draggable: false});
  const [weight, setWeight]= useState(4);
  const [show, setShow]= useState(true);
  const point : Point = {
    coordinates: [10.3, 63.3],
    type: 'Point'
  }
  console.log(opts);
  const feature : Feature = {
    geometry: {
      coordinates: [10.3, 63.3],
      type: 'Point'
    },
    properties: {
      test: "test"
    },
    type: 'Feature'
  }
  return (
    <StyledApp>
      <button onClick={() =>  { 
        let DefaultIcon = L.icon({
          iconUrl: iconShadow,
          shadowUrl: iconShadow,
          iconAnchor: [12, 41]
      });
 
        setOpts({...opts, draggable: true}); 
        setWeight(40);
        
        // setShow(!show) }
      }}>change</button>
    <MapContainer options={{ zoom: 14, center: [63.3,10.3]}}> 
        {/* <FeatureGroup>  */}
            <Marker latlng={latlng} options={opts} >
              {/* <Popup><br/>test</Popup> */}
            </Marker> 
        {/* </FeatureGroup>  */}
        <Polyline latlngs={[[63.3, 10.3], [63.3, 10.4]]} options={{weight: weight, color: '#000000'}}></Polyline>
        <TileLayer url='https://tile.openstreetmap.org/{z}/{x}/{y}.png' maxZoom={18} minZoom={0} ></TileLayer>
        
        <TileLayerWms url={"http://kart.trondheim.kommune.no/geoserver/Raster/wms?"} 
            maxZoom={18} 
            minZoom={12} 
            format={"image/png"} 
            layers='DTM_Skyggemodell' 
            transparent={true} 
            opacity={0.5}
            bounds={new LatLngBounds([63.298322940154904, 10.04545530381227],[63.46114177810909, 10.740909239294403])}/>

    </MapContainer>  

      </StyledApp>
    );
}

export default App;
