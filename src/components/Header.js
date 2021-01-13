import React, {Component} from 'react';
import {connect} from "react-redux";
import {logoutUser} from "../actions/loggedUser";
import './Header.css';

/**
 * Component for the header
 */
class Header extends Component {
	/**
	 * Logs the user out of session
	 */
	logoutUser = ()=> {
		this.props.dispatch(logoutUser());
	};

	render() {
		const {name, avatarURL} = this.props.loggedUser;
		return (
			<div className='header'>
				<div className='header-title'>Would you rather?</div>
				<div className='header-logged-user'>
					<div className='header-logged-user-avatar'><img src={avatarURL} alt={`${name}'s avatar`}/></div>
					<div className='header-logged-user-name'>{name}</div>
					<div className='header-logged-user-logout'>
						<button onClick={this.logoutUser}>Logout</button>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps({loggedUser}) {
	return {
		loggedUser,
	};
}

export default connect(mapStateToProps)(Header);