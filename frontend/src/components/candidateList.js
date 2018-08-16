// @flow
import { Component } from 'react'
import CandidateCardComponent from './candidateCard'
// <<<<<<< sort-by-filters
// import { Col, Form, FormGroup, Label, Input } from 'reactstrap'
// =======
import { Col, Form, FormGroup, Label, Input, Row } from 'reactstrap'
import withRedux from 'next-redux-wrapper'
import configureStore from './../store/appStore'
import { bindActionCreators } from 'redux'
// >>>>>>> master
import { connect } from 'react-redux'

const CardCol = ({ children, ...rest }) => (
  <Col xs={{ size: 12 }} md={{ size: 6 }} lg={{ size: 4 }} className="mb-3" {...rest}>
    {children}
  </Col>
)

type Props = {
  candidates: Array<mixed>
}

const mapStateToProps = state => ({
  loading: state.candidateListPage.candidatesLoading
})
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
              .filter(candidate =>
                candidate.name.toLowerCase().includes(this.state.search.toLowerCase())
              )
              .map(candidate => {
                return (
                  <CardCol key={candidate._id}>
                    <CandidateCardComponent candidate={candidate} />
                  </CardCol>
                )
              })
          ) : (
            <div>Loading</div>
          )}
        </Row>
      </div>
    )
  }
}

export default connect(mapStateToProps)(CandidateListComponent)
