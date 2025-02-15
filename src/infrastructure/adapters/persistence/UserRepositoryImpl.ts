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
			lastname: user.lastname,
			email: user.email,
			role: user.role,
			picture: user.picture,
		});

		return new User(
			result.insertedId.toString(),
			user.name,
			user.lastname,
			user.email,
			user.role,
			user.picture
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
					user.lastname,
					user.email,
					user.role,
					user.picture
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
					user.lastname,
					user.email,
					user.role,
					user.picture
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
					result.lastname,
					result.email,
					result.role,
					result.picture
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
}
