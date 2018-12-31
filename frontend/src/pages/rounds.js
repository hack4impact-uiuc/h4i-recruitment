import { Component } from 'react'
import { Button, Input } from 'reactstrap'
import Router from 'next/router'
import Link from 'next/link'
import { setRound } from '../utils/api'

type Props = {}

// Main app
class Rounds extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      currentRound: ''
    }
  }
  async handleSubmit() {
    const { success } = await setRound(this.state.currentRound)
    if (success) {
      //sessionStorage.setItem('interviewerKey', this.state.currentKey)
      Router.push('/facemash')
    }
  }
  onTextChange = e => {
    this.setState({ currentRound: e.target.value })
  }

  _handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.handleSubmit()
    }
  }

  render() {
    return (
      <div className="align-middle login-box">
        <h4>Enter Key:</h4>
        <Input
          autoFocus={true}
          type="text"
          value={this.state.currentRound}
          onChange={this.onTextChange}
          name="Input Round"
          placeholder="Input the New Round"
          onKeyPress={this._handleKeyPress}
        />
        <Button className="mt-3" color="primary" onClick={this.handleSubmit}>
          Submit Round
        </Button>
      </div>
    )
  }
}
export default Rounds
