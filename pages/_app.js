import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Provider } from 'react-redux'
import { useStore } from '../store'
import AlertMap from '../components/AlertMap'
import Navmenu from '../components/Navmenu'
import Footer from '../components/Footer'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { loadUser } from '../actions/auth'
import { useEffect } from 'react'
import setAuthToken from '../utils/setAuthToken'

export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)
  const persistor = persistStore(store, {}, function () {
    persistor.persist()
  })

  useEffect(() => {
    // const persistStorage = localStorage.getItem('persist:primary')
    // let token
    // if (persistStorage !== null) {
    //   token = persistStorage.substring(
    //     persistStorage.indexOf('token') + 8,
    //     persistStorage.indexOf(',')
    //   )
    // }
    // if (token && token !== 'null') {
    //   setAuthToken(token)
    // }
    if (store.getState().auth.token) {
      setAuthToken(store.getState().auth.token)
    }
    store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store}>
      <PersistGate loading={<div>loading</div>} persistor={persistor}>
        <Navmenu />
        <AlertMap />
        <Component {...pageProps} />
        <Footer />
      </PersistGate>
    </Provider>
  )
}
