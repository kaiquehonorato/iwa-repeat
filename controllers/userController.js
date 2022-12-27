import {validationResult} from 'express-validator';
import bcryptjs from 'bcryptjs';

import config from '../config';
import User from '../models/user';

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
		console.log('Wrong password');
		return res.json({
			message: 'Invalid credentials',
			type: 'failure'
		});
	}
	console.log("Correct credentials, Logged in");
	// req.session.email = email; // email from req.body
	// console.log(req.session);
	if (!req.session.email) {
		req.session.email = email;
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
	const {name, username, email, password} = req.body;
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
	console.log("New user created");
	if (!req.session.email) {
		req.session.email = email;
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
			message: 'User logged out'
		});
	})
};


export default { getUser, login, signup, logout };