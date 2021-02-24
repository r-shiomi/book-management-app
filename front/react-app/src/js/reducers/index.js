import { combineReducers } from "redux";
import userReducer from "./userReducer";
import booksReducer from "./booksReducer";
import bookReducer from "./bookReducer";


export default combineReducers({
  userReducer,
  booksReducer,
  bookReducer,
})