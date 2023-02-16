import React, { Suspense, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
// replace browser router with hash router in case of legacy browsers
import { BrowserRouter as HashRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import tokenVerification from 'src/libs/verifyToken'
import './scss/style.scss'
import 'react-toastify/dist/ReactToastify.css'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const App = () => {
  const dispatch = useDispatch()

  const setIsAuthenticated = useCallback(async () => {
    dispatch({ type: 'set', isLoading: true })
    const verified = await tokenVerification()
    if (verified) {
      dispatch({ type: 'set', isAuthenticated: true })
    } else {
      dispatch({ type: 'set', isAuthenticated: false })
    }
    dispatch({ type: 'set', isLoading: false })
  }, [dispatch])

  useEffect(() => {
    setIsAuthenticated()
  }, [setIsAuthenticated])

  return (
    <div>
      <ToastContainer />
      <HashRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route exact path="/register" name="Register Page" element={<Register />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route path="*" name="Home" element={<DefaultLayout />} />
          </Routes>
        </Suspense>
      </HashRouter>
    </div>
  )
}

export default App
