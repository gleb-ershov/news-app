import {
	ErrorCode as ErrCode,
	ErrorDescriptions as ErrDesc,
	ErrorMessages as ErrMsg,
} from "../../consts/error";
import AppError from "./AppError";

export class ValidationError extends AppError {
	name: string;

	constructor(message: string = ErrMsg.VALIDATION) {
		super(message, ErrDesc.VALIDATION, ErrCode.VALIDATION);
		this.name = "Validation error";
	}
}

export default ValidationError;
