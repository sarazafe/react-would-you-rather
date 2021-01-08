import React, {Component} from 'react';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import Header from "./Header";
import {Nav} from "./Nav";

/**
 * Component for leader board pages
 */
class LeaderBoard extends Component {
	render() {
		const {loggedUser} = this.props;
		if (!loggedUser) {
			return <Redirect push to='login'/>;
		}

		return (
			<div>
				<Header/>
				<Nav/>
				LeaderBoard page
			</div>
		);
	}
}

const mapStateToProps = ({loggedUser}) => {
	return {
		loggedUser,
	};
};

export default connect(mapStateToProps)(LeaderBoard);