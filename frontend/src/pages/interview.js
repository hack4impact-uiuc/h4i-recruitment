import { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap'
import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'

type Props = {}
class Interview extends Component<Props> {
  render() {
    return (
      <Container>
        <Head title="Interview" />
        <Nav />
        <Form>
          <FormGroup>
            <legend>Time</legend>
            <FormGroup check>
              <Label>
                <Input type="checkbox" name="time" /> Exec member for another org
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label>
                <Input type="checkbox" name="time" /> Consulting club such as IBC, OTCR
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label>
                <Input type="checkbox" name="time" /> Some other club that requires time (ex:
                Enactus, Fraternity Pledge during the same semester)
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label>
                <Input type="checkbox" name="time" /> Hard/Time-consuming classes
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label>
                <Input type="checkbox" name="time" /> Hard course-load (still take one point off for
                each hard class they have as described above)
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label>
                <Input type="checkbox" name="time" /> Too many org obligations
              </Label>
            </FormGroup>
          </FormGroup>
          <FormGroup>
            <legend>Initiative and Passion</legend>
            <FormGroup check>
              <Label>
                <Input type="radio" name="passion" /> 0 - Definitely using this as a resume booster
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label>
                <Input type="radio" name="passion" /> 1 - Had a general idea of what hack4impact
                was. They probably only read a couple sentences about Hack4Impact and applied and
                that's it.
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label>
                <Input type="radio" name="passion" /> 2 - Really into it, thinking about ways they
                could contribute to the org
              </Label>
            </FormGroup>
          </FormGroup>
          <FormGroup>
            <legend>Community</legend>
            <Label>
              Will they contribute to community or are they just using this as a resume booster?{' '}
            </Label>
            <Input type="text" placeholder="Your Answer" />
          </FormGroup>
          <FormGroup>
            <legend>Resume and Tech Knowledge</legend>
            <FormGroup check>
              <Label>
                <Input type="radio" name="techknowledge" /> 0 - No Experience
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label>
                <Input type="radio" name="techknowledge" /> 1 - 1 to 2 projects
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label>
                <Input type="radio" name="techknowledge" /> 2 - Has internship or a couple
                substantial projects
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label>
                <Input type="radio" name="techknowledge" /> 3 - Multiple
              </Label>
            </FormGroup>
          </FormGroup>
          <FormGroup>
            <legend>Knowledge of Web Dev</legend>
            <FormGroup check>
              <Label>
                <Input type="radio" name="webdev" /> 0 - No experience
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label>
                <Input type="radio" name="webdev" /> 1 - Some experience with it
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label>
                <Input type="radio" name="webdev" /> 2 - Has done a couple projects, knows what
                flask is. etc.
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label>
                <Input type="radio" name="webdev" disabled /> 3 - Knows more than you - if they are
                a you think they could be a tech lead
              </Label>
            </FormGroup>
          </FormGroup>
          <FormGroup>
            <legend>Technical Challenge</legend>
            <FormGroup check>
              <Label>
                <Input type="radio" name="techchallenge" /> 0 - No experience
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label>
                <Input type="radio" name="techchallenge" /> 1 - Completed but with a lot of
                help/slow
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label>
                <Input type="radio" name="techchallenge" disabled /> 2 - Completed in a reasonable
                amount of time
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label>
                <Input type="radio" name="techchallenge" disabled /> 3 - Damn they are good
              </Label>
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
