import { InfoAlert } from '../common'

const InfoAlertName = 'INFO-ALERT'
const AlertOff = 'FALL-2019-UPDATE' // change value if you want to trigger a new alert

const UpdateBlob = (
  <div>
    <h5>Fall 2019 Updates</h5>
    <ul>
      <li>Workspaces are added</li>
      <li>Events</li>
      <li>Automatic Interview Scheduling</li>
      <li>New AuthN and AuthZ scheme for future permission based features</li>
      <li>Lots of new UI/UX updates & bug fixes!</li>
    </ul>
  </div>
)

const UpdateAlert = () => (
  <InfoAlert cookieAlertOffValue={AlertOff} cookieName={InfoAlertName}>
    {UpdateBlob}
  </InfoAlert>
)

export default UpdateAlert
