import { Component } from 'react'
import Router from 'next/router'
import { getCandidateById } from '../utils'

class CandidatesPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      form: { }
    }
  }
  static async getInitialProps ({ query }) {
    // check whether query.id is real candidate
    return { query }
  }
  async componentDidMount () {
    const { data, err } = await getCandidateById(this.props.query.id)
    console.log('data: ', data)
  }
  render () {
    return (
      <div>
        <h2>{this.props.query ? this.props.query.id : 'user does not exist' }</h2>
      </div>
    )
  }
}

export default CandidatesPage
