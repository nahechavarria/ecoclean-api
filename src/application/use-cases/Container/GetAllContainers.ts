import { Container } from '../../../domain/entities';
import { ContainerRepository } from '../../../domain/repositories';

class GetAllContainers {
	constructor(private containerRepository: ContainerRepository) {}

	async execute(): Promise<Container[]> {
		return await this.containerRepository.getAll();
	}
}

export { GetAllContainers };
