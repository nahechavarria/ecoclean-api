import { ContainerRepository } from '../../../domain/repositories';

class DeleteContainer {
	constructor(private containerRepository: ContainerRepository) {}

	async execute(id: string): Promise<boolean> {
		return await this.containerRepository.delete(id);
	}
}

export { DeleteContainer };
