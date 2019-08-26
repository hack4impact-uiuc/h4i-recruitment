import { Label, Input, FormFeedback } from 'reactstrap'
import InterviewSectionCard from './interviewSectionCard'

const GeneralNotesInput = ({ generalNotes, handleChange }) => (
  <InterviewSectionCard title="General Notes">
    <Label>
      <b>
        Any other notes that the rubric didn&#39;t cover or emphasis you&#39;d like to make? Any
        general thoughts about this Candidate?
      </b>
    </Label>
    <Input
      style={{ height: '150px' }}
      type="textarea"
      className="textarea-input"
      name="generalNotes"
      value={generalNotes}
      onChange={handleChange}
      placeholder="Please put as many notes as possible! It'll help a lot during deliberations."
      invalid={generalNotes === ''}
    />
    <FormFeedback>Please fill in your general thoughts about this candidate!</FormFeedback>
  </InterviewSectionCard>
)

export default GeneralNotesInput
