import {
	HttpErrorCode as ErrCode,
	HttpErrorDescriptions as ErrDesc,
	HttpErrorMessages as ErrMsg,
} from "../../consts/httpErrors";
import AppError from "./AppError";

class BadRequestError extends AppError {
	constructor(message: string = ErrMsg.BAD_REQUEST) {
		super(message, ErrDesc.BAD_REQUEST, ErrCode.BAD_REQUEST);
	}
}

export default BadRequestError;
