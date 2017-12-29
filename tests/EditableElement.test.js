import React from 'react';
import renderer from 'react-test-renderer';

import AllDefaults from '../example/src/tests/AllDefaults';
import InitialValue from '../example/src/tests/InitialValue';
import EditableH1 from '../example/src/tests/EditableH1';
import EditableH1WithCustomStyles from '../example/src/tests/EditableH1WithCustomStyles';
import OnChangeOverride from '../example/src/tests/OnChangeOverride';

test('All defaults renders correctly.', () => {
  const tree = renderer.create(<AllDefaults />).toJSON();

  expect(tree).toMatchSnapshot();
});

test('Element with an initial value renders correctly.', () => {
  const tree = renderer.create(<InitialValue />).toJSON();

  expect(tree).toMatchSnapshot();
});

test('An editable h1 renders correctly.', () => {
  const tree = renderer.create(<EditableH1 />).toJSON();

  expect(tree).toMatchSnapshot();
});

test('An editable h1 with custom styles renders correctly.', () => {
  const tree = renderer.create(<EditableH1WithCustomStyles />).toJSON();

  expect(tree).toMatchSnapshot();
});

test('An editable with an onchange override renders correctly.', () => {
  const tree = renderer.create(<OnChangeOverride />).toJSON();

  expect(tree).toMatchSnapshot();
});
