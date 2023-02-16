import { createStore } from 'redux'

const token = localStorage.getItem('token')

const initialState = {
  sidebarShow: true,
  isAuthenticated: token ? true : false,
  valueAddedServices: null,
  isLoading: false,
  paymentTypes: ['test'],
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    default:
      return state
  }
}

const store = createStore(changeState)
export default store
