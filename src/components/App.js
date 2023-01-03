import React, { Suspense } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';

import Toast from './Toast';

const Navbar = React.lazy(() => import('./Navbar'));
const LoginPage = React.lazy(() => import('./LoginPage'));
const SignupPage = React.lazy(() => import('./SignupPage'));
const Home = React.lazy(() => import('./Home'));

const App = () => {

	const dispatch = useDispatch();
	const session = useSelector(state => state.session);
	const loggedIn = Boolean(session.email);

	let routes;
	if (loggedIn) {
		routes = (
			<Suspense fallback={<div>Loading...</div>}>
				<Switch>
					<Route path="/" exact>
						<Home />
					</Route>
					<Redirect to="/" />
				</Switch>
			</Suspense>
			
		)
	} else {
		routes = (
			<Suspense fallback={<div>Loading...</div>}>
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
			</Suspense>
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