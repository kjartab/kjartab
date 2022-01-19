import { Meta, Story } from '@storybook/react';
import { MapContainer, TileLayer } from 'react-map-leaflet';

export default {
  component: TileLayer,
  title: 'TileLayer',
} as Meta;

const Template: Story = (args) => 
    <MapContainer options={{ zoom: 14, center: [50,10]}}>  
    <TileLayer url='https://tile.openstreetmap.org/{z}/{x}/{y}.png' maxZoom={18} minZoom={0} ></TileLayer>
</MapContainer>;

 export const Primary = Template.bind({});
 Primary.args = {};