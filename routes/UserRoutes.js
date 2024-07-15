import express from "express";
import { createUser, deleteUser, getAllUsers, getUser, signInUser, updateUser } from "../controllers/UserController.js";
const router = express.Router();

router.post('/create', createUser);
router.put('/:id', updateUser);
router.get('/', getAllUsers);
router.get('/:id', getUser);
router.delete('/id', deleteUser);
router.post('/auth', signInUser);

export default router;