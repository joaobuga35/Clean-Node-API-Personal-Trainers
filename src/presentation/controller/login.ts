import { MissingParamError } from "../../errors";
import { IHttpRequest, IHttpResponse } from "../../interfaces/http.interface";
import { badRequest } from "../helpers/http.helper";

export class LoginController{
	handle(httpRequest: IHttpRequest): IHttpResponse{
		const requiredFields = ["username", "email","password","passwordConfirmation"];

		for(const fields of requiredFields){
			if (!httpRequest.body[fields]) {
				return badRequest(new MissingParamError(fields));
			}
		}
	}

}