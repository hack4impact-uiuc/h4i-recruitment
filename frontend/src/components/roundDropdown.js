// @flow
// This Component is used in the interview page
// to choose a candidate to add an interview for
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React, { Fragment, Component } from 'react'
import Select from 'react-select'
import roundData from '../../data/roundData.js'
import { setSelectedRound } from '../actions'

const mapStateToProps = state => {}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setSelectedRound
    },
    dispatch
  )
}

class RoundDropdown extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    selectedOption: ''
  }
  handleChange = selectedOption => {
    this.setState({ selectedOption: selectedOption })
    this.props.setSelectedRound(selectedOption.value)
  }

  getRoundInfo = (round, index) => {
    return { value: index, label: round.name }
  }

  render() {
    var round_names = []
    var round_names = roundData.rounds.map(this.getRoundInfo)
    return (
      <Fragment>
        <Select
          placeholder="View round structure..."
          options={round_names}
          onChange={this.handleChange}
          value={this.state.selectedOption}
        />
      </Fragment>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoundDropdown)
