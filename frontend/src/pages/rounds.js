import { Component } from 'react'
import { Button, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import Router from 'next/router'
import Link from 'next/link'
import { getRound, setRound } from '../utils/api'

type Props = {}

// Main app
class Rounds extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      round: getRound().round
    }
  }
  async handleSubmit() {
    const { success } = await setRound(this.state.round)
    if (success) {
      sessionStorage.setItem('currentRound', this.state.round)
      Router.push('/dashboard')
    }
  }
  onTextChange = e => {
    this.setState({ round: e.target.value })
  }

  _handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.handleSubmit()
    }
  }

  render() {
    return (
      <div className="align-middle login-box">
        <h4>Enter Round:</h4>
        <Input
          autoFocus={true}
          type="text"
          value={this.state.round}
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
