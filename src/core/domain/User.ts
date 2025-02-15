export class User {
	constructor(
		public id: string,
		public name: string,
		public lastname: string,
		public email: string,
		public role: string,
		public picture: string | null,
		public idContainer?: string
	) {}
}
