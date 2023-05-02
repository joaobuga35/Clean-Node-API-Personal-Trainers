
import { MissingParamError } from "../../errors";
import { LoginController } from "./login";

describe("Login Controller", () => {
	test("Should return 400 if missign username", () => {
		const sut = new LoginController();
		const httpRequest = {
			body: {
				email: "any_email@mail.com",
				password: "any_password",
				passwordConfirmation: "any_password"
			}
		};
		const httpResponse = sut.handle(httpRequest);
		expect(httpResponse.statusCode).toBe(400);
		expect(httpResponse.body).toEqual(new MissingParamError("username"));
	});

	test("Should return 400 if missign email", () => {
		const sut = new LoginController();
		const httpRequest = {
			body: {
				username: "any_username",
				password: "any_password",
				passwordConfirmation: "any_password"
			}
		};
		const httpResponse = sut.handle(httpRequest);
		expect(httpResponse.statusCode).toBe(400);
		expect(httpResponse.body).toEqual(new MissingParamError("email"));
	});

	test("Should return 400 if missign password", () => {
		const sut = new LoginController();
		const httpRequest = {
			body: {
				username: "any_username",
				email: "any_email@mail.com",
				passwordConfirmation: "any_password"
			}
		};
		const httpResponse = sut.handle(httpRequest);
		expect(httpResponse.statusCode).toBe(400);
		expect(httpResponse.body).toEqual(new Error("Missing param: password"));
	});
});