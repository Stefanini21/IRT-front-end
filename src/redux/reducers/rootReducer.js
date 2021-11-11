import {combineReducers} from "redux";
import storage from "redux-persist/lib/storage";
import {auth} from "./auth";
import {persistReducer} from "redux-persist";
import {user} from "./user";
import {ticket} from "./ticket";


const persistConfig = {
    key: "root",
    storage,
    whitelist: [ "auth", "user", "ticket" ]
}

const rootReducer = combineReducers({auth, user, ticket});

export default persistReducer(persistConfig, rootReducer);