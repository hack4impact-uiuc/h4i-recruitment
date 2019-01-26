import React from 'react'
import App, { Container } from 'next/app'
import { Provider } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import Head from '../components/head'
import Nav from '../components/nav'
import configureStore from '../store/appStore'
import ErrorMessage from '../components/errorMessage'
import { PageTransition } from 'next-page-transitions'

export default withRedux(configureStore, { debug: true })(
  class MyApp extends App {
    constructor(props) {
      super(props)
      this.state = { hasError: false }
    }
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
              {this.state.hasError ? (
                <ErrorMessage
                  code="404"
                  message="Something went Wrong. Are you logged in? Check logs as well"
                />
              ) : (
                <PageTransition timeout={300} classNames="page-transition">
                  <Component {...pageProps} />
                </PageTransition>
              )}
            </div>
          </Provider>
          <style jsx global>
            {`
              .page-transition-enter {
                opacity: 0;
              }
              .page-transition-enter-active {
                opacity: 1;
                transition: opacity 300ms;
              }
              .page-transition-exit {
                opacity: 1;
              }
              .page-transition-exit-active {
                opacity: 0;
                transition: opacity 300ms;
              }
            `}
          </style>
        </Container>
      )
    }
  }
)
