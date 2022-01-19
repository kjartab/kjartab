import { Story, Meta } from '@storybook/react';
import { LatLngBounds } from 'leaflet';
import { MapContainer,  TileLayer,  TileLayerWms } from 'react-map-leaflet'; 

export default {
  component: TileLayerWms,
  title: 'TileLayerWms',
} as Meta;

const Template: Story = (args) => 

<MapContainer options={{ zoom: 14, center: [63.33,10.5]}}>  
    <TileLayer url='https://tile.openstreetmap.org/{z}/{x}/{y}.png' maxZoom={18} minZoom={0} ></TileLayer>

    <TileLayerWms url={"http://kart.trondheim.kommune.no/geoserver/Raster/wms?"} 
        maxZoom={18} 
        minZoom={12} 
        format={"image/png"} 
        layers='DTM_Skyggemodell' 
        opacity={0.6}
        transparent={true} 
        bounds={new LatLngBounds([63.298322940154904, 10.04545530381227],[63.46114177810909, 10.740909239294403])}/>

</MapContainer>

 export const Primary = Template.bind({});
 Primary.args = {};