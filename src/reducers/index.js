import { combineReducers } from 'redux';
import {loggedUser} from "./loggedUser";
import {users} from "./users";
import { loadingBarReducer } from 'react-redux-loading';

export default combineReducers({
	loggedUser,
	users,
	loadingBar: loadingBarReducer,
});