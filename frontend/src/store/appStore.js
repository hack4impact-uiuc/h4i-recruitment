import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import recruitmentApp from './../reducers/actionReducers.js'
import { loadState, saveState } from './localStorage'

const persistedState = loadState()

const savePersistedState = (store) => () => {
  saveState({
    candidates: store.getState().candidates
  })
}

const devtools = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)

const composeEnhancers = devtools || compose

export default function configureStore() {
  let store = createStore(
    recruitmentApp,
    persistedState,
    composeEnhancers(applyMiddleware(thunk))
  )
  store.subscribe(savePersistedState(store))
  return store
}
