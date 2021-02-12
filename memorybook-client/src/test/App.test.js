import React from 'react';
import App from '../App';
import renderer from 'react-test-renderer';

//Test App.js renders correctly
test('renders correctly', () => {
  const tree = renderer
  .create(<App />)
  .toJSON();
  expect(tree).toMatchSnapshot();
});
