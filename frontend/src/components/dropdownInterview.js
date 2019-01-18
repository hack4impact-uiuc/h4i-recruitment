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
        <FormGroup>
            <Label>{this.props.formLabel}</Label>
            <Input
            value={/* I'm not sure how to set the value */}
            onChange={this.onSelect}
            name={this.props.name}
            id={this.props.id}>
                {this.mapOptions(this.props.options)}
            </Input>
        </FormGroup>
      </InterviewSectionCard>
    )
  }
}

export default MultipleChoiceInterview
