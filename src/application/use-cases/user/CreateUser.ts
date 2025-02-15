import { User } from '../../../core/domain/User';
import { UserRepository } from '../../../core/ports/UserRepository';
import { ObjectId } from 'mongodb';

export class CreateUser {
	constructor(private userRepository: UserRepository) {}

	async execute(
		name: string,
		email: string,
		role: string,
		containers: ObjectId[]
	): Promise<User> {
		const user = new User('', name, email, role, containers);
		return await this.userRepository.create(user);
	}
}
