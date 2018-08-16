import React from 'react'
import App, { Container } from 'next/app'
import { Provider } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import Head from '../components/head'
import Nav from '../components/nav'
import configureStore from '../store/appStore'

export default withRedux(configureStore, { debug: true })(
  class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
      return {
        pageProps: {
          // Call page-level getInitialProps
          ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {})
        }
      }
    }

    componentDidCatch(error, errorInfo) {
      console.error('Page Error Boundary: ', error)
      // This is needed to render errors correctly in development / production
      super.componentDidCatch(error, errorInfo)
    }

    render() {
      const { Component, pageProps, store } = this.props
      return (
        <Container>
          <Provider store={store}>
            <div>
              <Head />
              <Nav />
              <Component {...pageProps} />
            </div>
          </Provider>
        </Container>
      )
    }
  }
)
