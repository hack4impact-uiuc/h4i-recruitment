import React, { Component } from 'react'
import withRedux from 'next-redux-wrapper'
import configureStore from '../store/appStore'
import { connect } from 'react-redux'
import { addFilter, removeFilter } from '../actions'
import { bindActionCreators } from 'redux'
import { yearsenum, statusenum, rolesenum } from '../utils/enums'

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addFilter,
      removeFilter
    },
    dispatch
  )
}

const mapStateToProps = state => {
  return {
    filters: state.candidateListPage.filters,
    sort: state.candidateListPage.sort
  }
}

type Props = {
  filters: Object,
  sort: Object
}

class FilterComponent extends Component<props> {
  handleChange = event => {
    if (event.target.checked) {
      this.props.addFilter(event.target.name, event.target.value)
    } else {
      this.props.removeFilter(event.target.name, event.target.value)
    }
  }
  capitalizeFirstLetter = str => {
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })
  }
  render() {
    const years = [yearsenum.FRESHMAN, yearsenum.SOPHOMORE, yearsenum.JUNIOR, yearsenum.SENIOR]
    const roles = [rolesenum.SWE, rolesenum.TL, rolesenum.CD, rolesenum.PM]
    const statuses = [
      statusenum.PENDING,
      statusenum.ACCEPTED,
      statusenum.DENIED,
      statusenum.INTERVIEWING
    ]
    const statusFilter = this.props.filters.statuses
    const roleFilter = this.props.filters.roles
    const yearFilter = this.props.filters.years
    return (
      <div>
        <p>
          <h1>Filter By:</h1>
        </p>
        <p>
          <h2>Status</h2>
        </p>
        <div>
          {statuses.map(el => {
            return (
              <p>
                <input
                  type="checkbox"
                  id={el}
                  name="statuses"
                  value={el}
                  checked={statusFilter.includes(el)}
                  onChange={this.handleChange}
                />
                <label for={el}>{this.capitalizeFirstLetter(el)}</label>
              </p>
            )
          })}
        </div>
        <p>
          <h2>Year</h2>
        </p>
        <div>
          {years.map(el => {
            return (
              <p>
                <input
                  type="checkbox"
                  id={el}
                  name="years"
                  value={el}
                  checked={yearFilter.includes(el)}
                  onChange={this.handleChange}
                />
                <label for={el}>{this.capitalizeFirstLetter(el)}</label>
              </p>
            )
          })}
        </div>
        <div>
          <h2>Role</h2>
        </div>
        <div>
          {roles.map(el => {
            return (
              <p>
                <input
                  type="checkbox"
                  id={el}
                  name="roles"
                  value={el}
                  checked={roleFilter.includes(el)}
                  onChange={this.handleChange}
                />
                <label for={el}>{this.capitalizeFirstLetter(el)}</label>
              </p>
            )
          })}
        </div>
      </div>
    )
  }
}

const connectedFilterComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterComponent)

export default withRedux(configureStore)(connectedFilterComponent)
