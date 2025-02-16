import { User } from '../../domain/entities/User';

interface UserRepository {
	create(user: User): Promise<User>;
	getById(id: string): Promise<User | null>;
	getAll(): Promise<User[]>;
	update(id: string, data: Partial<User>): Promise<User | null>;
	delete(id: string): Promise<boolean>;
	addContainer(userId: string, containerId: string): Promise<User | null>;
	deleteContainer(userId: string, containerId: string): Promise<boolean>;
}

export { UserRepository };
