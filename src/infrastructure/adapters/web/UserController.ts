import { Request, Response } from "express";
import { CreateUser } from "../../../application/use-cases/CreateUser";
import { DeleteUser } from "../../../application/use-cases/DeleteUser";
import { GetAllUsers } from "../../../application/use-cases/GetAllUsers";
import { GetUser } from "../../../application/use-cases/GetUser";
import { UpdateUser } from "../../../application/use-cases/UpdateUser";
import { UserRepositoryImpl } from "../persistence/UserRepositoryImpl";

const userRepository = new UserRepositoryImpl();
const createUser = new CreateUser(userRepository);
const deleteUser = new DeleteUser(userRepository);
const getAllUsers = new GetAllUsers(userRepository);
const getUser = new GetUser(userRepository);
const updateUser = new UpdateUser(userRepository);

export const UserController = {
    async create(req: Request, res: Response) {
        const user = await createUser.execute(req.body.name, req.body.lastname, req.body.email, req.body.role, req.body.picture);
        res.status(201).json(user);
    },
    async delete(req: Request, res: Response) {
        const result = await deleteUser.execute(req.params.id);
        result ? res.json(result) : res.status(400).json({message: 'Something went wrong'});
    },
    async getAll(req: Request, res: Response) {
        const result = await getAllUsers.execute();
        result ? res.json(result) : res.status(404).json({ message: 'Not users found'});
    },
    async getOne(req: Request, res: Response) {
        const user = await getUser.execute(req.params.id);
        user ? res.json(user) : res.status(404).json({ message: 'User not found'});
    },
    async update(req: Request, res: Response) {
        try {
            const {id} = req.params;
            const data = req.body;
            
            const updatedUser = await updateUser.execute(id, data);

            updatedUser ? res.json(updatedUser) : res.status(404).json({message: 'User not found'});                  
        } catch(err) {
            res.status(500).json({message: 'Error updating user', err});
        }
    }
}