import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';

import {receiveSuccessMessage, receiveFailureMessage} from '../redux/util/controller';

const CreateJob = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    // Scroll Top
    useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

    const [jobTitle, setJobTitle] = useState('');
    const [jobTitleError, setJobTitleError] = useState('');
    const jobTitleHandler = (event) => {
		setJobTitle(event.target.value);
		setJobTitleError('');
	}

    const [companyName, setCompanyName] = useState('');
    const [companyNameError, setCompanyNameError] = useState('');
    const companyNameHandler = (event) => {
		setCompanyName(event.target.value);
		setCompanyNameError('');
	}

    const [companyLocation, setCompanyLocation] = useState('');
    const [companyLocationError, setCompanyLocationError] = useState('');
    const companyLocationHandler = (event) => {
		setCompanyLocation(event.target.value);
		setCompanyLocationError('');
	}

    const [jobDescription, setJobDescription] = useState('');
    const [jobDescriptionError, setJobDescriptionError] = useState('');
    const jobDescriptionHandler = (event) => {
		setJobDescription(event.target.value);
		setJobDescriptionError('');
	}

    const [responsibilities, setResponsibilities] = useState('');
    const [responsibilitiesError, setResponsibilitiesError] = useState('');
    const responsibilitiesHandler = (event) => {
		setResponsibilities(event.target.value);
		setResponsibilitiesError('');
	}

    const [skills, setSkills] = useState('');
    const [skillsError, setSkillsError] = useState('');
    const skillsHandler = (event) => {
		setSkills(event.target.value);
		setSkillsError('');
	}

    // Validation
	const validate = () => {
        if (!jobTitle) {
            setJobTitleError('Please enter job title');
        }
        if (!companyName) {
            setCompanyNameError('Please enter company name');
        }
        if (!companyLocation) {
            setCompanyLocationError('Please enter company location');
        }
        if (!jobDescription) {
            setJobDescriptionError('Please enter job description');
        }
        if (!responsibilities) {
            setResponsibilitiesError('Please enter job responsibilities');
        }
        if (!skills) {
            setSkillsError('Please enter skills required');
        }
        if (!jobTitle || !companyName || !companyLocation || !jobDescription || !responsibilities || !skills) {
            return false;
        }
        return true;
    };

    // Form Submit
	const handleSubmit = (event) => {
        event.preventDefault();
		const isValid = validate();
		if (isValid) {
			// Create Job
			const data = {
                job_title: jobTitle,
                company_name: companyName,
                company_location: companyLocation,
                job_description: jobDescription,
                job_responsibilities: responsibilities,
                required_skills: skills
            }
            axios.post('/api/createJob', data)
                .then(resp => {
                    console.log("resp is", resp);
                    if (resp.data.type == 'success') {
                        return dispatch(receiveSuccessMessage({success: resp.data.message}));
                    }
                    return dispatch(receiveFailureMessage({failure: resp.data.message}));
                })
                .catch(err => {
                    return dispatch(receiveFailureMessage({failure: "Something went wrong"}));
                })
			// dispatch(login(user));
		}
    };

    return (
        <React.Fragment>
			<div className="header">
				<div className="container">
					<div className="header-text">Create Job Post</div>
                    <p>Add a new job post from this page</p>
				</div>
			</div>
			<div className="p-40">
				<div className="container">
                    <div className="all_jobs login-form">
                        <div className="title">Create Job</div>
                        <form>						
                            <label htmlFor="jobTitle">Job Title</label>
                            <input 
                                type="text"
                                id="jobTitle"
                                value={jobTitle}
                                onChange={jobTitleHandler}
                                className={`${(jobTitleError !== "") && "red-input"}`}
                            />
                            {jobTitleError !== "" && <p className="error_text"><i>!</i> &nbsp;{jobTitleError}</p>}

                            <label htmlFor="companyName">Company name</label>
                            <input 
                                type="text"
                                id="companyName"
                                value={companyName}
                                onChange={companyNameHandler}
                                className={`${(companyNameError !== "") && "red-input"}`}
                            />
                            {companyNameError !== "" && <p className="error_text"><i>!</i> &nbsp;{companyNameError}</p>}

                            <label htmlFor="companyLocation">Company location</label>
                            <input 
                                type="text"
                                id="companyLocation"
                                value={companyLocation}
                                onChange={companyLocationHandler}
                                className={`${(companyLocationError !== "") && "red-input"}`}
                            />
                            {companyLocationError !== "" && <p className="error_text"><i>!</i> &nbsp;{companyLocationError}</p>}

                            <label htmlFor="jobDescription">Job Description</label>
                            <textarea value={jobDescription} onChange={jobDescriptionHandler} className="textarea_block" />
                            {jobDescriptionError !== "" && <p className="error_text"><i>!</i> &nbsp;{jobDescriptionError}</p>}

                            <label htmlFor="responsibilities">Job Responsibilities</label>
                            <textarea value={responsibilities} onChange={responsibilitiesHandler} className="textarea_block" />
                            {responsibilitiesError !== "" && <p className="error_text"><i>!</i> &nbsp;{responsibilitiesError}</p>}

                            <label htmlFor="skills">Required Skills</label>
                            <textarea value={skills} onChange={skillsHandler} className="textarea_block" />
                            {skillsError !== "" && <p className="error_text"><i>!</i> &nbsp;{skillsError}</p>}

                            <button type="submit" onClick={handleSubmit}>Create Job</button>
                        
                        </form>
                    </div> 
                </div>
            </div>
        </React.Fragment>
    )
}

export default CreateJob;