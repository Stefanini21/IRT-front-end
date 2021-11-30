import {combineReducers} from "redux";
import storage from "redux-persist/lib/storage";
import {auth} from "./auth";
import {persistReducer} from "redux-persist";
import {user} from "./user";
import {ticket} from "./ticket";
import {message} from "./message";
import {flipFlag} from "./flag";
import {kanbanFilter} from "./kanbanFilter";
import {decrementTime} from "./jtwToken"


const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "user", "ticket", "kanbanFilter", 'decrementTime'],
};

const rootReducer = combineReducers({auth, user, ticket, message, flipFlag, kanbanFilter, decrementTime});

export default persistReducer(persistConfig, rootReducer); 