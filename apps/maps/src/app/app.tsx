import styled from '@emotion/styled';  
import L, { LatLngBounds } from 'leaflet';
import { Point, LineString, Polygon, Feature } from 'geojson';
import { FeatureGroup, GeoJson, LayerGroup, MapContainer, Marker, Popup, TileLayer, TileLayerWms } from 'react-map-leaflet';  
import { useState } from 'react';

const StyledApp = styled.div`
  // Your style here
`;

export function App() { 

  const [show, setShow]= useState(true);
  const point : Point = {
    coordinates: [10.3, 63.3],
    type: 'Point'
  }
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
      <button onClick={() => setShow(!show)}></button>
    <MapContainer options={{ zoom: 14, center: [63.3,10.3]}}> 
        <FeatureGroup> 
            <Marker onClick={(event) => {console.log("click marker", event);}} latlng={[63.3,10.3]} options={{ }}>
              <Popup>test</Popup>
            </Marker> 
        </FeatureGroup> 
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
