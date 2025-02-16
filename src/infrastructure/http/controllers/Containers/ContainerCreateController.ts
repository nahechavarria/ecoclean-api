import { Request, Response } from 'express';
import { CreateContainer } from '../../../../application/use-cases';
import { MongoContainerRepository } from '../../../database/MongoContainerRepository';

const containerRepository = new MongoContainerRepository();
const createContainer = new CreateContainer(containerRepository);

const ContainerCreateController = async (req: Request, res: Response) => {
	try {
		const container = req.body;
		const savedContainer = await createContainer.execute(
			container.code,
			container.size,
			container.status,
			container.owner
		);

		savedContainer
			? res.status(201).json(savedContainer)
			: res.status(404).json({ message: 'Container not found' });
	} catch (err) {
		res.status(500).json({ message: 'Error creating container', err });
	}
};

export { ContainerCreateController };
