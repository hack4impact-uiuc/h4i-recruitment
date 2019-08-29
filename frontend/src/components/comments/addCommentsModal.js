import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, FormText } from 'reactstrap'

class AddCommentsModalComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputText: '',
    }
  }
  handleChange = e => {
    this.setState({
      inputText: e.target.value,
    })
  }
  cancel = e => {
    this.setState({ inputText: '' })
    this.props.toggle()
  }
  submit = e => {
    this.props.submit(this.state.inputText)
    this.setState({ inputText: '' })
  }

  /***  commented out feature for future
  // handles when user presses "Enter" when input is focused
  _handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.submit()
    }
  } */

  render() {
    return (
      <Modal autoFocus={false} isOpen={this.props.isOpen} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle}>Add Comment</ModalHeader>
        <ModalBody>
          <Input
            autoFocus={true}
            ref={input => input && input.focus()}
            type="textarea"
            className="textarea-input"
            value={this.state.inputText}
            name="text"
            id="comment-input"
            style={{ height: 200, wordBreak: 'break-word' }}
            onChange={this.handleChange}
            onKeyPress={this._handleKeyPress}
          />
          <FormText color="muted">Write down whatever your heart desires!</FormText>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.submit}>
            Submit
          </Button>
          <Button color="secondary" onClick={this.cancel}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default AddCommentsModalComponent
