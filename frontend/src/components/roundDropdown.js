// @flow
// This Component is used in the interview page
// to choose a candidate to add an interview for
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React, { Fragment, Component } from 'react'
import Select from 'react-select'
import roundData from '../data/roundData.js'
import { setViewedRound, setValidFormat } from '../actions'

const mapStateToProps = state => ({
  viewedRound: state.viewedRound
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setViewedRound,
      setValidFormat
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

  isFormatValid = round => {
    if (round.type != 'interview') {
      return true
    } else if (round.sections === undefined) {
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
    this.props.setViewedRound(selectedOption.value)
    this.props.setValidFormat(this.isFormatValid(roundData.rounds[selectedOption.value]))
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
          value={round_names[this.props.viewedRound]}
        />
      </Fragment>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoundDropdown)