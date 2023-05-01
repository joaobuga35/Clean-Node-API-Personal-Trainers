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
	});
});