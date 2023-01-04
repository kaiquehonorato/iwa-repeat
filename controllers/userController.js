import {validationResult} from 'express-validator';
import bcryptjs from 'bcryptjs';
import crypto from 'crypto';

import config from '../config';
import User from '../models/user';
import Job from '../models/job';

// Get all values of logged in user
const getUser = async (req, res, next) => {
	if (req.session.email) {
	const email = req.session.email;
		let identifiedUser;
		try {
			identifiedUser = await User.findOne({email}).select('-password');
		} catch(err) {
			const error = new HttpError('Error in finding email', 500);
			return next(error);
		}
		// const blogsByUser = identifiedUser.blogs.length;
		if (identifiedUser) {
			res.status(200).json({
				user: identifiedUser.toObject({getters: true}),
				message: 'Profile updated',
				loggedIn: true
			});
		}
	} else {
		res.status(200).json({
			loggedIn: false
		});
	}
};

const login = async (req, res, next) => {
	// get input values
	const {email, password} = req.body;
	// validation result
	const errors = validationResult(req);
	if(!errors.isEmpty()) {
		const error = new HttpError("Could not Log you in, check your data", 422);
		return next(error);
	}

	// Find user from DB to check login
	let user;
	try {
		user = await User.findOne({email: email});
	} catch(err) {
		const error = new HttpError('Signing in failed, please try again', 500);
		return next(error);
	}
	if (!user) {
		return res.json({
			message: 'Entered email is not registered with us',
			type: 'failure'
		});
	}
	// compare entered password and db password
	let isValidPassword = false;
	try {
		isValidPassword = await bcryptjs.compare(password, user.password);
	} catch (err) {
		const error = new HttpError("Some problem while comparing password at server", 422);
		return next(error);
	}
	// Password comparison failed
	if (!isValidPassword) {
		// console.log('Wrong password');
		return res.json({
			message: 'Invalid credentials',
			type: 'failure'
		});
	}
	// console.log("Correct credentials, Logged in");
	// Logged In create session
	if (!req.session.email) {
		req.session.email = email;
		req.session.username = user.username;
		req.session.account = user.account;
	}
	res.status(200).json({
		user: user.toObject({getters: true}),
		redirect: true,
		type: 'success',
		message: 'Login successful'
	});
};

const signup = async (req, res, next) => {

	// get input values
	const {name, username, email, account, password} = req.body;
	// check if entered username exists in DB
	let existingUserName;
	try {
		existingUserName = await User.findOne({username: username});
	} catch(err) {
		const error = new HttpError('Signing up failed, please try again', 500);
		return next(error);
	}
	if (existingUserName) {
		return res.json({
			message: 'Entered username is taken',
			type: 'failure'
		});
	}
	// check if entered email already exists in DB
	let existingUser;
	try {
		existingUser = await User.findOne({email: email});
	} catch(err) {
		const error = new HttpError('Signing up failed, please try again', 500);
		return next(error);
	}
	if (existingUser) {
		return res.json({
			message: 'Entered email is already registered with us',
			type: 'failure'
		});
	}
	// Present time to readable String
	const date = new Date;
	const year = date.getFullYear();
	const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
	const monthString = months[date.getMonth()];
	const day = date.getDate();
	const dateString = day + " " + monthString + ", " + year;
	// validation result
	const errors = validationResult(req);
	if(!errors.isEmpty()) {
		// const error = new HttpError("Could not create User, check your data", 422);
		// return next(error);
		return res.json({
			message: 'Could not create User, check your data',
			type: 'failure'
		});
	}
	// hash the password
	let hashedPassword;
	try {
		hashedPassword = await bcryptjs.hash(password, 12);
	} catch (err) {
		const error = new HttpError("Could not generate user, please try again", 500);
		return next(error);
	}
	const createdUser = new User({
		name, // name: name
		username,
		email,
		account,
		password: hashedPassword,
		created_date: dateString
	});
	// Create a new user
	try {
		await createdUser.save();
	} catch (err) {
		const error = new HttpError("Signing up failed, please try again");
		return next(error);
	}
	// console.log("New user created");
	// Logged In create session
	if (!req.session.email) {
		req.session.email = email;
		req.session.username = username;
		req.session.account = account;
	}
	
	res.status(201).json({
		user: createdUser.toObject({getters: true}),
		redirect: true,
		type: 'success',
		message: 'Signup successful'
	});
};

// Logout
const logout = (req, res, next) => {
	req.session.destroy(err => {
		if (err) {
			return res.json({message: "Unable to logout"});
		}
		res.clearCookie(config.sess_name);
		res.json({
			redirect: true,
			message: 'Logged out'
		});
	})
};

