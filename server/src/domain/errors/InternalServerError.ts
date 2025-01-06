import {
	HttpErrorCode as ErrCode,
	HttpErrorDescriptions as ErrDesc,
	HttpErrorMessages as ErrMsg,
} from "../../consts/httpErrors";
import AppError from "./AppError";

class InternalServerError extends AppError {
	constructor(message: string = ErrMsg.INTERNAL_SERVER_ERROR) {
		super(message, ErrDesc.INTERNAL_SERVER_ERROR, ErrCode.INTERNAL_SERVER_ERROR);
	}
}

export default InternalServerError;
