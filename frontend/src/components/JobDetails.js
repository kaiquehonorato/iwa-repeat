import React, { useEffect, useMemo } from 'react';
import {useLocation} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';

import {receiveCurrentJob, updateCurrentJob} from '../redux/util/controller';

const SingleJob = () => {

	const dispatch = useDispatch();
	const jobs = useSelector(state => state.job);
	const session = useSelector(state => state.session);
	const loggedIn = Boolean(session.email);

	// Get ID from the URL
    const useQuery = () => {
        const { search } = useLocation();
        return useMemo(() => new URLSearchParams(search), [search]);
    };
    let query = useQuery();

	useEffect(() => {
		axios.get(`/api/getJobById?id=${query.get("id")}`)
			.then(resp => {
				const updatedJobs = {...jobs, selectedJob: resp.data.job}
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
                    <p>Everything about {jobs.selectedJob.job_title} position</p>
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