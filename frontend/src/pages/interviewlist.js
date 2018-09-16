import React from 'react'
import Link from 'next/link'
import { Container, Row, Card, CardBody, CardTitle, Col } from 'reactstrap'
import { getInterviewingCandidates, getAllInterviews } from '../utils/api'

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
      interviews: []
    }
  }
  async componentDidMount() {
    const res = await getInterviewingCandidates()
    console.log(res)
    const candidates = res.result
    const interviewres = await getAllInterviews()
    const interviews = interviewres.result
    this.setState({
      candidates:
        candidates == undefined ? [] : candidates.sort(sortByProperty('graduationDate')).reverse(),
      interviews: interviews == undefined ? [] : interviews
    })
  }
  render() {
    const { candidates, interviews } = this.state
    console.log(interviews)
    return (
      <Container>
        <Row>
          <h4 className="mt-3">Candidates who interviewed</h4>
        </Row>
        <Row className="candidate-list-box">
          {candidates.map(candidate => (
            <CardCol key={candidate._id}>
              <Card className="candidate-card h-100">
                <CardTitle>
                  {candidate.name ? (
                    <Link href={{ pathname: '/candidate', query: { id: candidate._id } }}>
                      <a className="m-3 card-title inline">{candidate.name}</a>
                    </Link>
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
                      <>
                        <p>
                          <b>Category: </b>
                          {interview.category}
                        </p>
                        <p>
                          <b>Score: </b> {interview.overall_score}
                        </p>
                        <p>
                          <b>Interviewer: </b> {interview.interviewer_name}
                        </p>
                      </>
                    ))}
                </CardBody>
              </Card>
            </CardCol>
          ))}
        </Row>
      </Container>
    )
  }
}

export default InterviewListPage
