import { InvalidParamError, MissingParamError } from "../errors/errors";
import { IHttpRequest, IHttpResponse } from "../interfaces/http.interface";
import { badRequest } from "../helpers/http.helper";
import { IemailValidator } from "../interfaces/emailValidator.interface";

export class LoginController{
	private readonly emailValidator: IemailValidator;
	constructor (emailValidator: IemailValidator){
		this.emailValidator = emailValidator;
	}
	handle(httpRequest: IHttpRequest): IHttpResponse{
		const requiredFields = ["username", "email","password","passwordConfirmation"];

		for(const fields of requiredFields){
			if (!httpRequest.body[fields]) {
				return badRequest(new MissingParamError(fields));
			}
		}
		const isValid = this.emailValidator.isValid(httpRequest.body.email);
		if(!isValid){
			return badRequest(new InvalidParamError("email"));
		}
	}

}