import { combineReducers } from 'redux'
import userListReducer from './userList'
import loginReducer from './login'

export default combineReducers({
    userList: userListReducer,
    currentUser: loginReducer
})