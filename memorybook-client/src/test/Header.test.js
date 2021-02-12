import React from 'react';
import Header from '../components/Header';
import renderer from 'react-test-renderer';

//Test Header.js renders correctly
test('renders correctly', () => {
  const tree = renderer
  .create(<Header />)
  .toJSON();
  expect(tree).toMatchSnapshot();
});

//Test Header.js renders correctly when states populated
test('renders states correctly when populated', () => {
  const username = 'Jane Doe';
  const userID = '1234test';
  const tree = renderer
  .create(<Header username={username} userID={userID} />)
  .toJSON();
  expect(tree).toMatchSnapshot();
});
