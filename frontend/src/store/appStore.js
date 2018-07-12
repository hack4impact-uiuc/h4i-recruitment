import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import recruitmentApp from './../reducers/actionReducers.js'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['candidates']
}

const persistedReducer = persistReducer(persistConfig, recruitmentApp)

export default function configureStore() {
  let store = createStore(
    persistedReducer,
    typeof window !== 'undefined' &&
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
  )
  let persistor = persistStore(store)
  store.__persistor = persistor
  return store
}
