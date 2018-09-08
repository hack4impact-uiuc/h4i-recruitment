import React from 'react'
import { Card, CardBody, CardText, CardTitle } from 'reactstrap'

const InterviewSectionCard = ({ title, children }) => (
  <Card className="interview-card">
    <CardBody>
      <CardTitle>{title}</CardTitle>
      {children}
    </CardBody>
  </Card>
)

export default InterviewSectionCard
