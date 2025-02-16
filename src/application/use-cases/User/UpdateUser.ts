import { User } from '../../../domain/entities';
import { UserRepository } from '../../../domain/repositories';

class UpdateUser {
	constructor(private userRepository: UserRepository) {}

	async execute(id: string, data: Partial<User>): Promise<User | null> {
		return await this.userRepository.update(id, data);
	}
}

export { UpdateUser };
