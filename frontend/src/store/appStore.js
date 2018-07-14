import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import recruitmentApp from './../reducers/actionReducers.js'
import { persistStore, persistReducer } from 'redux-persist'
import { loadState, saveState } from './localStorage'

// const persistedReducer = persistReducer(persistConfig, recruitmentApp)
const persistedState = loadState()

const savePersistedState = (store) => () => {
  saveState({
    candidates: store.getState().candidates
  })
}

const devtools = (typeof window !== 'undefined' &&
                  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
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
