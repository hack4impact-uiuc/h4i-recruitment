//@flow

// This component is an anchor tag in which it
// adds a strikethrough if the link doesn't exist
// and opens the link in a new tab when clicked
const CandidateLinks = ({ text, link }) => (
  <a
    target="_blank"
    rel="noopener noreferrer"
    style={{ textDecoration: link != undefined ? 'None' : 'line-through' }}
    className="pr-2"
    href={link}
  >
    {text}
  </a>
)

export default CandidateLinks
