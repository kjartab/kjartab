import { Story, Meta } from '@storybook/react';
import { Feature } from 'geojson';
import L, { LatLngBounds } from 'leaflet';
import { GeoJson, MapContainer, TileLayer  } from 'react-map-leaflet'; 

export default {
  component: GeoJson,
  title: 'GeoJson',
} as Meta;

const Template: Story = (args) => 

<MapContainer options={{ zoom: 14, center: [63.33,10.5]}}>  
    <TileLayer url='https://tile.openstreetmap.org/{z}/{x}/{y}.png' maxZoom={18} minZoom={0} ></TileLayer>
  

</MapContainer>

 
const GeoJsonPointStory: Story<{feature: Feature }> = (args) => 
  
{
  console.log(args.feature, args.feature.properties?.["test"]);
  return <MapContainer options={{ zoom: 14, center: [63.33,10.5]}}>  
    <TileLayer url='https://tile.openstreetmap.org/{z}/{x}/{y}.png' maxZoom={18} minZoom={0} ></TileLayer>
      <GeoJson
        geojson={args.feature}  
        pointToLayer={(_, latlng) => L.marker(latlng)} 
        onEachFeature={(feature, layer) => {
            layer.bindPopup((l) => { return feature.properties['test'] }, { offset: [0, -38]});
            layer.on({ click: () => { layer.openPopup() }})}}
        />

  <div>{args.feature.properties?.["test"] } </div>
  </MapContainer>
}
 



 export const Primary = Template.bind({});

 Primary.args = {};

 export const FeaturePoint = GeoJsonPointStory.bind({});

FeaturePoint.args = {
  feature: {
    geometry: {
      coordinates: [10.5, 63.33],
      type: 'Point'
    },
    properties: {
      test: "test"
    },
    type: 'Feature'
  } 
}
 
  