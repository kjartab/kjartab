import styled from '@emotion/styled';  
import { FeatureGroup, GeoJson, MapContainer, Marker, Popup, TileLayer } from 'react-map-leaflet';  

const StyledApp = styled.div`
  // Your style here
`;

export function App() { 
  return (
    <StyledApp>

    <MapContainer options={{ zoom: 14, center: [50,10]}}> 
    <FeatureGroup>   
        <Marker onClick={(event) => {console.log("click marker", event);}} latlng={[50,10]} options={{ }}> </Marker> 
    </FeatureGroup> 
        <TileLayer url='https://tile.openstreetmap.org/{z}/{x}/{y}.png' maxZoom={18} minZoom={0} ></TileLayer>
    </MapContainer>  

      </StyledApp>
    );
}

export default App;
