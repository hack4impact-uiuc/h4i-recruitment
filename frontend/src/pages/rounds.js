import { Component } from 'react'
import { Button, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import Router from 'next/router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Link from 'next/link'
import { getRound, setRound } from '../utils/api'
import RoundDropdown from '../components/roundDropdown'
import roundData from '../../../data/roundData.js'
import { setRoundRedux } from '../actions'

const mapStateToProps = state => ({
  round: state.round,
  selectedRound: state.selectedRound
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setRoundRedux
    },
    dispatch
  )
}

class Rounds extends Component {
  constructor(props) {
    super(props)
  }
  async changeRound() {
    this.props.setRoundRedux(this.props.selectedRound)
    const { success } = await setRound(this.props.selectedRound)
    if (success) {
      sessionStorage.setItem('currentRound', this.props.selectedRound)
      Router.push('/dashboard')
    }
  }

  _handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.handleSubmit()
    }
  }

  render() {
    return (
      <div className="align-middle login-box">
        <h3>Current Round: {roundData.rounds[this.props.round].name}</h3>
        <br />
        <h4>See round structure below:</h4>
        <RoundDropdown />
        <pre>{JSON.stringify(roundData.rounds[this.props.selectedRound], null, '\t')}</pre>
        <Button className="mt-3" color="primary" onClick={this.changeRound.bind(this)}>
          Submit Round
        </Button>
      </div>
    )
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Rounds)
