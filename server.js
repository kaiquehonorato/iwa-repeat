import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';

import config from './config';
import userRoutes from './routes/userRoutes';

const server = express();

// Does not let users know that we are using express
server.disable('x-powered-by');

// Parse json body
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Use router for all requests at ./api
server.use('/api', userRoutes);

// Use public folder as static server
server.use(express.static('public'));

// Serve index file for all cases except for defined above
server.use((req, res, next) => {
	res.render('index');
});

// Error handling
server.use((error, req, res, next) => {
	// if response is already sent via error handling, just return that error and do not execute our custom error handling
	if (res.headerSent) {
		return next(error);
	}
	res.status(error.code || 500).json({message: error.message || 'An unknown error occured!'});
});

// Listen server
server.listen(config.port, config.host, () => {
	console.info('Express listening on port', config.port);
});