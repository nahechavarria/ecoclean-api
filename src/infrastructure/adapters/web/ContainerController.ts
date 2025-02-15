import { Request, Response } from 'express';
import { ContainerRepositoryImpl } from '../persistence/ContainerRepositoryImpl';
import { CreateContainer } from '../../../application/use-cases/container/CreateContainer';
import { DeleteContainer } from '../../../application/use-cases/container/DeleteContainer';
import { GetAllContainers } from '../../../application/use-cases/container/GetAllContainers';
import { GetContainer } from '../../../application/use-cases/container/GetContainer';
import { UpdateContainer } from '../../../application/use-cases/container/UpdateContainer';

const containerRepository = new ContainerRepositoryImpl();
const createContainer = new CreateContainer(containerRepository);
const deleteContainer = new DeleteContainer(containerRepository);
const getAllContainers = new GetAllContainers(containerRepository);
const getContainer = new GetContainer(containerRepository);
const updateContainer = new UpdateContainer(containerRepository);

export const ContainerController = {
	async create(req: Request, res: Response) {
		try {
			const container = req.body;
			const savedContainer = await createContainer.execute(
				container.description,
				container.serialNumber,
				container.status,
				container.location
			);

			savedContainer
				? res.status(201).json(savedContainer)
				: res.status(404).json({ message: 'Container not found' });
		} catch (err) {
			res.status(500).json({ message: 'Error creating container', err });
		}
	},

	async delete(req: Request, res: Response) {
		try {
			const result = await deleteContainer.execute(req.params.id);
			result
				? res.json(result)
				: res.status(400).json({ message: 'Something went wrong' });
		} catch (err) {
			res.status(500).json({ message: 'Error deleting container', err });
		}
	},

	async getAll(req: Request, res: Response) {
		try {
			const result = await getAllContainers.execute();
			result
				? res.json(result)
				: res.status(404).json({ message: 'Not containers found' });
		} catch (err) {
			res.status(500).json({ message: 'Error getting containers', err });
		}
	},

	async getOne(req: Request, res: Response) {
		try {
			const container = await getContainer.execute(req.params.id);
			container
				? res.json(container)
				: res.status(404).json({ message: 'Container not found' });
		} catch (err) {
			res.status(500).json({ message: 'Error getting container', err });
		}
	},

	async update(req: Request, res: Response) {
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
	},
};
