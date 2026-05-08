import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../src/userSlice"
const appStore = configureStore({
    reducer:{
        user:userReducer
    }
})
export default appStore;