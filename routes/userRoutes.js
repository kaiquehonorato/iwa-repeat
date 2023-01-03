import express from 'express';
import {check} from 'express-validator';

import userController from '../controllers/userController';

const router = express.Router();

// Get all values of logged in user
router.get('/getUser', userController.getUser);

// Post request Login page
router.post('/login', [
		check('email').isEmail(),
		check('password').isLength({min: 6})
	], userController.login);

// Post request Signup page
router.post('/signup', [
		check('name').not().isEmpty(),
		check('username').not().isEmpty().isLength({min: 4, max: 9}),
		check('email').isEmail(),
		check('password').isLength({min: 6})
	], userController.signup);

// Logout handle
router.delete('/logout', userController.logout);

// Post request Job Post
router.post('/createJob', [
	check('job_title').not().isEmpty(),
	check('company_name').not().isEmpty(),
	check('company_location').not().isEmpty(),
	check('job_description').not().isEmpty(),
	check('job_responsibilities').not().isEmpty(),
	check('required_skills').not().isEmpty()
], userController.createJob);

// Get request
router.get('/getJob', userController.getJob);

// Update job
router.put('/updateJob', [
	check('job_title').not().isEmpty(),
	check('job_description').not().isEmpty(),
	check('company_name').not().isEmpty(),
	check('company_description').not().isEmpty(),
	check('responsibilities').not().isEmpty(),
	check('required_skills').not().isEmpty(),
	check('posted_date').not().isEmpty(),
], userController.updateJob);

// Delete job
router.delete('/deleteJob', [
	check('job_identifier').not().isEmpty(),
	check('creator').not().isEmpty(),
], userController.deleteJob);

export default router;