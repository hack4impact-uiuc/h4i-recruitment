import { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap'
import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'
import { addInterview } from '../utils/api'

type Props = {}

class Interview extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      interviewerKey:"",
      candidateId:"",
      overallScore:0,
      generalNotes:"",
      sections: [
        {
          sectionName: "Time",
          questions:[
            {
              questionName:"Exec member for another org",
              number: 0
            },
            {
              questionName:"Consulting club such as IBC, OTCR",
              number: 0
            },
            {
              questionName:"Some other club that requires time (ex: Enactus, Fraternity Pledge during the same semester)",
              number: 0
            },
            {
              questionName:"Hard/Time-consuming classes",
              number: 0
            },
            {
              questionName:"Hard course-load (still take one point off for each hard class they have as described above)",
              number: 0
            },
            {
              questionName:"Too many org obligations",
              number: 0
            }
          ],
          sectionNotes: ""

        },
        {
          sectionName: "Initiative and Passion",
          questions:[
            {
              questionName:"Initiative and Passion",
              number: 0
            }
          ],
          sectionNotes: ""

        },
        {
          sectionName: "Community",
          questions:[
            {
              questionName:"Will they contribute to community or are they just using this as a resume booster?",
              number: 0
            }
          ],
          sectionNotes: ""

        },
        {
          sectionName: "Resume And Tech Knowledge",
          questions:[
            {
              questionName:"Resume And Tech Knowledge",
              number: 0
            }
          ],
          sectionNotes: ""

        },
        {
          sectionName: "Knowledge of Web Dev",
          questions:[
            {
              questionName:"Knowledge of Web Dev",
              number: 0
            }
          ],
          sectionNotes: ""

        },
        {
          sectionName: "Technical Challenge",
          questions:[
            {
              questionName:"Technical Challenge",
              number: 0
            }
          ],
          sectionNotes: ""

        }
        
      ]
    }
  }
  handleSubmit = (e) => {
    addInterview(this.state.interviewerKey, this.state.candidateId, this.state.overallScore, this.state.generalNotes, this.state.sections);
  }

  onSelect = (e) => {
    const currSection = this.state.sections.filter(section => section.sectionName === e.target.name)[0];
    const currQuestion = currSection.questions.filter(question => question.questionName === e.target.name)[0];
    currQuestion.number = parseInt(e.target.value);
    this.forceUpdate(); 
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
              <Label>
                <Input type="checkbox" value="-1" question="0" onClick={this.onSelect} name="Time" /> Exec member for another org
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label>
                <Input type="checkbox" value="-1" onClick={this.onSelect} name="Time" /> Consulting club such as IBC, OTCR
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label>
                <Input type="checkbox" value="-1" onClick={this.onSelect} name="Time" /> Some other club that requires time (ex:
                Enactus, Fraternity Pledge during the same semester)
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label>
                <Input type="checkbox" value="-1" onClick={this.onSelect} name="Time" /> Hard/Time-consuming classes
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label>
                <Input type="checkbox" value="-1" onClick={this.onSelect} name="Time" /> Hard course-load (still take one point off for
                each hard class they have as described above)
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label>
                <Input type="checkbox" value="-1" onClick={this.onSelect} name="Time" /> Too many org obligations
              </Label>
            </FormGroup>
          </FormGroup>
          <FormGroup>
            <legend>Initiative and Passion</legend>
            <FormGroup check>
              <Label>
                <Input type="radio" value="0" onClick={this.onSelect} name="Initiative and Passion" /> 0 - Definitely using this as a resume booster
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label>
                <Input type="radio" value="1" onClick={this.onSelect} name="Initiative and Passion" /> 1 - Had a general idea of what hack4impact
                was. They probably only read a couple sentences about Hack4Impact and applied and
                that's it.
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label>
                <Input type="radio" value="2" onClick={this.onSelect} name="Initiative and Passion" /> 2 - Really into it, thinking about ways they
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
                <Input type="radio" value="0" onClick={this.onSelect} name="Resume And Tech Knowledge" /> 0 - No Experience
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label>
                <Input type="radio" value="1" onClick={this.onSelect} name="Resume And Tech Knowledge" /> 1 - 1 to 2 projects
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label>
                <Input type="radio" value="2" onClick={this.onSelect} name="Resume And Tech Knowledge" /> 2 - Has internship or a couple
                substantial projects
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label>
                <Input type="radio" value="3" onClick={this.onSelect} name="Resume And Tech Knowledge" /> 3 - Multiple
              </Label>
            </FormGroup>
          </FormGroup>
          <FormGroup>
            <legend>Knowledge of Web Dev</legend>
            <FormGroup check>
              <Label>
                <Input type="radio" value="0" onClick={this.onSelect} name="Knowledge of Web Dev" /> 0 - No experience
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label>
                <Input type="radio" value="1" onClick={this.onSelect} name="Knowledge of Web Dev" /> 1 - Some experience with it
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label>
                <Input type="radio" value="2" onClick={this.onSelect} name="Knowledge of Web Dev" /> 2 - Has done a couple projects, knows what
                flask is. etc.
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label>
                <Input type="radio" value="3" onClick={this.onSelect} name="Knowledge of Web Dev"/> 3 - Knows more than you - if they are
                a you think they could be a tech lead
              </Label>
            </FormGroup>
          </FormGroup>
          <FormGroup>
            <legend>Technical Challenge</legend>
            <FormGroup check>
              <Label>
                <Input type="radio" value="0" onClick={this.onSelect} name="Technical Challenge" /> 0 - No experience
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label>
                <Input type="radio" value="1" onClick={this.onSelect} name="Technical Challenge" /> 1 - Completed but with a lot of
                help/slow
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label>
                <Input type="radio" value="2" onClick={this.onSelect} name="Technical Challenge" /> 2 - Completed in a reasonable
                amount of time
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label>
                <Input type="radio" value="3" onClick={this.onSelect} name="Technical Challenge" /> 3 - Damn they are good
              </Label>
            </FormGroup>
          </FormGroup>
          <FormGroup>
            <Link prefetch href="/interviewportal">
              <Button color="primary" onClick={this.handleSubmit}>Submit</Button>
            </Link>
          </FormGroup>
        </Form>
      </Container>
    )
  }
}
export default Interview
