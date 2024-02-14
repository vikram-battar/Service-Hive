import {configureStore} from '@reduxjs/toolkit'
import loggedInUserReducer from './loggedInUserReducer'


const store=configureStore({
    reducer:{
        loggedInUser:loggedInUserReducer
    }
})
export default store;