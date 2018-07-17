// @flow
import { Component } from 'react'
import CandidateCardComponent from './candidateCard'
import { Col, Form, FormGroup, Label, Input } from 'reactstrap'

type Props = {
  candidates: Array<mixed> // TODO: make this more specific
}

const CardCol = ({ children, ...rest }) => (
  <Col xs={{ size: 12 }} md={{ size: 6 }} lg={{ size: 4 }} className="mb-3" {...rest}>
    {children}
  </Col>
)

type Props = {
  candidates: Array<mixed>
}
// component that destructs Props - Props would look like this { candidates: {} }
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
class CandidateListComponent extends Component<Props> {
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
      <div>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label htmlFor="search" />
            <Input
              type="search"
              id="search"
              value={search}
              placeholder="Search Candidates"
              onChange={this.handleChange}
            />
          </FormGroup>
        </Form>
        <div className="candidate-list-box row">
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
      </div>
    )
  }
}

export default CandidateListComponent
