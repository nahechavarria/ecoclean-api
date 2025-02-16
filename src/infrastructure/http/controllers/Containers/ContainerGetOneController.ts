import { Request, Response } from 'express';
import { GetContainer } from '../../../../application/use-cases';
import { MongoContainerRepository } from '../../../database/MongoContainerRepository';

const containerRepository = new MongoContainerRepository();
const getOne = new GetContainer(containerRepository);

const ContainerGetOneController = async (req: Request, res: Response) => {
	try {
		const container = await getOne.execute(req.params.id);
		container
			? res.json(container)
			: res.status(404).json({ message: 'Container not found' });
	} catch (err) {
		res.status(500).json({ message: 'Error getting container', err });
	}
};

export { ContainerGetOneController };
