import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
//root Reducer is index js from ruducer folder
import rootReducer from "./reducer";

const initialState = {};
const middleWare = [thunk];
const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleWare)
    /* window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() */
  )
);

export default store;
