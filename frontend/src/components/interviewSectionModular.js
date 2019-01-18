import React, { Component } from 'react'
import InterviewSectionCard from './interviewSectionCard'

mapOptionsDropdown = options => {
  return (
    <Input onChange={this.onSelect} type="select" name="Time Commitment" id="time-commitment-input">
      {options.map(option => <option value={option.value}>{option.name}</option>)}
    </Input>
  )
}

mapOptionsMultipleChoice = options => {
  return options.map(option => (
    <FormGroup check>
      <Label>
        <Input type="radio" value={option.value} onClick={this.onSelect} name={option.name} />
      </Label>
    </FormGroup>
  ))
}

class InterviewSectionModular extends Component {
  constructor(props) {
    super(props)
  }

  handleNotesChange = e => {
    this.props.notes = e.target.value
  }

  onSelect = e => {
    if (typeof e.target.value == 'number') {
      this.props.score = e.target.value
      this.props.response = ''
    } else {
      this.props.response = e.target.value
      this.props.score = 0
    }
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
        {this.props.type == 'dropdown'
          ? mapOptionsDropdown(options)
          : mapOptionsMultipleChoice(options)}
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

export default InterviewSectionModular
