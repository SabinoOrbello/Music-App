import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import reducer from "../reducers/reducer";
import { combineReducers } from "redux";
import heartReducer from "../reducers/heartReducer";

const rootReducer = combineReducers({
  heart: heartReducer,
  reducer: reducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
