import { showLoading, hideLoading } from 'react-redux-loading';
import {getUsers} from '../actions/users'
import {getInitialData} from './api';

/**
 * Handler for initial data. It gets from _DATA.js file the stored information to start working with
 * @returns {function(*): Promise<void>}
 */
export const handleInitialData = () => {
	return (dispatch) => {
		dispatch(showLoading());
		return getInitialData()
			.then(({users}) => {
				dispatch(getUsers(users));
				dispatch(hideLoading());
			});
	};
};