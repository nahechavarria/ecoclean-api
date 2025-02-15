import { Container } from '../../../core/domain/Container';
import { ContainerRepository } from '../../../core/ports/ContainerRespository';
import { ObjectId } from 'mongodb';

export class CreateContainer {
	constructor(private containerRepository: ContainerRepository) {}

	async execute(
		code: string,
		size: number,
		status: string,
		owner: ObjectId
	): Promise<Container> {
		const container = new Container('', code, size, status, owner);
		return await this.containerRepository.create(container);
	}
}
