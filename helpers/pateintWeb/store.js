import { createStore, applyMiddleware } from "redux";
import rootReducer from "../../rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { thunk } from "redux-thunk";


/**
 * @function store
 * @param rootReducer
 * @param composeWithDevTools
 * @desc This handles creation of redux store
 */
export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
    // other store enhancers if any
  )
);
