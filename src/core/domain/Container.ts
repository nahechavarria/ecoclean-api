import { ObjectId } from 'mongodb';

export class Container {
	constructor(
		public _id: string,
		public code: string,
		public size: number,
		public status: string,
		public owner: ObjectId | null
	) {}
}
