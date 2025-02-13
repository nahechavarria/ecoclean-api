import { User } from "../../core/domain/User";
import { UserRepository } from "../../core/ports/UserRepository";

export class CreateUser {
    constructor(private userRepository: UserRepository) {}

    async execute(name: string, lastname: string, email: string, role: string, picture: string | null): Promise<User> {
        const user = new User("", name, lastname, email, role, picture);
        return await this.userRepository.create(user);
    }
}