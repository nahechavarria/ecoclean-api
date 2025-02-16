import { Request, Response } from 'express';
import { ContainerAdder } from '../../../../application/use-cases';
import { MongoUserRepository } from '../../../database/MongoUserRepository';

const userRepository = new MongoUserRepository();
const containerAdder = new ContainerAdder(userRepository);

const AddContainerController = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const data = req.body;

		const result = await containerAdder.execute(id, data._id);

		result
			? res.json(result)
			: res.status(404).json({ message: 'Error adding container' });
	} catch (err) {
		res.status(500).json({ message: 'Error adding container', err });
	}
};

export { AddContainerController };
