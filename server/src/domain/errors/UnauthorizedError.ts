import {
	HttpErrorCode as ErrCode,
	HttpErrorDescriptions as ErrDesc,
	HttpErrorMessages as ErrMsg,
} from "../../consts/httpErrors";
import AppError from "./AppError";

class UnauthorizedError extends AppError {
	constructor(message: string = ErrMsg.UNAUTHORIZED) {
		super(message, ErrDesc.UNAUTHORIZED, ErrCode.UNAUTHORIZED);
	}
}

export default UnauthorizedError;
