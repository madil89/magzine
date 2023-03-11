import React from 'react';

import Image from '../components/Image';
import assetManager from '../assets/initMagazine';

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

export const Landscape = Template.bind({});
Landscape.args = {
  imageList: assetManager.images,
};

export const Portrait = Template.bind({});
Portrait.args = {
  imageList: assetManager.issue18Images,
};
