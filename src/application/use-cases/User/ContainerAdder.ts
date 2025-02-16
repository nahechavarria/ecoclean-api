import { User } from '../../../domain/entities';
import { UserRepository } from '../../../domain/repositories';

class ContainerAdder {
	constructor(private userRepository: UserRepository) {}

	async execute(idUser: string, idContainer: string): Promise<User | null> {
		return await this.userRepository.addContainer(idUser, idContainer);
	}
}

export { ContainerAdder };
