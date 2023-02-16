import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Route, Navigate, useLocation } from 'react-router-dom'

export default function AuthenticatedRoute({ children, ...rest }) {
  const { pathname, search } = useLocation()
  const isAuthenticated = useSelector((state) => state.isAuthenticated)
  return (
    <Route {...rest}>
      {isAuthenticated ? children : <Navigate to={`/login?redirect=${pathname}${search}`} />}
    </Route>
  )
}

AuthenticatedRoute.propTypes = {
  children: PropTypes.node,
}
