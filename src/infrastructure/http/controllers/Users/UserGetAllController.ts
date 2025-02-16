import { Request, Response } from 'express';
import { GetAllUsers } from '../../../../application/use-cases';
import { MongoUserRepository } from '../../../database/MongoUserRepository';

const userRepository = new MongoUserRepository();
const getAll = new GetAllUsers(userRepository);

const UserGetAllController = async (req: Request, res: Response) => {
	try {
		const result = await getAll.execute();
		result
			? res.json(result)
			: res.status(404).json({ message: 'Not users found' });
	} catch (err) {
		res.status(500).json({ message: 'Error getting users', err });
	}
};

export { UserGetAllController };
