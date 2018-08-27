import { Container, Button, Table } from 'reactstrap'
import { Component } from 'react'
import Router from 'next/router'
import { editInterview } from './../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getPastInterviews } from '../utils/api'
type Props = {}

const mapStateToProps = state => ({})

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      editInterview
    },
    dispatch
  )
}

// Main app
class PastInterviews extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      interviews: []
    }
  }

  async componentDidMount() {
    const { result } = await getPastInterviews(localStorage.getItem('interviewerKey'))
    if (result) {
      this.setState({ interviews: result })
    }
  }

  async handleEditInterview(interview) {
    if (interview) {
      const { editInterview } = this.props
      await editInterview(interview)
      Router.push('/interview')
    }
  }

  render() {
    let interviews = this.state.interviews
    return (
      <Container>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Candidate Name</th>
              <th>Interview Overall Score</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {interviews ? (
              interviews.map((interview, i) => {
                console.log('DIS INTER', interview)
                return [
                  <tr key={i}>
                    <td>{i}</td>
                    <td>{interview.candidate_name}</td>
                    <td>{interview.overall_score}</td>
                    <td>
                      <Button onClick={() => this.handleEditInterview(interview)}>
                        Edit Interview
                      </Button>
                    </td>
                  </tr>
                ]
              })
            ) : (
              <tr>No Interviews</tr>
            )}
          </tbody>
        </Table>
      </Container>
    )
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PastInterviews)