// CreateJob
const createJob = async (req, res, next) => {
	if (req.session.email && req.session.account == 'employer') {
		// validation result
		const errors = validationResult(req);
		if(!errors.isEmpty()) {
			return res.json({
				message: 'Could not create Job, please check inputs',
				type: 'failure'
			});
		}
		// get input values
		const {job_title, company_name, company_location, job_description, job_responsibilities, required_skills} = req.body;
		// Present time to readable String
		const date = new Date;
		const year = date.getFullYear();
		const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
		const monthString = months[date.getMonth()];
		const day = date.getDate();
		const dateString = day + " " + monthString + ", " + year;
		const createdJob = new Job({
			job_title,
			company_name,
			company_location,
			job_description,
			job_responsibilities,
			required_skills,
			posted_date: dateString,
			creator: req.session.username,
			job_identifier: crypto.randomBytes(16).toString("hex"),
		});
		// Create a new job
		try {
			await createdJob.save();
		} catch (err) {
			const error = new HttpError("Signing up failed, please try again");
			return next(error);
		}
		// console.log("New job created");
		res.status(201).json({
			job: createdJob.toObject({getters: true}),
			redirect: true,
			type: 'success',
			message: 'Job post created'
		});
	} else {
		res.status(200).json({
			message: 'Permission denied',
			type: 'failure'
		});
	}
};

// Get all jobs
const getJob = async (req, res, next) => {
	// console.log("getJob route hit");
	let allJobs;
	try {
		allJobs = await Job.find();
	} catch(err) {
		const error = new HttpError('Error in finding job', 500);
		return next(error);
	}
	// console.log("allJobs", allJobs);
	if (allJobs) {
		res.status(200).json({
			jobs: allJobs,
			message: 'Jobs fetched successfully',
			loggedIn: true
		});
	}
};

const getJobById = async (req, res, next) => {
	// console.log("getJob route hit");
	let identifiedJob;
	try {
		identifiedJob = await Job.findOne({ "_id": req.query.id });
	} catch(err) {
		return res.json({
			message: 'Could not find Job',
			type: 'failure'
		});
	}
	// console.log("identifiedJob", identifiedJob);
	if (identifiedJob) {
		res.status(200).json({
			job: identifiedJob,
			message: 'Job fetched',
		});
	}
}

// Update job
const updateJob = async (req, res, next) => {
	// console.log("made inside update job route");
	if (req.session.email && req.session.account == 'employer') {
		// validation result
		const errors = validationResult(req);
		if(!errors.isEmpty()) {
			return res.json({
				message: 'Could not update Job, please check inputs',
				type: 'failure'
			});
		}
		if (req.session.username != req.body.creator) {
			res.status(200).json({
				message: 'Permission denied',
				type: 'failure'
			});
		}
		// get input values
		// console.log("req.body", req.body);
		const {job_title, company_name, company_location, job_description, job_responsibilities, required_skills, job_identifier} = req.body;
		if (!job_identifier) {
			return res.json({
				message: 'Could not update Job as job not found',
				type: 'failure'
			});
		}
		// Present time to readable String
		const date = new Date;
		const year = date.getFullYear();
		const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
		const monthString = months[date.getMonth()];
		const day = date.getDate();
		const dateString = day + " " + monthString + ", " + year;
		let updatedJob;
		try {
			updatedJob = await Job.findOne({ job_identifier: job_identifier });
		} catch(err) {
			res.json({
				message: 'Cannot find blog to edit',
				type: 'failure'
			});
		}
		if (updatedJob) {
			// console.log("updatedJob", updatedJob);
			updatedJob.job_title = job_title;
			updatedJob.company_name = company_name;
			updatedJob.company_location = company_location;
			updatedJob.job_description = job_description;
			updatedJob.job_responsibilities = job_responsibilities;
			updatedJob.required_skills = required_skills;
			
			// update job
			try {
				await updatedJob.save();
			} catch (err) {
				const error = new HttpError("Cannot update blog");
				return next(error);
			}
			// console.log("Job updated");
			res.status(201).json({
				job: updatedJob.toObject({getters: true}),
				redirect: true,
				type: 'success',
				message: 'Job post updated'
			});
		}		
	} else {
		res.status(200).json({
			message: 'Permission denied',
			type: 'failure'
		});
	}
};

const deleteJob = async (req, res, next) => {
	if (req.session.email && req.session.account == 'employer') {
		// console.log("req.session", req.session);
		// console.log("req.query", req.query);
		// get input values
		const {job_identifier, creator} = req.query;
		if (req.session.username != creator) {
			// console.log("made here");
			return res.json({
				message: 'Permission denied',
				type: 'failure'
			});
		}
		let deletedJob;
		try {
			deletedJob = await Job.findOne({job_identifier: job_identifier});
		} catch(err) {
			return res.json({
				message: 'Could not find job to delete',
				type: 'failure'
			});
		}
		if (!deletedJob) {
			return res.json({
				message: 'Could not find job to delete',
				type: 'failure'
			});
		}
		// delete job
		try {
			await deletedJob.remove();
		} catch(err) {
			return res.status(200).json({
				message: 'Could not delete Blog',
				type: 'failure'
			});
		}

		// return with success message and all jobs to update redux
		let allJobs;
		try {
			allJobs = await Job.find();
		} catch(err) {
			const error = new HttpError('Error in finding job', 500);
			return next(error);
		}
		if (allJobs) {
			return res.json({
				message: 'Job removed successfully',
				type: 'success',
				jobs: allJobs.map(s => s.toObject({getters:true})),
			});
		}
	} else {
		// console.log("last");
		res.status(200).json({
			message: 'Permission denied',
			type: 'failure'
		});
	}
};

export default { getUser, login, signup, logout, createJob, getJob, getJobById, updateJob, deleteJob };