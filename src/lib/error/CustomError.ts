import { APIError } from '.';

export class CustomError extends Error {
	message: string;
	code: number | null = null;

	constructor(params: APIError | Pick<Error, 'message'>) {
		super();
		this.message = params.message;
		if ('code' in params) {
			this.code = params.code;
		}
	}
}
