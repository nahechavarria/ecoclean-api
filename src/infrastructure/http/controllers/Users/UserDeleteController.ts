import { Request, Response } from 'express';
import { DeleteUser } from '../../../../application/use-cases';
import { MongoUserRepository } from '../../../database/MongoUserRepository';

const userRepository = new MongoUserRepository();
const deleteUser = new DeleteUser(userRepository);

const UserDeleteController = async (req: Request, res: Response) => {
	try {
		const result = await deleteUser.execute(req.params.id);
		result
			? res.json(result)
			: res.status(400).json({ message: 'Something went wrong' });
	} catch (err) {
		res.status(500).json({ message: 'Error deleting user', err });
	}
};

export { UserDeleteController };
