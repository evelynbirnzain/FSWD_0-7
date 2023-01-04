import {createSlice} from "@reduxjs/toolkit";

const initialState = ''
let timeoutId = null

export const setNotification = (notification, time) => {
  return async dispatch => {
    clearTimeout(timeoutId)
    dispatch(_setNotification(notification))
    timeoutId = setTimeout(() => dispatch(clearNotification()), time * 1000)
  }
}
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    _setNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return initialState
    }
  },
})

export const {_setNotification, clearNotification} = notificationSlice.actions
export default notificationSlice.reducer