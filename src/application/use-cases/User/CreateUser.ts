import { User } from '../../../domain/entities';
import { UserRepository } from '../../../domain/repositories';

class CreateUser {
	constructor(private userRepository: UserRepository) {}

	async execute(
		name: string,
		email: string,
		role: string,
		containers: string[]
	): Promise<User> {
		const user = new User('', name, email, role, containers);
		return await this.userRepository.create(user);
	}
}

export { CreateUser };
