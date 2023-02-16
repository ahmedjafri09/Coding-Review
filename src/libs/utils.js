import { toast } from 'react-toastify'

export function toaster(type, msg) {
  toast[type](msg)
}
