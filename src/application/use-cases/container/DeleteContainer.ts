import { ContainerRepository } from '../../../core/ports/ContainerRespository';

export class DeleteContainer {
	constructor(private containerRepository: ContainerRepository) {}

	async execute(id: string): Promise<boolean> {
		return await this.containerRepository.delete(id);
	}
}
