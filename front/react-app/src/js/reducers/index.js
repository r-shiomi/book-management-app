import { combineReducers } from "redux";
import userReducer from "./userReducer";
import booksReducer from "./booksReducer";
import bookReducer from "./bookReducer";
import reviewReducer from "./reviewReducer";
import bookShelfReducer from "./bookShelfReducer";
import bookReviewReducer from "./bookReviewReducer";


export default combineReducers({
  userReducer,
  booksReducer,
  bookReducer,
  reviewReducer,
  bookShelfReducer,
  bookReviewReducer,
})