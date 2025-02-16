import { Request, Response } from 'express';
import { UpdateUser } from '../../../../application/use-cases';
import { MongoUserRepository } from '../../../database/MongoUserRepository';

const userRepository = new MongoUserRepository();
const updateUser = new UpdateUser(userRepository);

const UserUpdateController = async (req: Request, res: Response) => {
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
};

export { UserUpdateController };
