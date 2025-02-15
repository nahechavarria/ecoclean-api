import { Container } from '../../../core/domain/Container';
import { ContainerRepository } from '../../../core/ports/ContainerRespository';

export class GetAllContainers {
	constructor(private containerRepository: ContainerRepository) {}

	async execute(): Promise<Container[]> {
		return await this.containerRepository.getAll();
	}
}
