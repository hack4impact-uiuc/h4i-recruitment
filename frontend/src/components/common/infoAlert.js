import { Alert } from 'reactstrap'
import cookie from 'js-cookie'
import { useState } from 'react'

const turnOff = (toggle, cookieName, cookieAlertOffValue, cookieExpire) => {
  const cookieExpiration = cookieExpire ? cookieExpire : 365 // default to expire in 365 days
  cookie.set(cookieName, cookieAlertOffValue, { expires: cookieExpiration })
  toggle(false)
}

/*
 * Info Alert Shows a Bootstrap Alert https://reactstrap.github.io/components/alerts/
 * meant to only show up until the user toggles it off.
 * That state is tracked by using cookies.
 * To create your own alert, provide a cookieName (str) and a cookie value that's created when
 * the user toggles the alert off. Additionally, provide the content JSX through the `content` prop.
 * To update an alert (you want a new alert to show up in the same place), change the cookie value
 * to another string value (if the cookie value is equal to the passed prop cookie value
 * doesn't show the alert, else it does)
 */
const InfoAlert = ({ cookieName, cookieAlertOffValue, cookieExpire, children, color }) => {
  const [visible, toggle] = useState(cookie.get(cookieName) !== cookieAlertOffValue) // don't show alert if cookie value is the same as the prop value
  return (
    <Alert
      color={color ? color : 'success'}
      className="db-alert"
      isOpen={visible}
      toggle={() => turnOff(toggle, cookieName, cookieAlertOffValue, cookieExpire)}
    >
      {children}
    </Alert>
  )
}

export default InfoAlert
