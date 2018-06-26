// @flow
import React, { Component } from 'react'
import CandidateCardComponent from './candidateCard'
import { Col } from 'reactstrap'

type Props = {
  candidates: Array<mixed> // TODO: make this more specific
}

const CardCol = ({ children, ...rest }) => (
  <Col xs={{ size: 12 }} md={{ size: 6 }} lg={{ size: 4 }} className="mb-3" {...rest}>
    {children}
  </Col>
)

// component that destructs Props - Props would look like this { candidates: {} }
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
class CandidateListComponent extends Component {
  constructor() {
    super()
    this.state = {
      search: ''
    }
  }
  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value })
  }
  render() {
    const { search } = this.state
    const { candidates } = this.props
    return (
      <div className="candidate-list-box row">
        <form onSubmit={this.handleSubmit}>
          <div className="mdl-textfield mdl-js-textfield">
            <label htmlFor="team" className="mdl-textfield__label">
              Search Candidates:
            </label>
            <input type="text" id="search" value={search} onChange={this.handleChange} />
          </div>
        </form>
        {candidates !== undefined
          ? candidates.map(candidate => {
              return candidate.name.toLowerCase().includes(this.state.search.toLowerCase()) ? (
                <CardCol key={candidate._id}>
                  <CandidateCardComponent candidate={candidate} />
                </CardCol>
              ) : null
            })
          : 'No candidates'}
      </div>
    )
  }
}

export default CandidateListComponent
