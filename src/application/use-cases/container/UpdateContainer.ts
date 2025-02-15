import { Container } from '../../../core/domain/Container';
import { ContainerRepository } from '../../../core/ports/ContainerRespository';

export class UpdateContainer {
	constructor(private containerRepository: ContainerRepository) {}

	async execute(
		id: string,
		data: Partial<Container>
	): Promise<Container | null> {
		return await this.containerRepository.update(id, data);
	}
}
