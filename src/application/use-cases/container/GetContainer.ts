import { Container } from '../../../core/domain/Container';
import { ContainerRepository } from '../../../core/ports/ContainerRespository';

export class GetContainer {
	constructor(private containerRepository: ContainerRepository) {}

	async execute(id: string): Promise<Container | null> {
		return await this.containerRepository.getById(id);
	}
}
