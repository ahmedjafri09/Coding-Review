import React from 'react'
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Services = React.lazy(() => import('./views/services/index'))
const CreateEditService = React.lazy(() => import('./views/services/CreateEditService'))
const Users = React.lazy(() => import('./views/users/index'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/services', name: 'Services', element: Services },
  { path: '/services/add', name: 'Add Service', element: CreateEditService },
  { path: '/users', name: 'Users', element: Users },
]

export default routes
