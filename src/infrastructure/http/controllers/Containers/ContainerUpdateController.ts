import { Request, Response } from 'express';
import { UpdateContainer } from '../../../../application/use-cases';
import { MongoContainerRepository } from '../../../database/MongoContainerRepository';

const containerRepository = new MongoContainerRepository();
const updateContainer = new UpdateContainer(containerRepository);

const ContainerUpdateController = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const data = req.body;

		const updatedContainer = await updateContainer.execute(id, data);

		updateContainer
			? res.json(updatedContainer)
			: res.status(404).json({ message: 'User not found' });
	} catch (err) {
		res.status(500).json({ message: 'Error updating user', err });
	}
};

export { ContainerUpdateController };
