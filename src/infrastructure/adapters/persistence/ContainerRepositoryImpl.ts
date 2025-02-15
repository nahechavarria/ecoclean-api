import { ContainerRepository } from '../../../core/ports/ContainerRespository';
import { Container } from '../../../core/domain/Container';
import { getDB } from '../../config/database';
import { ObjectId } from 'mongodb';

export class ContainerRepositoryImpl implements ContainerRepository {
	private collection = 'containers';

	async create(container: Container): Promise<Container> {
		const db = getDB();
		const result = await db.collection(this.collection).insertOne({
			code: container.code,
			size: container.size,
			status: container.status,
			owner: container.owner,
		});

		return new Container(
			result.insertedId.toString(),
			container.code,
			container.size,
			container.status,
			container.owner
		);
	}

	async getById(id: string): Promise<Container | null> {
		const db = getDB();
		const container = await db
			.collection(this.collection)
			.findOne({ _id: new ObjectId(id) });

		return container
			? new Container(
					container._id.toString(),
					container.code,
					container.size,
					container.status,
					container.owner
			  )
			: null;
	}

	async getAll(): Promise<Container[]> {
		const db = getDB();
		const containers = await db.collection(this.collection).find().toArray();
		return containers.map(
			(container) =>
				new Container(
					container._id.toString(),
					container.code,
					container.size,
					container.status,
					container.owner
				)
		);
	}

	async update(
		id: string,
		data: Partial<Container>
	): Promise<Container | null> {
		const db = getDB();
		const result = await db
			.collection(this.collection)
			.findOneAndUpdate(
				{ _id: new ObjectId(id) },
				{ $set: data },
				{ returnDocument: 'after' }
			);

		return result
			? new Container(
					result._id.toString(),
					result.code,
					result.size,
					result.status,
					result.owner
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
