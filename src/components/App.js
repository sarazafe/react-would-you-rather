import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import LoadingBar from 'react-redux-loading';
import Dashboard from './Dashboard';
import QuestionDetails from './QuestionDetails';
import NewQuestion from './NewQuestion';
import LeaderBoard from './LeaderBoard';
import Login from './Login';
import {handleInitialData} from '../common/common';
import {QuestionNotFound} from './QuestionNotFound';
import './App.css';

class App extends Component {
	componentDidMount() {
		this.props.dispatch(handleInitialData());
	}

	render() {
		return (
			<Router>
				<Fragment>
					<LoadingBar style={{backgroundColor: '#C9ADA7', height: '5px'}}/>
					<div className='app'>
						<div>
							<Route path='/' exact component={Dashboard}/>
							<Route path='/login' exact component={Login}/>
							<Route path='/questions/:question_id' component={QuestionDetails}/>
							<Route path='/add' component={NewQuestion}/>
							<Route path='/leaderboard' component={LeaderBoard}/>
							<Route path='/404' component={QuestionNotFound}/>
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
