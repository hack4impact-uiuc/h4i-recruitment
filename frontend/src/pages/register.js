import { Component } from 'react'
import Router from 'next/router'
import { register, google } from '../utils/api'
import { GoogleLogin } from 'react-google-login';

type Props = {}

class RegisterPage extends Component<Props> {
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
}

export default RegisterPage
