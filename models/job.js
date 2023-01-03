import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const jobSchema = new Schema({
	job_title: { type: String, required: true },
	company_name: { type: String, required: true },
	company_location: { type: String, required: true },
	job_description: { type: String, required: true },
	job_responsibilities: { type: String, required: true },
	required_skills: { type: String, required: true },
	posted_date: { type: String, required: true },
    creator: { type: String, required: true },
	job_identifier: { type: String, required: true },
});

export default mongoose.model('Job', jobSchema);