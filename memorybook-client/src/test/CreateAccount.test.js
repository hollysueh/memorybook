import React from 'react';
import CreateAccount from '../components/CreateAccount';
import renderer from 'react-test-renderer';

//Test CreateAccount.js renders correctly
test('renders correctly', () => {
  const tree = renderer
  .create(<CreateAccount />)
  .toJSON();
  expect(tree).toMatchSnapshot();
});

//Test CreateAccount.js renders correctly when states populated
test('renders states correctly when populated', () => {
  const formUsername = 'Jane Doe';
  const formEmail = 'janedoe@gmail.com';
  const tree = renderer
  .create(<CreateAccount formUsername={formUsername} formEmail={formEmail} />)
  .toJSON();
  expect(tree).toMatchSnapshot();
});

//Test fetch() function used in CreateAccount.js is working correctly
test('create new user', () => {
  fetch('/newUser', { //send POST request to server
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }, // send server 'account' values
    body: JSON.stringify({
      user: 'Jane Doe',
      email: 'janedoe@gmail.com',
      pwd: 'snapshotTest'
    }),
  })
  .then(res => {
    expect(res[0].artistName).toBeDefined();
  });
});
