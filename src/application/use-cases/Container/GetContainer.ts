import { Container } from '../../../domain/entities';
import { ContainerRepository } from '../../../domain/repositories';

class GetContainer {
	constructor(private containerRepository: ContainerRepository) {}

	async execute(id: string): Promise<Container | null> {
		return await this.containerRepository.getById(id);
	}
}

export { GetContainer };
