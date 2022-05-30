import React from 'react'
import { withTests } from '@storybook/addon-jest';
import { withPerformance } from 'storybook-addon-performance';

import { Provider } from 'react-redux';
import store from '../src/stories/store';
import data from '../src/stories/assets/configuration.json';

import '../src/stories/assets/index.scss';

const results = {};

export const decorators = [(Story) => (
  <Provider store={store}>
    <Story />
  </Provider>
), withTests(
  {
    results,
    filesExt: '.test.js'
  }),
  withPerformance
];
if (data) { // add the global configuration to the session, if not already present
  const configuration = window?.sessionStorage?.configuration;
  if (!configuration || Object.keys(configuration).length <= 0) {
    window.sessionStorage.setItem('configuration', JSON.stringify(data));
  }
}

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  a11y: {
    // optional selector which element to inspect
    element: '#root',
    // axe-core configurationOptions (https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#parameters-1)
    config: {},
    // axe-core optionsParameter (https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#options-parameter)
    options: {},
    // optional flag to prevent the automatic check
    manual: false
  }
}
