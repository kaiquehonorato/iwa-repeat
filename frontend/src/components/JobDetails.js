import React, { useEffect } from 'react';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';

import {receiveCurrentJob, updateCurrentJob} from '../redux/util/controller';

const SingleJob = () => {

	const dispatch = useDispatch();
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

	return (
		<React.Fragment>
			<div className="header">
				<div className="container">
					<div className="header-text">Job Details</div>
                    <p>Job details at a glance</p>
				</div>
			</div>
			<div className="p-40">
				<div className="container">
					<div className="job_details">
						<h3>Job Profile:</h3>
						<div className="job_title">{jobs.selectedJob.job_title}</div>
						<p className="company">{jobs.selectedJob.company_name}</p>
						<p className="location mb-30">{jobs.selectedJob.company_location}</p>
						<h3>Job Description:</h3>
						<p className="description mb-30">{jobs.selectedJob.job_description}</p>
						<h3>Job Responsibilities:</h3>
						<p className="description mb-30">{jobs.selectedJob.job_responsibilities}</p>
						<h3>Required Skills:</h3>
						<p className="description mb-30">{jobs.selectedJob.required_skills}</p>
						<button className="apply_button">Apply now</button>
					</div>
				</div>
			</div>
		</React.Fragment>
	)
}

export default SingleJob;