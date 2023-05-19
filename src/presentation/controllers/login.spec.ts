
import { MissingParamError, InvalidParamError } from "../errors/errors";
import { IemailValidator } from "../interfaces/emailValidator.interface";
import { LoginController } from "./login";

interface ISutTypes {
    sut: LoginController
    emailValidatorStub: IemailValidator
}
const makeSut = ():ISutTypes => {
	class EmailValidatorStub implements IemailValidator {
		isValid (email: string): boolean{
			return true;
		}
	}
	const emailValidatorStub = new EmailValidatorStub();
	const sut = new LoginController(emailValidatorStub);
	return{
		sut,
		emailValidatorStub
	};
};
describe("Login Controller", () => {
	test("Should return 400 if missing username", () => {
		const {sut} = makeSut();
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

	test("Should return 400 if missing email", () => {
		const {sut} = makeSut();
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
		const {sut} = makeSut();
		const httpRequest = {
			body: {
				username: "any_username",
				email: "any_email@mail.com",
				passwordConfirmation: "any_password"
			}
		};
		const httpResponse = sut.handle(httpRequest);
		expect(httpResponse.statusCode).toBe(400);
		expect(httpResponse.body).toEqual(new MissingParamError("password"));
	});

	test("Should return 400 if missign passwordConfirmation", () => {
		const {sut} = makeSut();
		const httpRequest = {
			body: {
				username: "any_username",
				email: "any_email@mail.com",
				password: "any_password"
			}
		};
		const httpResponse = sut.handle(httpRequest);
		expect(httpResponse.statusCode).toBe(400);
		expect(httpResponse.body).toEqual(new MissingParamError("passwordConfirmation"));
	});

	test("Should return 400 if an invalid email is provided", () => {
		const {sut, emailValidatorStub} = makeSut();
		jest.spyOn(emailValidatorStub, "isValid").mockReturnValueOnce(false);
		const httpRequest = {
			body: {
				username: "any_username",
				email: "invalid@mail.com",
				password: "any_password",
				passwordConfirmation: "any_password"
			}
		};
		const httpResponse = sut.handle(httpRequest);
		expect(httpResponse.statusCode).toBe(400);
		expect(httpResponse.body).toEqual(new InvalidParamError("email"));
	});
});