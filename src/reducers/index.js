import { combineReducers } from 'redux';
import {loggedUser} from "./loggedUser";
import {users} from "./users";

export default combineReducers({
	loggedUser,
	users,
});