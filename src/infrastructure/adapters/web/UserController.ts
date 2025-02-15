import { Request, Response } from 'express';
import { CreateUser } from '../../../application/use-cases/user/CreateUser';
import { DeleteUser } from '../../../application/use-cases/user/DeleteUser';
import { GetAllUsers } from '../../../application/use-cases/user/GetAllUsers';
import { GetUser } from '../../../application/use-cases/user/GetUser';
import { UpdateUser } from '../../../application/use-cases/user/UpdateUser';
import { ContainerAdder } from '../../../application/use-cases/ContainerAdder';
import { UserRepositoryImpl } from '../persistence/UserRepositoryImpl';

const userRepository = new UserRepositoryImpl();
const createUser = new CreateUser(userRepository);
const deleteUser = new DeleteUser(userRepository);
const getAllUsers = new GetAllUsers(userRepository);
const getUser = new GetUser(userRepository);
const updateUser = new UpdateUser(userRepository);
const addContainer = new ContainerAdder(userRepository);

export const UserController = {
	async create(req: Request, res: Response) {
		try {
			const user = req.body;

			const savedUser = await createUser.execute(
				user.name,
				user.email,
				user.role,
				user.containers ? user.containers : []
			);

			savedUser
				? res.status(201).json(user)
				: res.status(404).json({ message: 'User not found' });
		} catch (err) {
			res.status(500).json({ message: 'Error creating user', err });
		}
	},

	async delete(req: Request, res: Response) {
		try {
			const result = await deleteUser.execute(req.params.id);
			result
				? res.json(result)
				: res.status(400).json({ message: 'Something went wrong' });
		} catch (err) {
			res.status(500).json({ message: 'Error deleting user', err });
		}
	},

	async getAll(req: Request, res: Response) {
		try {
			const result = await getAllUsers.execute();
			result
				? res.json(result)
				: res.status(404).json({ message: 'Not users found' });
		} catch (err) {
			res.status(500).json({ message: 'Error getting users', err });
		}
	},

	async getOne(req: Request, res: Response) {
		try {
			const user = await getUser.execute(req.params.id);
			user
				? res.json(user)
				: res.status(404).json({ message: 'User not found' });
		} catch (err) {
			res.status(500).json({ message: 'Error getting user', err });
		}
	},

	async update(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const data = req.body;

			const updatedUser = await updateUser.execute(id, data);

			updatedUser
				? res.json(updatedUser)
				: res.status(404).json({ message: 'User not found' });
		} catch (err) {
			res.status(500).json({ message: 'Error updating user', err });
		}
	},

	async addCont(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const data = req.body;

			const result = await addContainer.execute(id, data._id);

			result
				? res.json(result)
				: res.status(404).json({ message: 'Error adding container' });
		} catch (err) {
			res.status(500).json({ message: 'Error adding container', err });
		}
	},
};
