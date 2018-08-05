import React from 'react';
import TestRenderer from 'react-test-renderer';

import SliderInput from './SliderInput';

describe('SliderInput', () => {
  it('renders correctly', () => {
    const tree = TestRenderer.create(
      <SliderInput value={5} onChange={() => {}} />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
