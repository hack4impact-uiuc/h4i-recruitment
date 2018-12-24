import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { Container, Row, Card, CardBody, CardTitle, Col } from 'reactstrap'
import { getInterviewingCandidates, getAllInterviews } from '../utils/api'
import CandidateInterviewsModal from '../components/candidates/candidateInterviewsModal'
import { avgInterviewScore } from '../utils/core'
import ActionLink from '../components/actionLink'
import ActionButton from '../components/actionButton'

const CardCol = ({ children, ...rest }) => (
  // This handles the size of each card - lg size 3 causes 4 cards/row
  <Col xs={{ size: 12 }} md={{ size: 6 }} lg={{ size: 3 }} className="mb-3" {...rest}>
    {children}
  </Col>
)
const sortByProperty = function(property) {
  return function(x, y) {
    return x[property] === y[property] ? 0 : x[property] > y[property] ? 1 : -1
  }
}
type Props = {}

class InterviewListPage extends React.Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      candidates: [],
      interviews: [],
      modalOpen: false,
      currentCandidateId: ''
    }
  }
  async componentDidMount() {
    const res = await getInterviewingCandidates()
    const candidates = res.result
    const interviewres = await getAllInterviews()
    const interviews = interviewres.result
    this.setState({
      candidates:
        candidates == undefined ? [] : candidates.sort(sortByProperty('graduationDate')).reverse(),
      interviews: interviews == undefined ? [] : interviews
    })
  }
  toggleModal = candidateId => {
    this.setState({
      currentCandidateId: candidateId,
      modalOpen: !this.state.modalOpen
    })
  }
  render() {
    const { candidates, interviews } = this.state
    const currentCandidate = candidates.find(
      candidate => candidate._id === this.state.currentCandidateId
    )
    return (
      <Container>
        <Row>
          <h4 className="mt-3">Candidates who interviewed</h4>
        </Row>
        <ActionButton text="Back" onClick={Router.back} />
        <Row className="candidate-list-box">
          {candidates.map(
            candidate =>
              candidate.interviews.length === 0 ? null : (
                <CardCol key={candidate._id}>
                  <Card className="candidate-card h-100">
                    <CardTitle style={{ margin: '15px 0 0 0' }}>
                      {candidate.name ? (
                        <>
                          <Link href={{ pathname: '/candidate', query: { id: candidate._id } }}>
                            <a className="m-3 card-title inline">{candidate.name}</a>
                          </Link>
                          <p
                            className="text-muted"
                            style={{
                              float: 'right',
                              marginBottom: 0,
                              paddingRight: '5px',
                              fontSize: '12px'
                            }}
                          >
                            Avg Score: {avgInterviewScore(candidate.interviews)}
                            <br />
                            interviews: {candidate.interviews.length}
                          </p>
                        </>
                      ) : (
                        <></>
                      )}
                    </CardTitle>
                    <CardBody>
                      <p>
                        <b>Graduating: </b>
                        {candidate.graduationDate}
                      </p>
                      {this.state.interviews
                        .filter(interview => interview.candidate_id == candidate._id)
                        .map(interview => (
                          <div className="pb-1">
                            <p className="no-buffer">
                              <b>Interviewer: </b>
                              {interview.interviewer_name}
                            </p>
                            <div style={{ paddingLeft: '5px' }}>
                              <p className="no-buffer">
                                <i>Category: </i> {interview.category}
                                <br />
                                <i>Score: </i> {interview.overall_score}
                              </p>
                            </div>
                          </div>
                        ))}
                      <ActionLink
                        text="View interviews"
                        onClick={() => this.toggleModal(candidate._id)}
                      />
                    </CardBody>
                  </Card>
                </CardCol>
              )
          )}
        </Row>
        <CandidateInterviewsModal
          isOpen={this.state.modalOpen}
          candidateId={this.state.currentCandidateId}
          exitModal={this.toggleModal}
          candidateName={currentCandidate === undefined ? '' : currentCandidate.name}
          interviews={currentCandidate === undefined ? '' : currentCandidate.interviews}
        />
      </Container>
    )
  }
}

export default InterviewListPage
