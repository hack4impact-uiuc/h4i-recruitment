import { Component } from 'react'
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap'
import Router from 'next/router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Link from 'next/link'
import RoundDropdown from '../components/roundDropdown'
import { Card, CardBody, CardText, CardTitle } from 'reactstrap'
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

  interpretRounds = () => roundData.rounds[2].questions.map(this.interpretQuestions)

  interpretQuestions = questions =>
    questions.map(this.interpretQuestion).map(cardData => <Card>{cardData}</Card>)

  interpretQuestion = question => {
    switch (question.type) {
      case 'title':
        return <CardTitle>{question.title}</CardTitle>
      case 'text':
        return <CardText>{question.body}</CardText>
      case 'dropdown':
        return 'idk how to make a dropdown'
      case 'prompt':
        return 'write something here: jk idk how to make a prompt box thing'
      default:
        return <h4>{question.type}</h4>
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
