import { Request, Response } from 'express';
import { DeleteContainer } from '../../../../application/use-cases';
import { MongoContainerRepository } from '../../../database/MongoContainerRepository';

const containerRepository = new MongoContainerRepository();
const deleteContainer = new DeleteContainer(containerRepository);

const ContainerDeleteController = async (req: Request, res: Response) => {
	try {
		const result = await deleteContainer.execute(req.params.id);
		result
			? res.json(result)
			: res.status(400).json({ message: 'Something went wrong' });
	} catch (err) {
		res.status(500).json({ message: 'Error deleting container', err });
	}
};

export { ContainerDeleteController };
