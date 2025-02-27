import { configureStore } from '@reduxjs/toolkit'
import userReducer from './usersSlice';
import feedReducer from './feedSlice';
import requestsReducer from './requestSlice';

const appStore=configureStore({
    reducer: {
        user:userReducer,
        feed:feedReducer,
        requests:requestsReducer
    } 
})

export default appStore;