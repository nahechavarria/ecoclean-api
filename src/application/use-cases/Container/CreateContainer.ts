import { Container } from '../../../domain/entities';
import { ContainerRepository } from '../../../domain/repositories';

class CreateContainer {
	constructor(private containerRepository: ContainerRepository) {}

	async execute(
		code: string,
		size: number,
		status: string,
		owner: string
	): Promise<Container> {
		const container = new Container('', code, size, status, owner);
		return await this.containerRepository.create(container);
	}
}

export { CreateContainer };
