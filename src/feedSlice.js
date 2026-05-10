import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name:"feed",
    initialState:null,
    reducers:{
        addfeed:(state,action)=>{
              return action.payload;
        },
        removefeed:(state,action)=>{
            const newArr = state.filter(r=>r._id!==action.payload)
            return newArr;
    }}

})


export default feedSlice.reducer
export const {addfeed,removefeed} = feedSlice.actions