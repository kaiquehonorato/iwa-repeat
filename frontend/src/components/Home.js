import React, { useEffect } from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';

import {receiveCurrentJob, updateCurrentJob, receiveSuccessMessage, receiveFailureMessage} from '../redux/util/controller';

const Home = () => {

	const dispatch = useDispatch();
	const history = useHistory();
	const jobs = useSelector(state => state.job);
	const session = useSelector(state => state.session);
	const loggedIn = Boolean(session.email);

	useEffect(() => {
		axios.get('/api/getJob')
			.then(resp => {
				console.log("jobs", resp.data)
				const updatedJobs = {...jobs, allJobs: resp.data.jobs}
				dispatch(updateCurrentJob(updatedJobs));
			})
	}, []);

	// Scroll Top
    useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const btnClickHandler = (job) => {
		console.log("job", job);
        dispatch(updateCurrentJob({ ...jobs, selectedJob: job }));
	}

	const viewHandler = (job) => {
		btnClickHandler(job);
		history.push('/job_details');
	}

	const editHandler = (job) => {
		btnClickHandler(job);
		history.push('/edit_job');
	}

	const deleteHandler = (job) => {
		btnClickHandler(job);
		const data = {
			job_identifier: jobs.selectedJob.job_identifier,
			creator: jobs.selectedJob.creator
		}
		axios.delete(`/api/deleteJob?job_identifier=${jobs.selectedJob.job_identifier}&creator=${jobs.selectedJob.creator}`)
			.then(resp => {
				console.log("resp is", resp);
				if (resp.data.type == 'success') {
					return dispatch(receiveSuccessMessage({success: resp.data.message}));
				}
				return dispatch(receiveFailureMessage({failure: resp.data.message}));
			})
			.catch(err => {
				console.log("Err", err);
				return dispatch(receiveFailureMessage({failure: "Something went wrong"}));
			})
	}

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
						{jobs && jobs.allJobs && jobs.allJobs.length && jobs.allJobs.map(job => {
							return (
								<div className="single_job" key={job.job_identifier}>
									<div className="job_info">
										<Link to={`job_details`}><h2>{job.job_title}</h2></Link>
										<div className="company">{job.company_name}</div>
										<div className="location">{job.company_location}</div>
									</div>
									<div className="job_apply">
										<button className="apply_button" onClick={() => viewHandler(job)}>View</button>
										<button className="edit_button" onClick={() => editHandler(job)}>Edit</button>
										<button className="remove_button" onClick={() => deleteHandler(job)}>Delete</button>
									</div>
								</div>
							)
						})}
					</div>
				</div>
			</div>
		</React.Fragment>
	)
}

export default Home;