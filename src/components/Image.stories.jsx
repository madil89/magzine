import React from 'react';

import Image from './Image';
import assetManager from '../assets/assetManager';

export default {
  title: 'App/Image',
  component: Image,
  parameters: {
    layout: 'fullscreen',
  },
};

function Template(args) {
  return <Image {...args} />;
}

export const Primary = Template.bind({});
Primary.args = {
  src: assetManager.images[0].src,
  alt: assetManager.images[0].alt,
};

export const Secondary = Template.bind({});
Secondary.args = {
  src: assetManager.images[1].src,
  alt: assetManager.images[1].alt,
};
