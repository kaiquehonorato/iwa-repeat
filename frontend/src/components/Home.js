import React, { useEffect } from 'react';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';

const Home = () => {

	const dispatch = useDispatch();
	const jobs = useSelector(state => state.job);
	const session = useSelector(state => state.session);
	const loggedIn = Boolean(session.email);

	// Scroll Top
    useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<React.Fragment>
			<div className="header">
				<div className="container">
					<div className="header-text">Welcome to JobPedia</div>
                    <p>A Job Portal listing different jobs for job seekers and helping companies get good employees</p>
				</div>
			</div>
			<div className="p-40">
				<div className="container">
					{loggedIn && session.account == "employer" &&
						<div className="create_job">
							<h2>Click below to post a free job listing on JobPedia</h2>
							<Link className="cta_button" to="/create_job">Create now</Link>
						</div>
					}
					<div className="all_jobs">
						<div className="single_job">
							<div className="job_info">
								<Link to={`create_job`}><h2>Senior Full Stack Engineer</h2></Link>
								<div className="company">Google</div>
								<div className="location">Dublin, County Dublin, Ireland</div>
							</div>
							<div className="job_apply">
								<Link to={`create_job`}><button className="apply_button" onClick={() => {}}>View</button></Link>
								<button className="remove_button" onClick={() => {}}>Delete</button>
							</div>
						</div>
						<div className="single_job">
							<div className="job_info">
								<h2>Graphic Designer</h2>
								<div className="company">Google</div>
								<div className="location">Dublin, County Dublin, Ireland</div>
							</div>
							<div className="job_apply">
								<button className="apply_button" onClick={() => {}}>View</button>
								<button className="remove_button" onClick={() => {}}>Delete</button>
							</div>
						</div>
					</div>

				</div>
			</div>
		</React.Fragment>
	)
}

export default Home;