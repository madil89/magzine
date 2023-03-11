import React from 'react';

import ResponsiveAppBar from '../components/ResponsiveAppBar';

export default {
  title: 'App/AppBar',
  component: ResponsiveAppBar,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

function Template(args) {
  return <ResponsiveAppBar {...args} />;
}

export const Primary = Template.bind({});
Primary.args = {

};
