import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../src/userSlice"
import feedReducer from "../src/feedSlice"
import connectionReducer from "../src/connectionSlice"
import requestReducer from "../src/RequestSlice"
const appStore = configureStore({
    reducer:{
        user:userReducer,
        feed:feedReducer,
        connection:connectionReducer,
        request:requestReducer
    }
})
export default appStore;