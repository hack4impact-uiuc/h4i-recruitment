import Link from 'next/link'

/* Quick Link to interview guide for round, interview tips, and candidate profile */
const InterviewQuickLinks = ({ candidateID, candidateName, interviewGuideLink }) => (
  <>
    Some quick links:
    <ul>
      {candidateName !== '' && candidateID !== '' && (
        <li>
          <Link href="/candidate/[cid]" as={`/candidate/${candidateID}`}>
            <a target="_blank" rel="noopener noreferrer">
              {candidateName}&#39;s Page
            </a>
          </Link>
        </li>
      )}
      <li>
        <a target="_blank" rel="noopener noreferrer" href={interviewGuideLink}>
          Interview Guide
        </a>
      </li>
      <li>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://docs.google.com/document/d/1119YvTWvh58L7eOy-FvVvLyb9wLzZLImQSPBO3yPszI/edit"
        >
          Interview Tips
        </a>
      </li>
    </ul>
  </>
)

export default InterviewQuickLinks
