import {
	ErrorCode as ErrCode,
	ErrorDescriptions as ErrDesc,
	ErrorMessages as ErrMsg,
} from "../../consts/error";
import AppError from "./AppError";

export class DatabaseError extends AppError {
	name: string;

	constructor(message: string = ErrMsg.DATABASE) {
		super(message, ErrDesc.DATABASE, ErrCode.DATABASE);
		this.name = "Database error";
	}
}

export default DatabaseError;
