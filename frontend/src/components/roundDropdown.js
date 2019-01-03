// @flow
// This Component is used in the interview page
// to choose a candidate to add an interview for
import withRedux from 'next-redux-wrapper'
import configureStore from './../store/appStore'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React, { Fragment, Component } from 'react'
import Select from 'react-select'
import roundData from '../../../data/roundData.js'
import { setSelectedRound } from '../actions'

const mapStateToProps = state => ({
  round: state.round
})

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

  render() {
    var round_names = []
    for (var i = 0; i < roundData.numberRounds; i++) {
      let curr_round = roundData.rounds[i]
      let curr_round_label = {
        value: i,
        label: curr_round.name.toString()
      }
      round_names.push(curr_round_label)
    }
    return (
      <Fragment>
        <Select
          placeholder={roundData.rounds[this.props.round].name}
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
