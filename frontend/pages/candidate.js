import { Component } from 'react'
import Router from 'next/router'

class CandidatesPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      form: { }
    }
  }
  static async getInitialProps ({ query }) {
    // check whether query.id is real candidate
    // const res = await fetch('backend url to check whether candidate exists')
    return { query }
  }
  render () {
    console.log(this.props.url)
    return (
      <div>
        <h2>{this.props.query ? this.props.query.id : 'user does not exist' }</h2>
      </div>
    )
  }
}

export default CandidatesPage
