import {RECEIVE_CURRENT_JOB, UPDATE_CURRENT_JOB} from '../util/controller';

const dummyJob = { job_title: '', company_name: '', company_location: '', job_description: '', job_responsibilities: '', required_skills: '', posted_date: '', creator: '', job_identifier: '' };
const _nullSession = {
    allJobs: [dummyJob],
    selectedJob: dummyJob
};
const job = (state = _nullSession, { type, job }) => {
  Object.freeze(state);
  switch (type) {
    case RECEIVE_CURRENT_JOB:
    	return job;
	case UPDATE_CURRENT_JOB:
    	return job;
    default:
    	return state;
  }
};

export default job;