import React, {Component, Fragment} from "react";
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import LoadingBar from 'react-redux-loading';
import Dashboard from "./Dashboard";
import QuestionDetails from "./QuestionDetails";
import NewQuestion from "./NewQuestion";
import LeaderBoard from "./LeaderBoard";
import Login from "./Login";
import {handleInitialData} from "../common/common";

class App extends Component {
	componentDidMount() {
		this.props.dispatch(handleInitialData());
	}

	render() {
		return (
			<Router>
				<Fragment>
					<LoadingBar/>
					<div className='container'>
						<div>
							<Route path='/' exact component={Dashboard}/>
							<Route path='/login' exact component={Login}/>
							<Route path='/questions/:question_id' component={QuestionDetails}/>
							<Route path='/add' component={NewQuestion}/>
							<Route path='/leaderboard' component={LeaderBoard}/>
						</div>
					</div>
				</Fragment>
			</Router>
		);
	}
}

const mapStateToProps = ({users}) => {
	return {
		loading: users === null || users === undefined
	};
};

export default connect(mapStateToProps)(App);
