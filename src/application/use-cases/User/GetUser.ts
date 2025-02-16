import { User } from '../../../domain/entities';
import { UserRepository } from '../../../domain/repositories';
import { NotFoundError } from '../../../shared/errors/NotFoundError';

class GetUser {
	constructor(private userRepository: UserRepository) {}

	async execute(id: string): Promise<User | null> {
		const user = await this.userRepository.getById(id);
		if (!user) throw new NotFoundError('User not found');
		return user;
	}
}

export { GetUser };
