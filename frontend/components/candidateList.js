import Link from 'next/link'

const CandidateListComponent = ({ candidates }) => (
  <div className='candidate-list-box'>
    {
      candidates !== undefined ?
        candidates.map(candidate => (
          <div className='row candidate-box' key={candidate._id} >
            <Link href={{ pathname: '/candidate', query: { id: candidate._id } }}>
              <a>{candidate.name}</a>
            </Link>
            <p>Major: <span className='highlight'>{candidate.major}</span></p>
            <a style={{textDecoration: candidate.website ? null : 'line-through'}} href={`http://localhost:8080/files/${candidate.resumeID}`}>Resume</a>
            <p>Graduation Date: <span className='highlight'>{candidate.graduationDate}</span></p>
            <p>Role: <span className='highlight'>{candidate.role}</span></p>
            <p>Time Commitment: <span className='highlight'>{candidate.timeCanDevote}</span></p>
          </div>
        )) : 'No candidates'
    }
  </div>
)

export default CandidateListComponent
