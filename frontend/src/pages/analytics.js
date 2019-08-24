//@flow
import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { getCandidates, setCandidateStatus } from '../utils/api'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Pie } from 'react-chartjs-2'
import { addFilter, removeFilter } from '../actions'
import PieComponent from '../components/pieComponent'
import Nav from '../components/nav'
import Head from '../components/head'

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addFilter,
      removeFilter,
    },
    dispatch
  )
}

const mapStateToProps = state => ({
  candidates: state.candidateListPage.candidates,
  loading: state.candidateListPage.candidatesLoading,
  error: state.candidateListPage.candidatesError,
  filters: state.candidateListPage.filters,
})

class Analytics extends Component {
  constructor(props) {
    super(props)
    this.state = {
      candidates: this.props.candidates,
      error: this.props.error,
      loading: this.props.loading,
      filters: this.props.filters,
    }
  }
  async componentDidMount() {
    const res = await getCandidates()
    let candidates = res.result
    this.setState({
      candidates: res.result == undefined ? [] : res.result,
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      filters: nextProps.filters,
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

  render() {
    let data = {}

    let filteredCandidates = this.state.candidates
      .filter(x => this.state.filters.gradDates.includes(x.graduationDate))
      .filter(x => this.state.filters.statuses.includes(x.status))
      .filter(x => this.state.filters.years.includes(x.year))
      .filter(x => !x.role.map(role => this.state.filters.roles.includes(role)).includes(false))

    switch (this.state.filters.compareBy[this.state.filters.compareBy.length - 1]) {
      case 'Year':
        this.state.filters.years.forEach(year => (data[year] = 0))
        filteredCandidates.map(candidate => (data[candidate.year] += 1))
        break
      case 'Status':
        this.state.filters.statuses.forEach(status => (data[status] = 0))
        filteredCandidates.map(candidate => (data[candidate.status] += 1))
        break
      case 'Graduation Year':
        this.state.filters.gradDates.forEach(graduationDate => (data[graduationDate] = 0))
        filteredCandidates.map(candidate => (data[candidate.graduationDate] += 1))
        break
      case 'Roles':
        this.state.filters.roles.forEach(role => (data[role] = 0))
        filteredCandidates.map(candidate => candidate.role.map(role => (data[role] += 1)))
        break
    }

    Object.keys(data).map(key => (isNaN(data[key]) ? delete data[key] : (data[key] = data[key])))

    const chartData = {
      labels: Object.keys(data),

      datasets: [
        {
          label: 'SpectraCount',
          data: Object.values(data),
          backgroundColor: [
            '#3e95cd',
            '#8e5ea2',
            '#3cba9f',
            '#e8c3b9',
            '#c45850',
            '#1c0549',
            '#db316d',
            '#ff005a',
            '  #ff6700',
            '#13890f',
          ],
        },
      ],
    }
    return (
      <>
        <Head title="Analytics" />
        <Nav />
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
