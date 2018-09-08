//@flow
import React from 'react'
import { Badge } from 'reactstrap'

// This component wraps a link around a Bootstrap badge
// It will be placeholder if the link doesn't exist.
const CandidateLinksBadge = ({ text, link }) =>
  link != undefined && link ? (
    <a target="_blank" rel="noopener noreferrer" className="card-links" href={link}>
      <Badge color="primary">{text}</Badge>
    </a>
  ) : (
    // Needed to create a placeholder class to use display: none,
    // which causes the element to basically not exist on the page
    // and take up no space
    <p className="space-fix-placeholder"> </p>
  )

export default CandidateLinksBadge
