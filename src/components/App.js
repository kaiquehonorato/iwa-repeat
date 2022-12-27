import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';

import Navbar from './Navbar';
import Modal from './Modal';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';

const App = () => {

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
					<Login />
				</Route>
				<Route path="/signup" exact>
					<Signup />
				</Route>
				<Redirect to="/login" />
			</Switch>
		)
	}

	return (
		<React.Fragment>
			<Navbar />
			<Modal />
			{routes}
		</React.Fragment>
	)
};

export default App;