import { IHttpRequest, IHttpResponse } from "../../interfaces/http.interface";

export class LoginController{
	handle(httpRequest: IHttpRequest): IHttpResponse{
		const requiredFields = ["username", "email","password","passwordConfirmation"];
		
		if (!httpRequest.body.username) {
			return {
				statusCode: 400,
				body: new Error("Missing param: username")
			};
		}

		if (!httpRequest.body.email) {
			return {
				statusCode: 400,
				body: new Error("Missing param: email")
			};
		}
	}
}