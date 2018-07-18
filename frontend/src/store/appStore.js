import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import recruitmentApp from './../reducers/actionReducers.js'
import { composeWithDevTools } from 'redux-devtools-extension'
export default function configureStore() {
  return createStore(
    recruitmentApp,
    /* preloadedState, */ composeWithDevTools(applyMiddleware(thunk))
  )
}
