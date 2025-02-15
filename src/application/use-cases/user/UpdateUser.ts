import { User } from '../../../core/domain/User';
import { UserRepository } from '../../../core/ports/UserRepository';

export class UpdateUser {
	constructor(private userRepository: UserRepository) {}

	async execute(id: string, data: Partial<User>): Promise<User | null> {
		return await this.userRepository.update(id, data);
	}
}
