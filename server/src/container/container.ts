import "reflect-metadata";
import { Container } from "inversify";
import { userFactory } from "./factories/userFactory";
import { authFactory } from "./factories/authFactory";
import { newsFactory } from "./factories/newsFactory";

const container = new Container();

userFactory();
authFactory();
newsFactory();

export { container };
