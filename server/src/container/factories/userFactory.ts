import { UserController } from "../../controllers/userController";
import { IUserRepository } from "../../repositories/interfaces/userRepository.interface";
import { UserRepository } from "../../repositories/userRepository";
import { IUserService } from "../../services/interfaces/userService.interface";
import { UserService } from "../../services/userService";
import { container } from "../container";

export const userFactory = () => {
	container.bind<IUserRepository>("UserRepository").to(UserRepository);
	container.bind<IUserService>("UserService").to(UserService);
	container.bind<UserController>("UserController").to(UserController);
};
