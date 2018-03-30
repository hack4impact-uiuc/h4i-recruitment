import Link from 'next/link'

const CandidateListComponent = ({ candidates }) => (
  <ul>
    {
      candidates.map(candidate => (
        <li>
          <Link href={{ pathname: '/candidate', query: { id: candidate.id } }}>
            <a>{candidate.name}</a>
          </Link>
        </li>
      ))
    }
  </ul>
)

export default CandidateListComponent
