import { UserRepository } from '../../../core/ports/UserRepository';

export class DeleteUser {
	constructor(private userRepository: UserRepository) {}

	async execute(id: string): Promise<boolean> {
		return await this.userRepository.delete(id);
	}
}
