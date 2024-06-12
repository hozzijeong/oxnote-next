import { BASE_URL } from '@/constants/path';
import type { FailureResponse, SuccessResponse } from '.';
import { CustomError } from '../error';

type ResponseResult<T> = SuccessResponse<T> | FailureResponse;

export const http = {
	// TODO: Throw하는 Custom Error 만들기
	get: async <T>(endPoint: RequestInfo | URL): Promise<T> => {
		const response = await fetch(`${BASE_URL}${endPoint}`, {
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			credentials: 'include',
		});

		const data = (await response.json()) as ResponseResult<T>;

		if (data.message === 'FAILURE') {
			throw new CustomError(data.errors);
		}

		return data.data;
	},

	post: async <T, V>(endPoint: RequestInfo | URL, params: V): Promise<T> => {
		const response = await fetch(`${BASE_URL}${endPoint}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify(params),
		});

		const data = (await response.json()) as ResponseResult<T>;

		if (data.message === 'FAILURE') {
			throw new CustomError(data.errors);
		}

		return data.data;
	},

	patch: async <T, V>(endPoint: RequestInfo | URL, params: V): Promise<T> => {
		const response = await fetch(`${BASE_URL}${endPoint}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify(params),
		});

		const data = (await response.json()) as ResponseResult<T>;

		if (data.message === 'FAILURE') {
			throw new CustomError(data.errors);
		}

		return data.data;
	},

	delete: async <T>(endPoint: RequestInfo | URL): Promise<T> => {
		const response = await fetch(`${BASE_URL}${endPoint}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			credentials: 'include',
		});

		const data = (await response.json()) as ResponseResult<T>;

		if (data.message === 'FAILURE') {
			throw new CustomError(data.errors);
		}

		return data.data;
	},
};
