// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Link from 'next/link'
import { Card, CardBody, CardTitle, Button } from 'reactstrap'
import Router, { withRouter } from 'next/router'
import { categoryEnum } from '../utils/enums'
import { setCategory } from '../actions/actionCreators'

type Props = {
  pickerFunc: Function
}

class InterviewCategory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      category: ''
    }
  }
  handleChange = e => {
    this.setState({ category: e.target.value }, () => {
      this.props.pickerFunc(this.state.category)
    })
  }
  render() {
    let { category } = ''
    return (
      <p>
        Change Category:
        <select onChange={this.handleChange}>
          <option value="" selected disabled hidden>
            Choose here
          </option>
          <option value={categoryEnum.FRESHMAYBE}>Freshman - maybe</option>
          <option value={categoryEnum.FRESHPOTENTIAL}>
            Freshman - with lack of experience but high potential and initiative
          </option>
          <option value={categoryEnum.FRESHYES}>Freshman - yes</option>
          <option value={categoryEnum.DONTACCEPT}>Don’t Accept</option>
          <option value={categoryEnum.EH}>Weak maybe (eh)</option>
          <option value={categoryEnum.MAYBE}>
            Maybe ( I wouldn’t necessarily accept this candidate, but I’m open to if others are)
          </option>
          <option value={categoryEnum.STRONGMAYBE}>
            Strong Maybe (I wouldn’t fight to accept this candidate, but I think they would be a
            good addition to the team)
          </option>
          <option value={categoryEnum.VOUCH}>Strongly Vouch for this candidate</option>
          <option value={categoryEnum.UPPEREH}>
            Upperclassman with experience but eh with everything else
          </option>
        </select>
      </p>
    )
  }
}

export default InterviewCategory
