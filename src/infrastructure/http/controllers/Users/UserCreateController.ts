import { Request, Response } from 'express';
import { CreateUser } from '../../../../application/use-cases';
import { MongoUserRepository } from '../../../database/MongoUserRepository';

const userRepository = new MongoUserRepository();
const createUser = new CreateUser(userRepository);

const UserCreateController = async (req: Request, res: Response) => {
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
};

export { UserCreateController };
