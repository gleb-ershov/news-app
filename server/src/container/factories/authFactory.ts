import { AuthController } from "../../controllers/authController";
import { AuthService } from "../../services/authService";
import { IAuthService } from "../../services/interfaces/authService.interface";
import { container } from "../container";

export const authFactory = () => {
    
    container.bind<IAuthService>("AuthService").to(AuthService);
    container.bind<AuthController>("AuthController").to(AuthController);
};