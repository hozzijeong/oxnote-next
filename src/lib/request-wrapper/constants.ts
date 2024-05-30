import { FailureType } from './types';

export const RESPONSE_MESSAGE = {
	SUCCESS: 'SUCCESS',
	FAILURE: 'FAILURE',
} as const;

export const HTTP_METHOD = {
	DELETE: 'DELETE',
	GET: 'GET',
	PATCH: 'PATCH',
	POST: 'POST',
	PUT: 'PUT',
} as const;

export const HTTP_STATUS_CODE = {
	OK: 200,
	CREATED: 201,
	NO_CONTENT: 204,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	NOT_METHOD_ALLOWED: 405,
	REQUEST_TIMEOUT: 408,
	CONFLICT: 409,
	INTERNAL_SERVER_ERROR: 500,
} as const;

export const RESPONSE_BAD_REQUEST: FailureType = {
	message: RESPONSE_MESSAGE.FAILURE,
	code: null,
	data: null,
	errors: {
		code: HTTP_STATUS_CODE.BAD_REQUEST,
		message: '허용된 요청문이 아닙니다.',
	},
} as const;

export const RESPONSE_NOT_METHOD_ALLOWED: FailureType = {
	message: RESPONSE_MESSAGE.FAILURE,
	code: null,
	data: null,
	errors: {
		code: HTTP_STATUS_CODE.NOT_METHOD_ALLOWED,
		message: '유효한 요청 메서드가 아닙니다.',
	},
} as const;

export const RESPONSE_NOT_FOUND: FailureType = {
	message: RESPONSE_MESSAGE.FAILURE,
	code: null,
	data: null,
	errors: {
		code: HTTP_STATUS_CODE.NOT_FOUND,
		message: '유효한 요청 URL이 아닙니다.',
	},
} as const;

export const RESPONSE_UNAUTHORIZED: FailureType = {
	message: RESPONSE_MESSAGE.FAILURE,
	code: null,
	data: null,
	errors: {
		code: HTTP_STATUS_CODE.UNAUTHORIZED,
		message: '유효한 사용자가 아닙니다.',
	},
} as const;

export const RESPONSE_REQUEST_TIMEOUT: FailureType = {
	message: RESPONSE_MESSAGE.FAILURE,
	code: null,
	data: null,
	errors: {
		code: HTTP_STATUS_CODE.REQUEST_TIMEOUT,
		message: '서버 응답이 지연되어 요청이 실패했습니다',
	},
} as const;

export const REQUEST_CONFLICT: FailureType = {
	message: RESPONSE_MESSAGE.FAILURE,
	code: null,
	data: null,
	errors: {
		code: HTTP_STATUS_CODE.CONFLICT,
		message: '요청값이 중복 존재합니다',
	},
} as const;
