//@flow
import React from 'react'
import { Container, Row, Table, Badge, Media, Col, Button } from 'reactstrap'
import Link from 'next/link'
import { getCandidates, setCandidateStatus, getAllCandidates } from '../utils/api'
import { statusEnum } from '../utils/enums'
import CandidateStatus from '../components/candidateStatus'
import CandidateLinksBadge from '../components/candidateLinksBadge'
import PieComponent from '../components/pieComponent'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addFilter, removeFilter } from '../actions'

import sortJsonArray from 'sort-json-array'
import { Pie } from "react-chartjs-2";



type Props = {}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addFilter,
      removeFilter
    },
    dispatch
  )
}

const mapStateToProps = state => ({
  candidates: state.candidateListPage.candidates,
  loading: state.candidateListPage.candidatesLoading,
  error: state.candidateListPage.candidatesError,
  filters: state.candidateListPage.filters,
  sort: state.candidateListPage.sort
})


var sortByProperty = function(property) {
  return function(x, y) {
    return x[property] === y[property] ? 0 : x[property] > y[property] ? 1 : -1
  }
}

var sortByMultipleProperties = function(property1, property2) {
  return function(x, y) {
    return x[property1][property2] === y[property1][property2] ? 0 : x[property1][property2] > y[property1][property2] ? 1 : -1
  }
}

class Analytics extends React.Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      candidates: this.props.candidates,
      error: this.props.error,
      loading: this.props.loading,
      filters: this.props.filters
    }
  }
  async componentDidMount() {
    const res = await getCandidates()
    let candidates = res.result
    this.setState({
      candidates: res.result == undefined ? [] : res.result
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      filters: nextProps.filters
    })
  }

  handleChange = e => {
    let newCandidates = this.state.candidates.map(candidate => {
      if (candidate._id === e.target.name) {
        candidate.status = e.target.value
      }
      return candidate
    })
    setCandidateStatus(e.target.name, e.target.value)
    this.setState({ candidates: newCandidates })
  }
  // sort function
  compareByFacemashScore = (candidate1, candidate2) => {
    if (candidate1.facemashRankings == undefined) {
      return 0
    }
    if (candidate1.facemashRankings.elo > candidate2.facemashRankings.elo) {
      return -1
    }
    if (candidate1.facemashRankings.elo < candidate2.facemashRankings.elo) {
      return 1
    }
    return 0
  }

  render() {
    let filteredCandidates = this.state.candidates
      .filter(x => this.state.filters.gradDates.includes(x.graduationDate))
      .filter(x => this.state.filters.statuses.includes(x.status))
      .filter(x => this.state.filters.years.includes(x.year))

    switch (this.state.filters.sortBy[0]) {
      case 'Name':
        filteredCandidates = filteredCandidates.sort(sortByProperty('name'))
        break
      case 'Year':
        filteredCandidates = filteredCandidates.sort(sortByProperty('year'))
        break
      case 'Status':
        filteredCandidates = filteredCandidates.sort(sortByProperty('status'))
        break
      case 'Graduation Year':
        filteredCandidates = filteredCandidates.sort(sortByProperty('graduationDate'))
        break
      case 'Facemash Score':
        filteredCandidates = filteredCandidates.sort(
          sortByMultipleProperties('facemashRankings', 'elo')
        )
        break
      case 'Number of Matches':
        filteredCandidates = filteredCandidates.sort(
          sortByMultipleProperties('facemashRankings', 'numOfMatches')
        )
        break
    }
    let selects = this.state.filters.selectBy

    const chartData = {
        labels: ["Developmental stage", "Disease", "Domain", "PTM", "Biological process", "Cellular component", "Coding sequence diversity", "Technical term", "Ligand", "Molecular function"],

        datasets: [
          {
            label: "SpectraCount",
            data: [12, 6041, 12564, 11463, 14778, 14652, 7608, 16696, 14218, 15458],
            backgroundColor: [
              "#3e95cd",
              "#8e5ea2",
              "#3cba9f",
              "#e8c3b9",
              "#c45850",
              "#1c0549",
              "#db316d",
              "#ff005a",
              "  #ff6700",
              "#13890f"
            ]
          }
        ]
      };
    return (
      <>
        <div className="page-content-wrapper">
          <Container fluid>
            <Row>
              <Col lg="2" sm="3" className="ml-2">
                <PieComponent />
              </Col>
              <Col lg="9" sm="7">
              <Pie data={chartData} />
              </Col>
            </Row>
          </Container>
        </div>
      </>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Analytics)
