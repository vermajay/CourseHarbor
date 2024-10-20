import {combineReducers} from "@reduxjs/toolkit"

import authReducer from '../slices/authSlice'
import profileSliceReducer from "../slices/profileSlice";
import cartSliceReducer from "../slices/cartSlice";
import courseSliceReducer from '../slices/courseSlice'
import viewCourseSliceReducer from "../slices/viewCourseSlice"

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileSliceReducer,
    cart: cartSliceReducer,
    course: courseSliceReducer,
    viewCourse: viewCourseSliceReducer
})

export default rootReducer;