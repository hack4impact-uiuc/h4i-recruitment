// new users are routed to this page while their access is pending
import React, { useEffect } from 'react'
import Router from 'next/router'
import Nav from '../components/nav'
import Head from '../components/head'
import { Card, CardBody, CardTitle } from 'reactstrap'
import { validateUser } from '../utils/api'

const redirectIfValid = async () => {
  const { result } = await validateUser()
  if (result?.role !== 'Pending') {
    Router.push('/dashboard')
  }
}

const PendingPage = () => {
  useEffect(() => {
    redirectIfValid()
  }, [])

  return (
    <>
      <Head />
      <Nav />
      <Card className="pending-card">
        <CardTitle>Your account is pending approval.</CardTitle>
        <CardBody>Refresh this page when access is granted.</CardBody>
        <a>
          <img height="200" src="../loading.gif" />
        </a>
      </Card>
    </>
  )
}

export default PendingPage
