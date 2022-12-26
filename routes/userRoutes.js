import express from 'express';

import userController from '../controllers/userController';

const router = express.Router();

// Get all values of logged in user
router.get('/', userController.someFunction);

export default router;