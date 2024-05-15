import express from 'express';
import { getUsers} from '../controllers/user.controller.js';

const userRouter= express.Router();
userRouter.route('/users')
    .get(getUsers)
    export { userRouter }