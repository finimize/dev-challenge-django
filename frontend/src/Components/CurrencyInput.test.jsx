import React from 'react';
import TestRenderer from 'react-test-renderer';
import CurrencyInput from './CurrencyInput';

describe('CurrencyInput', () => {
  it('renders correctly', () => {
    const tree = TestRenderer.create(
      <CurrencyInput value={5} onChange={() => {}} />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
