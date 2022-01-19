import { Story, Meta } from '@storybook/react';
import { MapContainer } from './MapContainer';

export default {
  component: MapContainer,
  title: 'MapContainer',
} as Meta;

const Template: Story = (args) => <MapContainer options={{...args}}  />;

export const Primary = Template.bind({});
Primary.args = {};
