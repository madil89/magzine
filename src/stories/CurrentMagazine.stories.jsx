import React from 'react';

import { Provider } from 'react-redux';
import CurrentMagazine from '../components/CurrentMagazine';
// import { configureStore, createSlice } from '@reduxjs/toolkit';
// import assetManager from '../assets/initMagazine';
import store from '../store';

export default {
  title: 'App/CurrentMagazine',
  component: CurrentMagazine,
  decorators: [(story) => <div style={{ padding: '3rem' }}>{story()}</div>],
  parameters: {
    layout: 'fullscreen',
  },
};

function Template(args) {
  return <CurrentMagazine {...args} />;
}

export const Primary = Template.bind({});
Primary.decorators = [
  (Story) => (
    <Provider store={store}>
      <Story />
    </Provider>
  ),
];
