import React, { Component } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { Container, Row, Card, CardBody, CardTitle, Col } from 'reactstrap'
import {
  getInterviewingCandidates,
  getAllInterviews,
  getAllInterviewingCandidateInterviews,
} from '../utils/api'
import CandidateInterviewsModal from '../components/candidates/candidateInterviewsModal'
import { avgInterviewScore, interviewGetCategorySection } from '../utils/core'
import { ActionLink, ActionButton } from '../components/common'
import Nav from '../components/nav'
import Head from '../components/head'
import roundData from '../data/roundData'

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

class InterviewListPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      candidates: [],
      interviews: [],
      modalOpen: false,
      currentCandidateId: '',
      byCategory: false,
      interviewingInterviews: [],
    }
  }

  async componentDidMount() {
    const res = await getInterviewingCandidates()
    const candidates = res.result
    const interviewres = await getAllInterviews()
    const interviews = interviewres.result
    const interviewingInterviews = await getAllInterviewingCandidateInterviews()
    const interviewingInterviewsres = interviewingInterviews.result
    this.setState({
      candidates:
        candidates == undefined ? [] : candidates.sort(sortByProperty('graduationDate')).reverse(),
      interviews: interviews == undefined ? [] : interviews,
      interviewingInterviews:
        interviewingInterviewsres == undefined ? [] : interviewingInterviewsres,
    })
  }

  toggleModal = candidateId => {
    this.setState({
      currentCandidateId: candidateId,
      modalOpen: !this.state.modalOpen,
    })
  }

  toggleShowByCategory = () => {
    this.setState({
      byCategory: !this.state.byCategory,
    })
  }

  render() {
    const { candidates } = this.state
    const currentCandidate = candidates.find(
      candidate => candidate._id === this.state.currentCandidateId
    )

    return (
      <>
        <Head title="My Interviews" />
        <Nav />
        <Container>
          <Row>
            <h3 className="mt-3">Candidates who interviewed</h3>
          </Row>
          <ActionButton text="Back" onClick={Router.back} />
          <ActionButton
            className="ml-3"
            text="Show by Category"
            onClick={this.toggleShowByCategory}
          />

          {this.state.byCategory ? (
            <Row className="mt-4">
              <Container>
                {roundData.rounds[2].sections
                  .slice(-1)[0]
                  .textOptions.reverse()
                  .map(category => (
                    <Row>
                      <Container>
                        <Row>
                          <h5 style={{ display: 'block' }}>Candidates in {category}</h5>
                        </Row>
                        <div className="m-2">
                          {this.state.interviewingInterviews.map(interview =>
                            interviewGetCategorySection(interview) !== null &&
                            interviewGetCategorySection(interview).response.text === category ? (
                              <li>
                                <Link
                                  href="/candidate/[cid]"
                                  as={`/candidate/${interview.candidate_id}`}
                                >
                                  {interview.candidate_name}
                                </Link>
                              </li>
                            ) : null
                          )}
                        </div>
                      </Container>
                    </Row>
                  ))}
              </Container>
            </Row>
          ) : (
            <Row className="candidate-list-box">
              {currentCandidate && (
                <CandidateInterviewsModal
                  isOpen={this.state.modalOpen}
                  candidateId={currentCandidate === undefined ? '' : currentCandidate._id}
                  exitModal={this.toggleModal}
                  candidateName={currentCandidate === undefined ? '' : currentCandidate.name}
                />
              )}
              {candidates.map(candidate =>
                candidate.interviews.length === 0 ? null : (
                  <>
                    <CardCol key={candidate._id}>
                      <Card className="candidate-card h-100">
                        <CardTitle style={{ margin: '15px 0 0 0' }}>
                          {candidate.name && (
                            <>
                              <Link href="/candidate/[cid]" as={`/candidate/${candidate._id}`}>
                                <a className="m-3 card-title inline">{candidate.name}</a>
                              </Link>
                              <p
                                className="text-muted"
                                style={{
                                  float: 'right',
                                  marginBottom: 0,
                                  paddingRight: '5px',
                                  fontSize: '12px',
                                }}
                              >
                                Avg Score: {avgInterviewScore(candidate.interviews)}
                                <br />
                                interviews: {candidate.interviews.length}
                              </p>
                            </>
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
                  </>
                )
              )}
            </Row>
          )}
        </Container>
      </>
    )
  }
}

export default InterviewListPage
