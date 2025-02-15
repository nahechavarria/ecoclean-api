import { UserRepository } from '../../../core/ports/UserRepository';
import { User } from '../../../core/domain/User';
import { getDB } from '../../config/database';
import { ObjectId } from 'mongodb';

export class UserRepositoryImpl implements UserRepository {
	private collection = 'users';

	async create(user: User): Promise<User> {
		const db = getDB();
		const result = await db.collection(this.collection).insertOne({
			name: user.name,
			email: user.email,
			role: user.role,
			containers: user.containers,
		});

		return new User(
			result.insertedId.toString(),
			user.name,
			user.email,
			user.role,
			user.containers
		);
	}

	async getById(id: string): Promise<User | null> {
		const db = getDB();
		const user = await db
			.collection(this.collection)
			.findOne({ _id: new ObjectId(id) });
		return user
			? new User(
					user._id.toString(),
					user.name,
					user.email,
					user.role,
					user.containers
			  )
			: null;
	}

	async getAll(): Promise<User[]> {
		const db = getDB();
		const users = await db.collection(this.collection).find().toArray();
		return users.map(
			(user) =>
				new User(
					user._id.toString(),
					user.name,
					user.email,
					user.role,
					user.containers
				)
		);
	}

	async update(id: string, data: Partial<User>): Promise<User | null> {
		const db = getDB();
		const result = await db
			.collection(this.collection)
			.findOneAndUpdate(
				{ _id: new ObjectId(id) },
				{ $set: data },
				{ returnDocument: 'after' }
			);

		return result
			? new User(
					result._id.toString(),
					result.name,
					result.email,
					result.role,
					result.containers
			  )
			: null;
	}

	async delete(id: string): Promise<boolean> {
		const db = getDB();
		const result = await db
			.collection(this.collection)
			.deleteOne({ _id: new ObjectId(id) });
		return result.deletedCount > 0;
	}

	async addContainer(
		userId: string,
		containerId: string
	): Promise<User | null> {
		const db = getDB();

		const result = await db
			.collection(this.collection)
			.findOneAndUpdate(
				{ _id: new ObjectId(userId) },
				{ $addToSet: { containers: containerId } },
				{ returnDocument: 'after' }
			);

		return result
			? (await db
					.collection('containers')
					.findOneAndUpdate(
						{ _id: new ObjectId(containerId) },
						{ $set: { owner: new ObjectId(userId) } },
						{ returnDocument: 'after' }
					),
			  new User(
					result._id.toString(),
					result.name,
					result.email,
					result.role,
					result.containers
			  ))
			: null;
	}
}
