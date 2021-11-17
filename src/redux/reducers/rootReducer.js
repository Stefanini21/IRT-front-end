import {combineReducers} from "redux";
import storage from "redux-persist/lib/storage";
import {auth} from "./auth";
import {persistReducer} from "redux-persist";
import {user} from "./user";
import { ticket } from "./ticket";
import {message} from "./message";
import {flipFlag} from "./flag";



const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "user", "message", "ticket"],
};

const rootReducer = combineReducers({auth, user, ticket, message, flipFlag});

export default persistReducer(persistConfig, rootReducer);