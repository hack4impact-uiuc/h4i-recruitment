import { Container, Button, Table, Row } from 'reactstrap'
import { Component } from 'react'
import Router from 'next/router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import VerificationModal from '../components/verificationModal'
import ActionButton from '../components/actionButton'
import { addInterviewSchedule } from '../utils/api'

type Props = {}

const mapStateToProps = state => ({})

class InterviewSchedule extends Component<Props> {
  constructor(props) {
    super(props)
    this.uploadSchedule = this.uploadSchedule.bind(this)
  }

  uploadSchedule(e) {
    e.preventDefault()

    addInterviewSchedule(this.uploadInput.files[0])
  }

  render() {
    return (
      <Container>
        <form onSubmit={this.uploadSchedule}>
          <div>
            <h2>Select CSV file to upload</h2>
            <input
              ref={ref => {
                this.uploadInput = ref
              }}
              type="file"
            />
          </div>
          <button type="submit">Parse Schedule</button>
        </form>
      </Container>
    )
  }
}

export default connect()(InterviewSchedule)
