import { User } from '../../core/domain/User';
import { UserRepository } from '../../core/ports/UserRepository';

export class ContainerAdder {
	constructor(private userRepository: UserRepository) {}

	async execute(idUser: string, idContainer: string): Promise<User | null> {
		return await this.userRepository.addContainer(idUser, idContainer);
	}
}
