import React, { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import API from 'src/libs/axios'
import { onError } from 'src/libs/errorLib'

const AppShell = ({ children }) => {
  const dispatch = useDispatch()

  const getPaymentTypes = useCallback(async () => {
    try {
      const { paymentTypes } = await API.get('payment-type')
      dispatch({ type: 'set', paymentTypes })
    } catch (error) {
      onError(error)
    }
  }, [dispatch])

  useEffect(() => {
    getPaymentTypes()
  }, [getPaymentTypes])

  const getValueAddedServices = useCallback(async () => {
    try {
      const { services } = await API.get('value-added-service')
      dispatch({ type: 'set', valueAddedServices: services })
    } catch (error) {
      onError(error)
    }
  }, [dispatch])

  useEffect(() => {
    getValueAddedServices()
  }, [getValueAddedServices])

  return <>{children}</>
}

export default AppShell

AppShell.propTypes = {
  children: PropTypes.node,
}
