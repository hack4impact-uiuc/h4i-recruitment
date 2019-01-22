import { Component } from 'react'
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap'
import Router from 'next/router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setRound } from '../utils/api'
import RoundDropdown from '../components/roundDropdown'
import roundData from '../data/roundData.js'
import { setRoundRedux } from '../actions'

const mapStateToProps = state => ({
  round: state.round,
  viewedRound: state.viewedRound,
  validFormat: state.validFormat
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
  state = {
    modalOpen: false
  }

  async changeRound() {
    const { success } = await setRound(this.props.viewedRound)
    if (success) {
      this.props.setRoundRedux(this.props.viewedRound)
      sessionStorage.setItem('currentRound', this.props.viewedRound)
      Router.push('/dashboard')
    } else {
      this.setState({ modalOpen: true })
    }
  }

  _handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.handleSubmit()
    }
  }

  closeModal = () => {
    this.setState({ modalOpen: false })
  }

  render() {
    return (
      <div className="align-middle round-box">
        <Modal isOpen={this.state.modalOpen} autoFocus={false}>
          <ModalBody>User doesn&#39;t have the privileges to change rounds.</ModalBody>
          <ModalFooter>
            <Button onClick={this.closeModal} color="primary">
              Return
            </Button>
          </ModalFooter>
        </Modal>
        <h3>Current Round: {roundData.rounds[this.props.round].name}</h3>
        <br />
        <RoundDropdown />
        <br />
        <pre>{JSON.stringify(roundData.rounds[this.props.viewedRound], null, '\t')}</pre>
        <br />
        <Button
          className="mt-3"
          color="primary"
          onClick={this.changeRound.bind(this)}
          disabled={!this.props.validFormat}
        >
          {this.props.validFormat
            ? 'Change Round (Directors Only)'
            : 'Invalid round format. Please contact the directors to change roundData.js'}
        </Button>
      </div>
    )
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Rounds)