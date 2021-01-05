import React, {Component} from 'react';
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom'
import {setLoggedUser} from "../actions/loggedUser";

/**
 * Component for login page
 */
class Login extends Component {
	state = {
		selectedUser: '',
	};

	/**
	 * Handler for updating the selected user property of state
	 * @param event - the event with selected user
	 */
	handleSelectedUserChange = event => {
		this.setState({
			selectedUser: event.target.value,
		});
	};

	/**
	 * Logs the user in the application.
	 * It updates the store with selected user and goes back.
	 */
	loginUser = () => {
		this.props.dispatch(setLoggedUser(this.state.selectedUser));
		this.props.history.goBack();
	}

	render() {
		const {users} = this.props;
		const {selectedUser} = this.state;

		return (
			<div className='login'>
				<div className='login-header'>
					<div className='login-header-title'>Welcome to 'Would you rather'!!</div>
					<div className='login-header-subtitle'>Please, login before continue</div>
				</div>

				<div className='login-body'>
					<div className='login-body-title'>Log in</div>
					<div className='login-body-users'>
						<select value={selectedUser || 'selectUser'} onChange={this.handleSelectedUserChange}>
							<option value="selectUser" disabled>Select user</option>
							{
								users.map(user => (
									<option key={user.id} value={user.id}>{user.name}</option>
								))
							}
						</select>
					</div>
					<div className='login-body-button'>
						<button onClick={this.loginUser}>
							Log in
						</button>
					</div>
				</div>

			</div>
		);
	}
}

function mapStateToProps({users}) {
	return {
		users: Object.values(users),
	}
}

export default withRouter(connect(mapStateToProps)(Login));