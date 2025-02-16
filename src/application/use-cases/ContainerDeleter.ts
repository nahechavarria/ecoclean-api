import { UserRepository } from '../../core/ports/UserRepository';

export class ContainerDeleter {
	constructor(private userRepository: UserRepository) {}

	async execute(userId: string, containerId: string): Promise<boolean> {
		return await this.userRepository.deleteContainer(userId, containerId);
	}
}
