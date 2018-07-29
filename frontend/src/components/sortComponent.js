import React, { Component } from 'react'
import withRedux from 'next-redux-wrapper'
import configureStore from '../store/appStore'
import { connect } from 'react-redux'
import { addFilter, removeFilter, resetFilters } from '../actions'
import { bindActionCreators } from 'redux'
import { yearsEnum, statusEnum, rolesEnum, gradEnum, sortByEnum, enumToArray } from '../utils/enums'
import { Button } from 'reactstrap'

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addFilter,
      removeFilter,
      resetFilters
    },
    dispatch
  )
}

const mapStateToProps = state => {
  return {
    filters: state.candidateListPage.filters
  }
}

type Props = {
  filters: Object
}

class SortComponent extends Component<props> {
  handleChange = event => {
    if (event.target.checked) {
      console.log("HI");
      this.props.addFilter(event.target.name, event.target.value)
    } else {
      console.log("HI2");
      // console.log(event.target.name);
      // console.log(event.target.value);
      this.props.removeFilter(event.target.name, event.target.value)
    }
    console.log(this.props.filters.sortBy)
  }

  handleClick = event => {
    this.props.resetFilters()
  }
  render() {
    const sortBy = enumToArray(sortByEnum)
    let sortByFilter = []
    if (this.props.filters) {
      sortByFilter = this.props.filters.sortBy
    }
    return (
      <div>
        <div>
          <h2>Sort By</h2>
        </div>
        <div>
          {sortBy.map((el, idx) => {
            return (
              <div className="pretty p-default" key={idx}>
                <input
                  type="checkbox"
                  id={el}
                  name="sortBy"
                  value={el}
                  checked={sortByFilter.includes(el)}
                  onChange={this.handleChange}
                />
                <div className="state">
                  <label htmlFor={el}>{el}</label>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SortComponent)
