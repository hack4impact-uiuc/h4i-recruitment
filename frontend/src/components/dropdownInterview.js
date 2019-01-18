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

  handleNotesChange = e => {
    this.props.notes = e.target.value
  }

  render() {
    let options = []
    if (this.props.scoreOptions && this.props.textOptions) {
      for (i = 0; i < this.props.scoreOptions.length; i++) {
        options.push(this.props.scoreOptions[i] + this.props.textOptions[i])
      }
    } else if (this.props.scoreOptions) {
      options = scoreOptions
    } else {
      options = textOptions
    }
    return (
      <InterviewSectionCard title={this.props.title}>
        {this.props.description ? <p>{this.props.description}</p> : null}
        {this.props.prompt ? <p>{this.props.prompt}</p> : null}
        <FormGroup>
          <Label>{this.props.formLabel}</Label>
          <Input
            value={'temp' /* I'm not sure how to set the value */}
            onChange={this.onSelect}
            name={this.props.name}
            id={this.props.id}
          >
            {this.mapOptions(options)}
          </Input>
        </FormGroup>
        {this.props.notesPrompt ? (
          <Input
            style={{ height: '130px' }}
            value={this.props.notes}
            className="textarea-input"
            onChange={this.handleNotesChange}
            type="textarea"
            id="time-commitment-explanation"
            placeholder={this.props.notesPrompt}
          />
        ) : null}
      </InterviewSectionCard>
    )
  }
}

export default MultipleChoiceInterview
