// @flow
import { Component } from 'react'
import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'
import CandidateListComponent from '../components/candidateList'
import { getAllCandidates } from '../utils/api'
import {
  Container,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Row
} from 'reactstrap'

type Props = {
  result: {}
}

class HomePage extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      candidates: [],
      dropdownOpen: false
    }
  }
  static async getInitialProps({ query }) {
    // check whether query.id is real candidate
    try {
      const { result } = await getAllCandidates()
      if (result === undefined) {
        return { error: 'Bad Request' }
      }
      return { result }
    } catch (err) {
      console.error('Candidate Page error: ', err.message)
      return { error: 'Bad Request' }
    }
  }
  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }))
  }
  render() {
    if (this.props.error) {
      return <div>Bad Fetch. Try again</div>
    }
    return (
      <Container style={{ padding: '0 30px 0 30px' }}>
        <Head title="Home" />
        <Nav />
        <h1>Hack4Impact Recruitment Portal</h1>
        <Row>
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret>Categorize</DropdownToggle>
            <DropdownMenu>
              <DropdownItem>Year</DropdownItem>
              <DropdownItem>Major</DropdownItem>
              <DropdownItem>Application Role</DropdownItem>
              <DropdownItem>Interviewed</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <CandidateListComponent candidates={this.props.result} />
        </Row>
      </Container>
    )
  }
}

export default HomePage
