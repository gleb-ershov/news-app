import {
	HttpErrorCode as ErrCode,
	HttpErrorDescriptions as ErrDesc,
	HttpErrorMessages as ErrMsg,
} from "../../consts/httpErrors";
import AppError from "./AppError";

class NotFoundError extends AppError {
	constructor(message: string = ErrMsg.NOT_FOUND) {
		super(message, ErrDesc.NOT_FOUND, ErrCode.NOT_FOUND);
	}
}

export default NotFoundError;
