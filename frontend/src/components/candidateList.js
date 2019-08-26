// @flow
import { Component } from 'react'
import CandidateCardComponent from './candidateCard'
import { Col, Form, FormGroup, Label, Input, Row } from 'reactstrap'
import { connect } from 'react-redux'

type Props = {
  candidates: Array<mixed>,
}

const CardCol = ({ children, ...rest }) => (
  // This handles the size of each card - lg size 3 causes 4 cards/row
  <Col xs={{ size: 12 }} md={{ size: 6 }} lg={{ size: 3 }} className="mb-3" {...rest}>
    {children}
  </Col>
)

const mapStateToProps = state => ({
  loading: state.candidateListPage.candidatesLoading,
})

// component that destructs Props - Props would look like this { candidates: {} }
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
class CandidateListComponent extends Component<Props> {
  constructor() {
    super()
    this.state = {
      search: '',
    }
  }

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value })
  }

  render() {
    const { search } = this.state
    const { candidates } = this.props
    return (
      <>
        <Row>
          <Col sm="12">
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
          </Col>
        </Row>
        <Row className="candidate-list-box">
          {!this.props.loading ? (
            candidates
              .filter(candidate => {
                return (
                  candidate.name &&
                  candidate.name.toLowerCase().includes(this.state.search.toLowerCase())
                )
              })
              .map(candidate => {
                return (
                  <CardCol key={candidate._id}>
                    <CandidateCardComponent candidate={candidate} />
                  </CardCol>
                )
              })
          ) : (
            <>Loading</>
          )}
        </Row>
      </>
    )
  }
}

export default connect(mapStateToProps)(CandidateListComponent)
