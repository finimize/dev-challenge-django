import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './CurrencyInput.css';
import isValid from '../helpers';

export default class CurrencyInput extends Component {
  constructor(props) {
    super(props);

    this.state = { value: props.defaultValue };
  }

  handleChange(e) {
    const { value } = e.target;
    const { onChange } = this.props;
    this.setState({ value });
    if (isValid(value)) {
      onChange(parseFloat(value));
    }
  }

  render() {
    const { defaultValue } = this.props;
    const { value } = this.state;

    return (
      <div className={`currency-input ${defaultValue !== undefined ? 'default-value' : ''}`}>
        <span>
£
        </span>
        <input
          type="text"
          value={value}
          onChange={(e) => { this.handleChange(e); }}
        />
      </div>
    );
  }
}

CurrencyInput.propTypes = {
  defaultValue: PropTypes.number,
  onChange: PropTypes.func,
};

CurrencyInput.defaultProps = {
  defaultValue: 0,
  onChange: () => {},
};
