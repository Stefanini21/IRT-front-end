import {combineReducers} from "redux";
import storage from "redux-persist/lib/storage";
import {auth} from "./auth";
import {persistReducer} from "redux-persist";
import {user} from "./user";
import {flipFlag} from "./flag";


const persistConfig = {
    key: "root",
    storage,
    whitelist: [ "auth", "user" ]
}

const rootReducer = combineReducers({auth, user, flipFlag});

export default persistReducer(persistConfig, rootReducer);