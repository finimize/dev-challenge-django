import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class RadioInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOption: props.defaultValue,
    };
  }

  handleChange({ target: { value } }) {
    this.setState({ selectedOption: value });
    const { onChange } = this.props;
    onChange(value);
  }

  render() {
    const { selectedOption } = this.state;

    return (
      <form>
        <div>
          <label>
            <input
              type="radio"
              value="monthly"
              checked={selectedOption === 'monthly'}
              onChange={(e) => { this.handleChange(e); }}
            />
            monthly
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              value="quarterly"
              checked={selectedOption === 'quarterly'}
              onChange={(e) => { this.handleChange(e); }}
            />
             quarterly
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              value="yearly"
              checked={selectedOption === 'yearly'}
              onChange={(e) => { this.handleChange(e); }}
            />
            yearly
          </label>
        </div>
      </form>
    );
  }
}

RadioInput.propTypes = {
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
};

RadioInput.defaultProps = {
  defaultValue: 'yearly',
  onChange: () => {},
};
