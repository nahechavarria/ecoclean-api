import express from 'express';
import {
	ContainerGetOneController,
	UserCreateController,
	UserGetOneController,
	UserGetAllController,
	UserDeleteController,
	UserUpdateController,
	ContainerGetAllController,
	ContainerDeleteController,
	ContainerUpdateController,
	AddContainerController,
	DeleteContainerController,
} from '../http/controllers';

import { ContainerCreateController } from '../http/controllers';

const router = express.Router();

// users
router.post('/users', UserCreateController);
router.get('/users/:id', UserGetOneController);
router.get('/users', UserGetAllController);
router.delete('/users/:id', UserDeleteController);
router.put('/users/:id', UserUpdateController);

// containers
router.post('/containers', ContainerCreateController);
router.get('/containers/:id', ContainerGetOneController);
router.get('/containers', ContainerGetAllController);
router.delete('/containers/:id', ContainerDeleteController);
router.put('/containers/:id', ContainerUpdateController);

// containers from users
router.put('/users/:id/containers', AddContainerController);
router.patch('/users/:id/containers', DeleteContainerController);

export { router };
