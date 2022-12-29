import React from 'react';
import {useSelector, useDispatch} from 'react-redux';

const Home = () => {

	const dispatch = useDispatch();
	const job = useSelector(state => state.job);
	const session = useSelector(state => state.session);
	const loggedIn = Boolean(session.email);

	return (
		<React.Fragment>
			<div className="header">
				<div className="container">
					<div className="header-text">Welcome to JobPedia</div>
                    <p>A Job Portal listing different jobs for job seekers and helping companies get good employees</p>
				</div>
			</div>
			<div className="container">
				<div className="create_job">
					
				</div>
			</div>
		</React.Fragment>
	)
}

export default Home;