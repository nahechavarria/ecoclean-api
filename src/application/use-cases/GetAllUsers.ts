import { User } from "../../core/domain/User";
import { UserRepository } from "../../core/ports/UserRepository";

export class GetAllUsers {
    constructor(private userRepository: UserRepository) {};

    async execute(): Promise<User[]> {
        return await this.userRepository.findAll();
    }
}