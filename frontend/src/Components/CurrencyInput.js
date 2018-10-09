import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './CurrencyInput.css'

export default class CurrencyInput extends Component {
	constructor(props) {
		super(props)

		this.state = {
			hasFocus: false,
			value: props.defaultValue,
			valid: true
		}
	}

	handleChange(e) {
		const name = e.target.name
		const value = e.target.value
		const valid = e.target.validity.valid
		this.setState({value, valid})
		if (valid) {
			this.props.onChange({target: {name, value: parseFloat(value)}})
		}
	}

	handleFocus(e) {
		this.setState({
			hasFocus: true
		})
	}

	render() {
		const { defaultValue, name } = this.props
		const { value } = this.state
		const style = {}
		if (!this.state.valid) {
			style.borderColor = 'red';
		}

		return (
			<div className={`currency-input ${defaultValue !== undefined ? 'default-value' : ''}`}>
				<span>£</span>
				<input type="number"
					name={name}
					value={value}
					min="0.00"
					step="0.01"
					style={style}
					onChange={this.handleChange.bind(this)}
					onFocus={this.handleFocus.bind(this)}/>
			</div>
		)
	}
}

CurrencyInput.propTypes = {
	defaultValue: PropTypes.number
}
