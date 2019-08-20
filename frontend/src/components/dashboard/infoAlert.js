import { Alert } from 'reactstrap'
import cookie from 'js-cookie'
import { useState } from 'react'

const InfoAlertName = 'INFO-ALERT'
const AlertOff = 'FALL-2019-UPDATE' // change value if you want to trigger a new alert

const turnOff = toggle => {
  cookie.set(InfoAlertName, AlertOff, { expires: 21 }) // expires in 21 days
  toggle(false)
}

const InfoAlert = () => {
  const [visible, toggle] = useState(cookie.get(InfoAlertName) !== AlertOff)
  return (
    <Alert className="db-alert" isOpen={visible} toggle={() => turnOff(toggle)}>
      <h5>Fall 2019 Updates</h5>
      <ul>
        <li>Workspaces are added</li>
        <li>Events</li>
        <li>Automatic Interview Scheduling</li>
        <li>New AuthN and AuthZ scheme for future permission based features</li>
        <li>Lots of new UI/UX updates & bug fixes!</li>
      </ul>
    </Alert>
  )
}

export default InfoAlert
