import { User } from '../../../domain/entities';
import { UserRepository } from '../../../domain/repositories';

class GetAllUsers {
	constructor(private userRepository: UserRepository) {}

	async execute(): Promise<User[]> {
		return await this.userRepository.getAll();
	}
}

export { GetAllUsers };
