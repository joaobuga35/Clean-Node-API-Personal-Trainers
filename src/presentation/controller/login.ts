export class LoginController{
	handle(httpRequest: any): any{
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