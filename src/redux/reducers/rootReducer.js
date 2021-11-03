import {combineReducers} from "redux";
import storage from "redux-persist/lib/storage";
import {auth} from "./auth"
import {persistReducer} from "redux-persist";
import {setUserId} from "./user";


const persistConfig = {
    key: "root",
    storage,
    whitelist: [ "auth", "setUserId" ]
}

const rootReducer = combineReducers({auth, setUserId});

export default persistReducer(persistConfig, rootReducer);