import { Request, Response } from 'express';
import { ContainerDeleter } from '../../../../application/use-cases';
import { MongoUserRepository } from '../../../database/MongoUserRepository';

const userRepository = new MongoUserRepository();
const containerDeleter = new ContainerDeleter(userRepository);

const DeleteContainerController = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const data = req.body;

		const result = await containerDeleter.execute(id, data._id);
		result
			? res.json(result)
			: res.status(400).json({ message: 'Something went wrong' });
	} catch (err) {
		res.status(500).json({ message: 'Error deleting container', err });
	}
};

export { DeleteContainerController };
