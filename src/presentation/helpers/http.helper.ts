
import { IHttpResponse } from "../../interfaces/http.interface";

export const badRequest = (error: Error): IHttpResponse => ({
	statusCode: 400,
	body: error
});