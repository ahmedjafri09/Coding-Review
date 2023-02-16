import React from 'react'
import { Navigate, Route } from 'react-router-dom'
import PropTypes from 'prop-types'

const RenderRoute = ({ Component, path, to, CustomRoute }) => {
  if (path && to) {
    return (
      <Route path={path} exact>
        <Navigate to={to} />
      </Route>
    )
  }

  if (path && CustomRoute) {
    return (
      <CustomRoute path={path} exact>
        <Component />
      </CustomRoute>
    )
  }

  if (path) {
    return <Route path={path} component={Component || null} exact />
  }

  return null
}

export default RenderRoute

RenderRoute.propTypes = {
  Component: PropTypes.node,
  path: PropTypes.any,
  to: PropTypes.string,
  CustomRoute: PropTypes.node,
}
