import { Container } from '../../../core/domain/Container';
import { ContainerRepository } from '../../../core/ports/ContainerRespository';

export class CreateContainer {
	constructor(private containerRepository: ContainerRepository) {}

	async execute(
		description: string,
		serialNumber: number,
		status: string,
		location: string
	): Promise<Container> {
		const container = new Container(
			'',
			description,
			serialNumber,
			status,
			location
		);
		return await this.containerRepository.create(container);
	}
}
