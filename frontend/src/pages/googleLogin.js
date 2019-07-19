import { Component } from 'react'
import Router from 'next/router'
import { register, google } from '../utils/api'
import { GoogleLogin } from 'react-google-login';

// this page should eventually replace the current Login.js
// I wanted to have a temp page to work with before replacing it
type Props = {}

class LoginPage extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      password2: '',
      dropdownOpen: false,
      errorMessage: ''
    }
  }
  handleGoogle = async e => {
    const result = await google(e.tokenId)
    const resp = await result.json()
    if (resp.status !== 200) {
      this.setState({ errorMessage: resp.message })
    } else {
      setCookie('token', e.tokenId)
      setCookie('google', true)
      Router.push('/')
    }
  }
}

export default LoginPage
