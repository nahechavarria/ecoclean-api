class Container {
	constructor(
		public _id: string,
		public code: string,
		public size: number,
		public status: string,
		public owner: string | null
	) {}
}

export { Container };
