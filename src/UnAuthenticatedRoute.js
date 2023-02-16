import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Route } from 'react-router-dom'
import PropTypes from 'prop-types'

function querystring(name, url = window.location.href) {
  const paramName = name.replace(/[[]]/g, '\\$&')
  const regex = new RegExp(`[?&]${paramName}(=([^&#]*)|&|#|$)`, 'i')
  const results = regex.exec(url)

  if (!results) {
    return null
  }

  if (!results[2]) {
    return ''
  }

  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

const UnAuthenticatedRoute = ({ children, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.isAuthenticated)
  const redirect = querystring('redirect')

  return (
    <Route {...rest}>
      {!isAuthenticated && children}
      {isAuthenticated && (
        <Navigate to={redirect === '' || redirect === null ? '/home' : redirect} />
      )}
    </Route>
  )
}

export default UnAuthenticatedRoute

UnAuthenticatedRoute.propTypes = {
  children: PropTypes.node,
}
