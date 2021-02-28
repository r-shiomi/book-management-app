import { combineReducers } from "redux";
import userReducer from "./userReducer";
import booksReducer from "./booksReducer";
import bookReducer from "./bookReducer";
import reviewReducer from "./reviewReducer";


export default combineReducers({
  userReducer,
  booksReducer,
  bookReducer,
  reviewReducer,
})