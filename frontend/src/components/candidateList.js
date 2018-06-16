// @flow
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

const CandidateListComponent = ({ candidates }: Props) => (
  <div className="candidate-list-box row">
    {candidates !== undefined
      ? candidates.map(candidate => (
          <CardCol key={candidate._id}>
            <CandidateCardComponent candidate={candidate} />
          </CardCol>
        ))
      : 'No candidates'}
  </div>
)

export default CandidateListComponent
