import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class RadioInput extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedOption: props.defaultValue
    }
  }

  handleChange({ target: { value } }) {
    this.setState({selectedOption: value})
    this.props.onChange(value)
  }

  render() {
    const {selectedOption} = this.state

    return (
      <form>
        <div>
          <label>
            <input
              type="radio"
              value="monthly"
              checked={selectedOption === "monthly"}
              onChange={this.handleChange.bind(this)}
            />
            monthly
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              value="quarterly"
              checked={selectedOption === "quarterly"}
              onChange={this.handleChange.bind(this)}
            />
             quarterly
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              value="yearly"
              checked={selectedOption === "yearly"}
              onChange={this.handleChange.bind(this)}
            />
            yearly
          </label>
        </div>
      </form>
    )
  }

}

RadioInput.propTypes = {
  defaultValue: PropTypes.string
}
