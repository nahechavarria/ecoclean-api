import { Request, Response } from 'express';
import { GetAllContainers } from '../../../../application/use-cases';
import { MongoContainerRepository } from '../../../database/MongoContainerRepository';

const containerRepository = new MongoContainerRepository();
const getAll = new GetAllContainers(containerRepository);

const ContainerGetAllController = async (req: Request, res: Response) => {
	try {
		const result = await getAll.execute();
		result
			? res.json(result)
			: res.status(404).json({ message: 'Not containers found' });
	} catch (err) {
		res.status(500).json({ message: 'Error getting containers', err });
	}
};

export { ContainerGetAllController };
