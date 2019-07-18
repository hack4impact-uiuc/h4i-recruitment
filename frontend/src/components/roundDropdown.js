// @flow
// This Component is used in the interview page
// to choose a candidate to add an interview for
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React, { Fragment, Component } from 'react'
import Select from 'react-select'
import roundData from '../data/roundData.js'
import { setSelectedRound, setValidFormat } from '../actions'

const mapStateToProps = state => {}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setSelectedRound,
      setValidFormat,
    },
    dispatch
  )
}

class RoundDropdown extends Component {
  state = {
    selectedOption: '',
  }

  constructor(props) {
    super(props)
  }

  isFormatValid = round => {
    if (round.type != 'interview') {
      return true
    } else if (round.sections === undefined || round.scored === undefined) {
      return false
    } else {
      let sections = round.sections
      for (let i = 0; i < sections.length; i++) {
        let section = sections[i]
        if (
          section.title === undefined ||
          section.type === undefined ||
          (section.type !== 'notes' &&
            section.scoreOptions === undefined &&
            section.textOptions === undefined) ||
          section.response === undefined
        ) {
          return false
        } else if (
          section.scoreOptions !== undefined &&
          section.textOptions !== undefined &&
          section.scoreOptions.length != section.textOptions.length
        ) {
          return false
        }
      }
      return true
    }
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption: selectedOption })
    this.props.setSelectedRound(selectedOption.value)
    this.props.setValidFormat(this.isFormatValid(roundData.rounds[selectedOption.value]))
  }

  getRoundInfo = (round, index) => {
    return { value: index, label: round.name }
  }

  render() {
    var round_names = []
    var round_names = roundData.rounds.map(this.getRoundInfo)
    return (
      <>
        <Select
          placeholder="View round structure..."
          options={round_names}
          onChange={this.handleChange}
          value={this.state.selectedOption}
        />
      </>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoundDropdown)
