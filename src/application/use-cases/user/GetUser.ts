import { User } from '../../../core/domain/User';
import { UserRepository } from '../../../core/ports/UserRepository';
import { NotFoundError } from '../../../core/errors/NotFoundError';

export class GetUser {
	constructor(private userRepository: UserRepository) {}

	async execute(id: string): Promise<User | null> {
		const user = await this.userRepository.getById(id);
		if (!user) throw new NotFoundError('User not found');
		return user;
	}
}
