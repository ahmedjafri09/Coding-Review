import * as Sentry from '@sentry/browser'
import { toast } from 'react-toastify'

const isLocal = process.env.NODE_ENV === 'development'

export function initSentry() {
  if (isLocal) {
    return
  }

  Sentry.init({
    dsn: 'https://5f83aa2e21064e47bab8a1f308f940eb@sentry.io/5185720',
  })
}

export function logError(error) {
  toast.error(error?.response?.data?.message || error?.message)
}

export function onError(error) {
  let errorInfo = {}
  let message = error?.response?.data?.message || error.toString()

  // Auth errors
  if (!(error instanceof Error) && error.message) {
    errorInfo = error
    message = error.message
    error = new Error(message)
    // API errors
  } else if (error.config && error.config.url) {
    errorInfo.url = error.config.url
  }

  logError(error, errorInfo)
}
