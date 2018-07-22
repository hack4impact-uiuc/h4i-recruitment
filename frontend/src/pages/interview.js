import { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import Head from '../components/head'
import Nav from '../components/nav'
import Link from 'next/link'

type Props = {}
class Interview extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = { value: '' }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value)
    event.preventDefault()
  }

  render() {
    return (
      <Container>
        <Head title="Interview" />
        <Nav />
        <Form>
          <FormGroup>
            <legend>Time</legend>
            <FormGroup check>
              <span>
                <Input type="checkbox" name="time" />{' '}
                Exec member for another org
              </span>
            </FormGroup>
            <FormGroup check>
              <span>
                <Input type="checkbox" name="time" />{' '}
                Consulting club such as IBC, OTCR
              </span>
            </FormGroup>
            <FormGroup check>
              <span >
                <Input type="checkbox" name="time"/>{' '}
                Some other club that requires time (ex: Enactus, Fraternity Pledge during the same semester)
              </span>
            </FormGroup>
            <FormGroup check>
              <span >
                <Input type="checkbox" name="time"/>{' '}
                Hard/Time-consuming classes
              </span>
            </FormGroup>
            <FormGroup check>
              <span >
                <Input type="checkbox" name="time"/>{' '}
                Hard course-load (still take one point off for each hard class they have as described above)
              </span>
            </FormGroup>
            <FormGroup check>
              <span >
                <Input type="checkbox" name="time"/>{' '}
                Too many org obligations
              </span>
            </FormGroup>
          </FormGroup>
          <FormGroup>
            <legend>Initiative and Passion</legend>
            <FormGroup check>
              <span>
                <Input type="radio" name="passion" />{' '}
                0 - Definitely using this as a resume booster
              </span>
            </FormGroup>
            <FormGroup check>
              <span>
                <Input type="radio" name="passion" />{' '}
                1 - Had a general idea of what hack4impact was. They probably only read a couple sentences about Hack4Impact and applied and that's it.
              </span>
            </FormGroup>
            <FormGroup check>
              <span >
                <Input type="radio" name="passion" />{' '}
                2 - Really into it, thinking about ways they could contribute to the org
              </span>
            </FormGroup>
          </FormGroup>
          <FormGroup>
            <legend>Community</legend>
            <span>Will they contribute to community or are they just using this as a resume booster? </span>
            <Input type="text" placeholder="Your Answer" />
          </FormGroup>
          <FormGroup>
            <legend>Resume and Tech Knowledge</legend>
            <FormGroup check>
              <span>
                <Input type="radio" name="techknowledge" />{' '}
                0 - No Experience
              </span>
            </FormGroup>
            <FormGroup check>
              <span>
                <Input type="radio" name="techknowledge" />{' '}
                1 - 1 to 2 projects
              </span>
            </FormGroup>
            <FormGroup check>
              <span >
                <Input type="radio" name="techknowledge" />{' '}
                2 - Has internship or a couple substantial projects
              </span>
            </FormGroup>
            <FormGroup check>
              <span >
                <Input type="radio" name="techknowledge"/>{' '}
                3 - Multiple
              </span>
            </FormGroup>
          </FormGroup>
          <FormGroup>
            <legend>Knowledge of Web Dev</legend>
            <FormGroup check>
              <span>
                <Input type="radio" name="webdev" />{' '}
                0 - No experience
              </span>
            </FormGroup>
            <FormGroup check>
              <span>
                <Input type="radio" name="webdev" />{' '}
                1 - Some experience with it
              </span>
            </FormGroup>
            <FormGroup check>
              <span >
                <Input type="radio" name="webdev"/>{' '}
                2 - Has done a couple projects, knows what flask is. etc. 
              </span>
            </FormGroup>
            <FormGroup check>
              <span >
                <Input type="radio" name="webdev" disabled />{' '}
                3 - Knows more than you - if they are a you think they could be a tech lead
              </span>
            </FormGroup>
          </FormGroup>
          <FormGroup>
            <legend>Technical Challenge</legend>
            <FormGroup check>
              <span>
                <Input type="radio" name="techchallenge" />{' '}
                0 - No experience
              </span>
            </FormGroup>
            <FormGroup check>
              <span>
                <Input type="radio" name="techchallenge" />{' '}
                1 - Completed but with a lot of help/slow
              </span>
            </FormGroup>
            <FormGroup check>
              <span >
                <Input type="radio" name="techchallenge" disabled />{' '}
                2 - Completed in a reasonable amount of time
              </span>
            </FormGroup>
            <FormGroup check>
              <span >
                <Input type="radio" name="techchallenge" disabled />{' '}
                3 - Damn they are good
              </span>
            </FormGroup>
          </FormGroup>
          <FormGroup>
            <Link prefetch href="/interviewportal">
              <Button color="primary">Submit</Button>
            </Link>
          </FormGroup>
        </Form>
      </Container>
    )
  }
}
export default Interview
