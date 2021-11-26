import {applyMiddleware, compose, createStore} from "redux";
import thunk from "redux-thunk";
import rootReducer from "./redux/reducers/rootReducer";
import {persistStore} from "redux-persist";
import {createLogger} from "redux-logger";

const middleware = [thunk, createLogger()];

export const store = createStore(
    rootReducer,
    compose(applyMiddleware(...middleware))
);

export const persistor = persistStore(store);

export default {store, persistor};