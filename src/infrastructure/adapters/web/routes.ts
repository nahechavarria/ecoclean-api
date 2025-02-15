import express from 'express';
import { UserController } from './UserController';
import { ContainerController } from './ContainerController';

const router = express.Router();

// users
router.post('/users', UserController.create);
router.get('/users/:id', UserController.getOne);
router.get('/users', UserController.getAll);
router.delete('/users/:id', UserController.delete);
router.put('/users/:id', UserController.update);

// containers
router.post('/containers', ContainerController.create);
router.get('/containers/:id', ContainerController.getOne);
router.get('/containers', ContainerController.getAll);
router.delete('/containers/:id', ContainerController.delete);
router.put('/containers/:id', ContainerController.update);

// containers from users
router.put('/users/:id/containers', UserController.addCont);

export default router;
