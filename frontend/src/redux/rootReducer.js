import { combineReducers } from "redux"

import authReducer from "./auth"
import postsReducer from "./opportunities"

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer
  // other reducers will go here later
})

export default rootReducer

