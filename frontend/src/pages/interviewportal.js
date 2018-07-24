import { Button, Container } from 'reactstrap'
import { Component } from 'react'
import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'

type Props = {}

// Main app
class Login extends Component<Props> {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Container>
        <Head title="Interview Portal" />
        <Nav />
        <Link prefetch href="/interview">
          <Button color="primary">New Interview</Button>
        </Link>{' '}
        <Button color="primary">Edit Interview</Button>
      </Container>
    )
  }
}
export default Login
