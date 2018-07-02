import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { generateMatchData } from './../actions'
import index from './../pages/index.js'

function mapStateToProps(state) {
  return {
    candidates: state.candidates
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      generateMatchData
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(index)
