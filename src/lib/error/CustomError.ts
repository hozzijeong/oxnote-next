import { APIError } from '.';
import { HTTP_STATUS_CODE } from '../request-wrapper';

export class CustomError extends Error {
	message: string;
	code: (typeof HTTP_STATUS_CODE)[keyof typeof HTTP_STATUS_CODE] | null = null;

	constructor(params: APIError | Pick<Error, 'message'>) {
		super();
		this.message = params.message;
		if ('code' in params) {
			this.code = params.code;
		}
	}
}
