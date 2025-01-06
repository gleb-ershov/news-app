import {
	HttpErrorCode as ErrCode,
	HttpErrorDescriptions as ErrDesc,
	HttpErrorMessages as ErrMsg,
} from "../../consts/httpErrors";
import AppError from "./AppError";

class ForbiddedError extends AppError {
	constructor(message: string = ErrMsg.FORBIDDEN) {
		super(message, ErrDesc.FORBIDDEN, ErrCode.FORBIDDEN);
	}
}

export default ForbiddedError;
