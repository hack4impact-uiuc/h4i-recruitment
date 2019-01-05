import { Component } from 'react'
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap'
import Router from 'next/router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Link from 'next/link'
import RoundDropdown from '../components/roundDropdown'
import roundData from '../../../data/roundData.js'
import { setRoundRedux } from '../actions'
import { timingSafeEqual } from 'crypto'

const mapStateToProps = state => ({
  round: state.round
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch)
}

class Rounds extends Component {
  constructor(props) {
    super(props)
  }
  state = {}

  _handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.handleSubmit()
    }
  }

  interpretRounds = () => roundData.rounds[2].questions[0].map(this.interpretRound)

  interpretRound = round => {
    console.log(round.type)
    switch (round.type) {
      default:
        return <h4>{round.type}</h4>
    }
  }

  render() {
    return <div className="align-middle round-box">{this.interpretRounds()}</div>
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Rounds)
