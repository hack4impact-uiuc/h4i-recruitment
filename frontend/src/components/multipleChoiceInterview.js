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
    let options = []
    if (this.props.scoreOptions && this.props.textOptions) {
      for (i = 0; i < this.props.scoreOptions.length; i++) {
        options.push({
          name: this.props.scoreOptions[i] + ' - ' + this.props.textOptions[i],
          value: this.props.scoreOptions[i]
        })
      }
    } else if (this.props.scoreOptions) {
      for (i = 0; i < this.props.scoreOptions.length; i++) {
        options.push({ name: this.props.scoreOptions[i], value: this.props.scoreOptions[i] })
      }
    } else {
      for (i = 0; i < this.props.textOptions.length; i++) {
        options.push({ name: this.props.textOptions[i], value: this.props.textOptions[i] })
      }
    }
    return (
      <InterviewSectionCard title={this.props.title}>
        {this.props.description ? <p>{this.props.description}</p> : null}
        {this.props.prompt ? <p>{this.props.prompt}</p> : null}
        {mapOptions(options)}
      </InterviewSectionCard>
    )
  }
}

export default MultipleChoiceInterview
