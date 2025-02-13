import { UserRepository } from "../../../core/ports/UserRepository";
import { User } from "../../../core/domain/User";
import { UserModel } from "./UserModel";

export class UserRepositoryImpl implements UserRepository {
    async create(user: User): Promise<User> {
        const newUser = new UserModel(user);
        const savedUser = await newUser.save();
        return new User(savedUser.id, savedUser.name as string, savedUser.lastname as string, savedUser.email as string, savedUser.role as string, savedUser.picture as string);
    }
    async findById(id: string): Promise<User | null> {
        const user = await UserModel.findById(id);
        return user ? new User(user.id, user.name as string, user.lastname as string, user.email as string, user.role as string, user.picture as string) : null;
    }
    async findAll(): Promise<User[]> {
        return (await UserModel.find()).map((user) => new User(user.id, user.name as string, user.lastname as string, user.email as string, user.role as string, user.picture as string));
    }
    async update(id: string, data: Partial<User>): Promise<User | null> {
        const updatedUser = await UserModel.findByIdAndUpdate(id, data, {new: true});
        return updatedUser ? new User(updatedUser.id, updatedUser.name as string, updatedUser.lastname as string, updatedUser.email as string, updatedUser.role as string, updatedUser.picture as string) : null;
    }
    async delete(id: string): Promise<boolean> {
        const result = await UserModel.findByIdAndDelete(id);
        return !!result;
    }
}