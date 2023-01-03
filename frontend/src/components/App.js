import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';

import Toast from './Toast';
import Navbar from './Navbar';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import Home from './Home';

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
				<Redirect to="/" />
			</Switch>
			
		)
	} else {
		routes = (
			<Switch>
				<Route path="/" exact>
					<Home />
				</Route>
				<Route path="/login" exact>
					<LoginPage />
				</Route>
				<Route path="/signup" exact>
					<SignupPage />
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
		</React.Fragment>
	)
};

export default App;