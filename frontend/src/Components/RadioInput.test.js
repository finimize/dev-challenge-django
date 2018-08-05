import React from 'react';
import ReactDOM from 'react-dom';
import TestRenderer from 'react-test-renderer';

import RadioInput from './RadioInput';

describe('RadioInput', () => {
    it('renders correctly', () => {
        const tree = TestRenderer.create(
            <RadioInput value={5} onChange={() => {}}/>
        ).toJSON();

        expect(tree).toMatchSnapshot();
    })
})
