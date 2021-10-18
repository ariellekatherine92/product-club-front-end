import locationReducer from "./inputLocation";
import { combineReducers } from "redux";

const allReducers = combineReducers({
location: locationReducer,
});

export default allReducers;