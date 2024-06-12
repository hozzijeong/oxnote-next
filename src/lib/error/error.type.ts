import type { HTTP_STATUS_CODE } from '../request-wrapper';

export type APIError = {
	code: (typeof HTTP_STATUS_CODE)[keyof typeof HTTP_STATUS_CODE];
	message: string;
};
