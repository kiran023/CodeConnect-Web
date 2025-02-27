import { createSlice } from "@reduxjs/toolkit";

const feedSlice= createSlice({
    name:'feed',
    initialState:[],
    reducers:{
        addFeed:(state,action)=> action.payload,
        removeFeed:(state,action)=>{return state.filter(f=>f._id!==action.payload)}

    }
})

export const {addFeed,removeFeed} =feedSlice.actions
export default feedSlice.reducer;