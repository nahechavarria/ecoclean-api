import { ObjectId } from 'mongodb';
import { User } from '../../../core/domain/User';
import { UserRepository } from '../../../core/ports/UserRepository';

export class CreateUser {
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
