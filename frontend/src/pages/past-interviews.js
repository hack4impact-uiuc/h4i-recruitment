import { Container, Button, Table } from 'reactstrap'
import { Component } from 'react'
import { getPastInterviews, editInterview } from '../utils/api'
type Props = {}

// Main app
class PastInterviews extends Component<Props> {
  
  constructor(props) {
    super(props)
    this.state = {
      interviews: []
    }
  }

  async componentDidMount(){
  console.log(getPastInterviews('CaptainMeg'))
  const {result} = await getPastInterviews('CaptainMeg')
  console.log(result)
    if(result){
      this.setState({interviews: result})
    }
  }
  editInterview = (e) =>{
    
  }
  
  
  render() {
    let interviews = this.state.interviews;
    return (
      <Container>
        <Table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Candidate Name</th>
                    <th>Interview Overall Score</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
            {interviews ? interviews.map((interview, i) => {
              console.log("DIS INTER", interview)
              return [
                  <tr key={i}>
                    <td>{i}</td>
                    <td>{interview.interviewer_key}</td>
                    <td>{interview.overall_score}</td>
                    <td><Button onClick={this.editInterview()}>Edit Interview</Button></td>
                  </tr>,
                ];
              }) : <tr>No Interviews</tr>}
            </tbody>
        </Table>
      </Container>
    )
  }
}
export default PastInterviews
