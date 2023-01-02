import React from 'react';
import {useSelector, useDispatch} from 'react-redux';

const Home = () => {

	const dispatch = useDispatch();
	const jobs = useSelector(state => state.job);
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
			<div className="p-60">
				<div className="container">
					{loggedIn &&
						<div className="create_job">
							<h2>Create Job Listing</h2>
							<Link className="cta_button" to="/create_job">Take Test Now</Link>
						</div>
					}
				</div>
			</div>
		</React.Fragment>
	)
}

export default Home;