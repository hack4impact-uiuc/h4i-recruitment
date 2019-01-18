import React, { Component } from 'react'
import InterviewSectionCard from './interviewSectionCard'

mapOptions = options => {
  options.map(option => (
    <FormGroup check>
      <Label>
        <Input type="radio" value={option.value} onClick={this.onSelect} name={option.name} />
        {option.text}
      </Label>
    </FormGroup>
  ))
}

class MultipleChoiceInterview extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <InterviewSectionCard title={this.props.title}>
        {this.props.body}
        {mapOptions(this.props.options)}
      </InterviewSectionCard>
    )
  }
}

export default MultipleChoiceInterview
