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
            <a style={{textDecoration: candidate.resumeID ? null : 'line-through'}} href={`${candidate.resumeID}`}>Resume</a>
            <a style={{textDecoration: candidate.website ? null : 'line-through'}} href={`${candidate.website}`}>Website</a>
            <p><span className='highlight'>{candidate.graduationDate}</span></p>
            <p><span className='highlight'>{candidate.role}</span></p>
            <p><span className='highlight'>{candidate.timeCanDevote}</span></p>
          </div>
        )) : 'No candidates'
    }
  </div>
)

export default CandidateListComponent
