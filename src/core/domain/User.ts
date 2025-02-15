import { ObjectId } from 'mongodb';

export class User {
	constructor(
		public _id: string,
		public name: string,
		public email: string,
		public role: string,
		public containers: ObjectId[]
	) {}
}
