// @flow
// This Component is used in the interview page
// to choose a candidate to add an interview for
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React, { Fragment, Component } from 'react'
import Select from 'react-select'
import { addInterviewCandidate } from '../actions'

type Props = {
  candidates: Array<mixed>,
}

type State = {
  isClearable: boolean,
  isSearchable: boolean,
}

const mapStateToProps = state => ({
  loading: state.candidateListPage.candidatesLoading,
  candidateId: state.interview.candidateId,
  candidateName: state.interview.candidateName,
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addInterviewCandidate,
    },
    dispatch
  )
}

// this component is used in the interview page for the user to choose candidate
class CandidateDropdown extends Component<Props, State> {
  state = {
    isClearable: false,
    isSearchable: true,
    selectedOption: null,
  }

  constructor(props) {
    super(props)
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption: selectedOption })
    let chosenCandidate = null
    for (var i = 0; i < this.props.candidates.length; i++) {
      if (this.props.candidates[i].name === selectedOption.value) {
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
    const { selectedOption } = this.state
    const { candidates } = this.props

    return (
      <Select
        options={candidates.map(candidate => ({ value: candidate.name, label: candidate.name }))}
        onChange={this.handleChange}
        value={selectedOption}
      />
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CandidateDropdown)
