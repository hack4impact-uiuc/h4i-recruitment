import Link from 'next/link'

const CandidateListComponent = ({ candidates }) => (
  <ul>
    {
      candidates !== undefined ?
        candidates.map(candidate => (
          <li key={candidate._id} >
            <Link href={{ pathname: '/candidate', query: { id: candidate._id } }}>
              <a>{candidate.name}</a>
            </Link>
          </li>
        )) : 'No candidates'
    }
  </ul>
)

export default CandidateListComponent
