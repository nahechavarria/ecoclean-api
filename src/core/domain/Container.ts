export class Container{
    constructor(
        public id: string,
        public description: string,
        public status: string,
        public location: string,
        public userID: string,
        public userName: string,
        public userLastname: string,
        public userEmail: string,
        public userRole: string,
        public userPicture: string | null
    ) {}
}