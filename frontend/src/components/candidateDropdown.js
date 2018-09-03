// @flow
import withRedux from 'next-redux-wrapper'
import configureStore from './../store/appStore'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Row } from 'reactstrap'
import React, { Fragment, Component } from 'react'
import Select from 'react-select'
import { addInterviewCandidate } from '../actions'

type Props = {
  candidates: Array<mixed>
}

const mapStateToProps = state => ({
  loading: state.candidateListPage.candidatesLoading,
  candidateId: state.interview.candidateId,
  candidateName: state.interview.candidateName
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addInterviewCandidate
    },
    dispatch
  )
}

type State = {
  isClearable: boolean,
  isSearchable: boolean
}

// this component is used in the interview page for the user to choose candidate
class CandidateDropdown extends Component<Props, State> {
  constructor(props) {
    super(props)
  }
  state = {
    isClearable: false,
    isSearchable: true,
    selectedOption: null
  }
  handleChange = selectedOption => {
    this.setState({ selectedOption: selectedOption })
    let chosenCandidate = null
    for (var i = 0; i < this.props.candidates.length; i++) {
      if (this.props.candidates[i].name == selectedOption.value) {
        chosenCandidate = this.props.candidates[i]
      }
    }
    const { addInterviewCandidate } = this.props
    addInterviewCandidate(chosenCandidate._id, chosenCandidate.name)
  }

  componentDidMount() {
    const { candidateName } = this.props
    if (candidateName != '') {
      let newSelectedOption = { value: candidateName, label: candidateName }
      this.setState({ selectedOption: newSelectedOption })
    }
  }
  render() {
    const { isClearable, isSearchable, selectedOption } = this.state
    const { candidates } = this.props
    var candidate_names = []
    for (var i = 0; i < candidates.length; i++) {
      let curr_cand = this.props.candidates[i]
      let curr_name_label = { value: curr_cand.name.toString(), label: curr_cand.name.toString() }
      candidate_names.push(curr_name_label)
    }
    return (
      <Fragment>
        <Select
          defaultValue={candidate_names[0]}
          options={candidate_names}
          onChange={this.handleChange}
          value={selectedOption}
        />
      </Fragment>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CandidateDropdown)
