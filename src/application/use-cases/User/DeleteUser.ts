import { UserRepository } from '../../../domain/repositories';

class DeleteUser {
	constructor(private userRepository: UserRepository) {}

	async execute(id: string): Promise<boolean> {
		return await this.userRepository.delete(id);
	}
}

export { DeleteUser };
