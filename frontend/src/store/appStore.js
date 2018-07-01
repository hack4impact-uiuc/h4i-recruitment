import { createStore } from 'redux'
import recruitmentApp from './../reducers/actionReducers.js'

export default function configureStore() {
  return createStore (
    recruitmentApp,
    typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
}
