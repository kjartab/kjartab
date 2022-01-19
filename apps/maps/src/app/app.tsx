import styled from '@emotion/styled';  
import { LatLng, LatLngBounds } from 'leaflet';
import { FeatureGroup, GeoJson, MapContainer, Marker, Popup, TileLayer, TileLayerWms } from 'react-map-leaflet';  

const StyledApp = styled.div`
  // Your style here
`;

export function App() { 
  return (
    <StyledApp> 
      <MapContainer options={{ zoom: 14, center: [63.33,10.5]}}>  
          <TileLayer url='https://tile.openstreetmap.org/{z}/{x}/{y}.png' maxZoom={18} minZoom={0} ></TileLayer>

          <TileLayerWms url={"http://kart.trondheim.kommune.no/geoserver/Raster/wms?"} 
            maxZoom={18} 
            minZoom={12} 
            format={"image/png"} 
            layers='DTM_Skyggemodell' 
            transparent={true} 
            bounds={new LatLngBounds([63.298322940154904, 10.04545530381227],[63.46114177810909, 10.740909239294403])}/>
      
      </MapContainer>
    </StyledApp>
    );
}

export default App;
