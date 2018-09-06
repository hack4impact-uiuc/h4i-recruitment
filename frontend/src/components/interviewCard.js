import React from 'react'
import { Card, CardBody, CardText, CardTitle } from 'reactstrap'

const InterviewCard = ({ title, children }) => (
  <Card className="interview-card">
    <CardBody>
      <CardTitle>{title}</CardTitle>
      {children}
    </CardBody>
  </Card>
)

export default InterviewCard
