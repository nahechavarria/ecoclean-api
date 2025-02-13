import express from 'express';
import { UserController } from './UserController';
import { User } from '../../../core/domain/User';

const router = express.Router();

router.post('/users', UserController.create);
router.get('/users/:id', UserController.getOne);
router.get('/users', UserController.getAll);
router.delete('/users/:id', UserController.delete);
router.put('/users/:id', UserController.update);

export default router;