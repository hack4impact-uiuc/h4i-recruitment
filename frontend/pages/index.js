import { Component } from 'react'
import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'
import CandidateListComponent from '../components/candidateList'
import { getAllCandidates } from '../utils'

class HomePage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      candidates: []
    }
  }
  async componentDidMount () {
    try {
      const { result } = await getAllCandidates()
      this.setState({
        candidates: result
      })
    } catch (err) {
      console.log('Fetching Error: ', err)
      this.setState({
        error: true
      })
    }
  }
  render () {
    return (
      <div>
        <Head title='Home' />
        <Nav />

        <div className='hero'>
          <CandidateListComponent candidates={this.state.candidates} />
        </div>

        <style jsx>{`
          .hero {
            width: 100%;
            color: #333;
          }
          .title {
            margin: 0;
            width: 100%;
            padding-top: 80px;
            line-height: 1.15;
            font-size: 48px;
          }
          .title, .description {
            text-align: center;
          }
          .row {
            max-width: 880px;
            margin: 80px auto 40px;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
          }
          .card {
            padding: 18px 18px 24px;
            width: 220px;
            text-align: left;
            text-decoration: none;
            color: #434343;
            border: 1px solid #9B9B9B;
          }
          .card:hover {
            border-color: #067df7;
          }
          .card h3 {
            margin: 0;
            color: #067df7;
            font-size: 18px;
          }
          .card p {
            margin: 0;
            padding: 12px 0 0;
            font-size: 13px;
            color: #333;
          }
        `}</style>
      </div>
    )
  }
}

export default HomePage
