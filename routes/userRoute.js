import express from 'express';
import { createUser, deleteUser, fetch, getSingleUser, updateUser } from '../controller/userController.js';

const route = express.Router();

route.get('/get-users', fetch);
route.post('/create', createUser);
route.put('/update/:id', updateUser);
route.get('/get-users/:id', getSingleUser);
route.delete('/delete/:id', deleteUser);

export default route;