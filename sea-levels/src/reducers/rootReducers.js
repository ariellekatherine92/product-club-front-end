import locationReducer from "./inputLocation";
import { combineReducers } from "redux";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: ["location"]
};


const rootReducers = combineReducers({
location: locationReducer,
});

export default rootReducers;
persistReducer(rootPersistConfig, rootReducers);