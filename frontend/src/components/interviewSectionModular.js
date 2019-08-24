import React, { Component } from 'react'
import { FormGroup, Label, Input } from 'reactstrap'
import InterviewSectionCard from './interview/interviewSectionCard'

class InterviewSectionModular extends Component {
  constructor(props) {
    super(props)
  }

  mapOptionsDropdown = options => {
    return (
      <Input
        onChange={this.onSelect}
        type="select"
        name={this.props.title}
        id={`${this.props.title}-title`}
      >
        <option selected disabled hidden>
          {this.props.dropdownPrompt}
        </option>
        {options.map(option => (
          <option value={option.value}>{option.name}</option>
        ))}
      </Input>
    )
  }

  mapOptionsMultipleChoice = options => {
    return options.map(option => (
      <FormGroup check>
        <Label>
          <Input
            type="radio"
            value={option.value}
            onClick={this.onSelect}
            name={this.props.title}
          />
          {option.name}
        </Label>
      </FormGroup>
    ))
  }

  handleNotesChange = e => {
    this.props.response.notes = e.target.value
  }

  onSelect = e => {
    if (e.target.value[0] >= '0' && e.target.value <= '9') {
      this.props.response.score = e.target.value
    } else {
      this.props.response.text = e.target.value
    }
  }

  render() {
    if (this.props.response === undefined) {
      return (
        <p>
          This section <b>{this.props.title}</b> needs a response field. Check `roundData.js`
        </p>
      )
    }

    let options = []
    if (this.props.scoreOptions && this.props.textOptions) {
      for (let i = 0; i < this.props.scoreOptions.length; i++) {
        options.push({
          name: this.props.scoreOptions[i] + ' - ' + this.props.textOptions[i],
          value: Number(this.props.scoreOptions[i]),
        })
      }
    } else if (this.props.scoreOptions) {
      for (let i = 0; i < this.props.scoreOptions.length; i++) {
        options.push({
          name: this.props.scoreOptions[i],
          value: Number(this.props.scoreOptions[i]),
        })
      }
    } else if (this.props.textOptions) {
      for (let i = 0; i < this.props.textOptions.length; i++) {
        options.push({ name: this.props.textOptions[i], value: this.props.textOptions[i] })
      }
    }
    return (
      <InterviewSectionCard title={this.props.title}>
        {this.props.description && (
          <>
            {this.props.description}
            <br /> <br />
          </>
        )}

        {this.props.prompt && (
          <>
            {this.props.prompt} <br /> <br />
          </>
        )}

        {this.props.type !== 'notes' &&
          (this.props.type === 'dropdown'
            ? this.mapOptionsDropdown(options)
            : this.mapOptionsMultipleChoice(options))}

        {this.props.type !== 'notes' && this.props.notesPrompt && (
          <>
            <br />
          </>
        )}

        {(this.props.notesPrompt || this.props.type === 'notes') && (
          <Input
            style={{ height: '130px' }}
            value={this.props.notes}
            className="textarea-input"
            onChange={this.handleNotesChange}
            type="textarea"
            id={`${this.props.title}-input`}
            placeholder={this.props.notesPrompt}
          />
        )}
      </InterviewSectionCard>
    )
  }
}

export default InterviewSectionModular
