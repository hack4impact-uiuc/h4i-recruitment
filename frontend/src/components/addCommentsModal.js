import React from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, FormText } from 'reactstrap'

type Props = {}

class AddCommentsModalComponent extends React.Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      inputText: ''
    }
  }
  handleChange = e => {
    this.setState({
      inputText: e.target.value
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
  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle}>Add Comment</ModalHeader>
        <ModalBody>
          <Input
            type="textarea"
            value={this.state.inputText}
            name="text"
            id="comment-input"
            style={{ height: 200, wordBreak: 'break-word' }}
            onChange={this.handleChange}
          />
          <FormText color="muted">Write down whatever your heart desires!</FormText>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.submit}>
            Submit
          </Button>{' '}
          <Button color="secondary" onClick={this.cancel}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default AddCommentsModalComponent
