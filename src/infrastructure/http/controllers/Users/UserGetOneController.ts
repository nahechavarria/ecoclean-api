import { Request, Response } from 'express';
import { GetUser } from '../../../../application/use-cases';
import { MongoUserRepository } from '../../../database/MongoUserRepository';

const userRepository = new MongoUserRepository();
const getUser = new GetUser(userRepository);

const UserGetOneController = async (req: Request, res: Response) => {
	try {
		const user = await getUser.execute(req.params.id);
		user ? res.json(user) : res.status(404).json({ message: 'User not found' });
	} catch (err) {
		res.status(500).json({ message: 'Error getting user', err });
	}
};

export { UserGetOneController };
