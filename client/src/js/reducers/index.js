import { combineReducers } from "redux"

import data from "./dataReducer"
import queries from "./queriesReducer"

export default combineReducers({
  data,
  queries,
})
