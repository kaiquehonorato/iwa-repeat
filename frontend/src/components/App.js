import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';

import Toast from './Toast';
import Navbar from './Navbar';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import Home from './Home';
import Privacy from './Privacy';
import Footer from './Footer';
import CreateJob from './CreateJob';
import EditJob from './EditJob';
import JobDetails from './JobDetails';

const App = () => {

	const dispatch = useDispatch();
	const session = useSelector(state => state.session);
	const loggedIn = Boolean(session.email);

	let routes;
	if (loggedIn) {
		routes = (
			<Switch>
				<Route path="/" exact>
					<Home />
				</Route>
				<Route path="/privacy" exact>
					<Privacy />
				</Route>
				<Route path="/create_job" exact>
					<CreateJob />
				</Route>
				<Route path="/edit_job" exact>
					<EditJob />
				</Route>
				<Route path="/job_details" exact>
					<JobDetails />
				</Route>
				<Redirect to="/" />
			</Switch>
			
		)
	} else {
		routes = (
			<Switch>
				<Route path="/" exact>
					<Home />
				</Route>
				<Route path="/job_details" exact>
					<JobDetails />
				</Route>
				<Route path="/login" exact>
					<LoginPage />
				</Route>
				<Route path="/signup" exact>
					<SignupPage />
				</Route>
				<Route path="/privacy" exact>
					<Privacy />
				</Route>
				<Redirect to="/login" />
			</Switch>
		)
	}

	return (
		<React.Fragment>
			<Navbar />
			<Toast />
			{routes}
			<Footer />
		</React.Fragment>
	)
};

export default App;