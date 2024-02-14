import {createSlice} from '@reduxjs/toolkit';
const initialState=null;

const loggedInUserSlice=createSlice({
    name:"loggedInUser",
    initialState,
    reducers:{
        setLoggedInUser(state,action)
        {
            const user=action.payload;
            return user;
        },
        removeLoggedInUser(state,action){
            return null;
        }
    }
})

export const logInUser=(data)=>{
    return async dispatch=>{
        dispatch(setLoggedInUser(data))
    }
}
export const logOutUser=()=>{
    return async dispatch=>{
        dispatch(removeLoggedInUser())
    }
}

const {setLoggedInUser,removeLoggedInUser}=loggedInUserSlice.actions;
export default loggedInUserSlice.reducer

