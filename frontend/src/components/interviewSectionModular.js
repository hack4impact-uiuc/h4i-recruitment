import React, { Component } from 'react'
import { FormGroup, Label, Input } from 'reactstrap'
import InterviewSectionCard from './interviewSectionCard'

class InterviewSectionModular extends Component {
  constructor(props) {
    super(props)
  }

  mapOptionsDropdown = options => {
    return (
      <Input
        onChange={this.onSelect}
        type="select"
        name="Time Commitment"
        id="time-commitment-input"
      >
        {options.map(option => <option value={option.value}>{option.name}</option>)}
      </Input>
    )
  }

  mapOptionsMultipleChoice = options => {
    return options.map(option => (
      <FormGroup check>
        <Label>
          <Input type="radio" value={option.value} onClick={this.onSelect} name={option.name} />
          {option.name}
        </Label>
      </FormGroup>
    ))
  }

  handleNotesChange = e => {
    this.props.response.notes = e.target.value
  }

  onSelect = e => {
    /*
    if (parseInt(e.target.value) == NaN) {
      this.props.response.text = e.target.value
    } else {
      this.props.response.score = e.target.value
    }
    */
    if (e.target.value[0] >= '0' && e.target.value <= '9') {
      this.props.response.score = e.target.value
    } else {
      this.props.response.text = e.target.value
    }
  }

  render() {
    let options = []
    if (this.props.scoreOptions && this.props.textOptions) {
      for (let i = 0; i < this.props.scoreOptions.length; i++) {
        options.push({
          name: this.props.scoreOptions[i] + ' - ' + this.props.textOptions[i],
          value: Number(this.props.scoreOptions[i])
        })
      }
    } else if (this.props.scoreOptions) {
      for (let i = 0; i < this.props.scoreOptions.length; i++) {
        options.push({
          name: this.props.scoreOptions[i],
          value: Number(this.props.scoreOptions[i])
        })
      }
    } else {
      for (let i = 0; i < this.props.textOptions.length; i++) {
        options.push({ name: this.props.textOptions[i], value: this.props.textOptions[i] })
      }
    }
    return (
      <InterviewSectionCard title={this.props.title}>
        {this.props.description ? <pre>{this.props.description}</pre> : null}
        {this.props.prompt ? <pre>{this.props.prompt}</pre> : null}
        {this.props.type == 'dropdown'
          ? this.mapOptionsDropdown(options)
          : this.mapOptionsMultipleChoice(options)}
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
