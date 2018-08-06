import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SliderInput.css';

export default class SliderInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.defaultValue,
    };
  }

  handleChange(e) {
    const { value } = e.target;
    const { onChange } = this.props;
    this.setState({ value });
    onChange(parseFloat(value));
  }

  render() {
    const { value } = this.state;

    return (
      <div className="fmz-slider">
        <p>
          {value}
%
        </p>
        <input
          type="range"
          value={value}
          min={0}
          max={10}
          step={0.25}
          onChange={(e) => { this.handleChange(e); }}
        />
      </div>
    );
  }
}

SliderInput.propTypes = {
  defaultValue: PropTypes.number,
  onChange: PropTypes.func,
};

SliderInput.defaultProps = {
  defaultValue: 0,
  onChange: () => {},
};
