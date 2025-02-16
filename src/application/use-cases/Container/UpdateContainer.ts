import { Container } from '../../../domain/entities';
import { ContainerRepository } from '../../../domain/repositories';

class UpdateContainer {
	constructor(private containerRepository: ContainerRepository) {}

	async execute(
		id: string,
		data: Partial<Container>
	): Promise<Container | null> {
		return await this.containerRepository.update(id, data);
	}
}

export { UpdateContainer };
