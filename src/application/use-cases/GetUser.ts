import { User } from "../../core/domain/User";
import { UserRepository } from "../../core/ports/UserRepository";

export class GetUser {
    constructor(private userRepository: UserRepository) {};

    async execute(id: string): Promise<User | null> {
        return await this.userRepository.findById(id);
    }
}