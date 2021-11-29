import {combineReducers} from "redux";
import storage from "redux-persist/lib/storage";
import {auth} from "./auth";
import {persistReducer} from "redux-persist";
import {user} from "./user";
import {ticket} from "./ticket";
import {message} from "./message";
import {flipFlag} from "./flag";
import {kanbanFilter} from "./kanbanFilter";
import {jwtCounter} from "./jwtCounter";


const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth", "user", "ticket", "kanbanFilter", "jwtCounter"],
};

const rootReducer = combineReducers({auth, user, ticket, message, flipFlag, kanbanFilter, jwtCounter});

export default persistReducer(persistConfig, rootReducer);