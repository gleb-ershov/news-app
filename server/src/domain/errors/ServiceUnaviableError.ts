import {
	HttpErrorCode as ErrCode,
	HttpErrorDescriptions as ErrDesc,
	HttpErrorMessages as ErrMsg,
} from "../../consts/httpErrors";
import AppError from "./AppError";

class ServiceUnavailableError extends AppError {
	constructor(message: string = ErrMsg.SERVICE_UNAVAILABLE) {
		super(
			message,
			ErrDesc.SERVICE_UNAVAILABLE,
			ErrCode.SERVICE_UNAVAILABLE
		);
	}
}

export default ServiceUnavailableError;
