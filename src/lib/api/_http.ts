import { BASE_URL } from '@/constants/path';
import type { FailureResponse, SuccessResponse } from '.';

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

		const data = (await response.json()) as
			| SuccessResponse<T>
			| FailureResponse;

		if (data.message === 'FAILURE') {
			throw new Error(`data.errors`);
		}

		return data.data;
	},

	post: async <T, V>(
		endPoint: RequestInfo | URL,
		params: V
	): Promise<SuccessResponse<T> | FailureResponse> => {
		const response = await fetch(`${BASE_URL}${endPoint}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify(params),
		});

		return response.json();
	},

	patch: async <T, V>(
		endPoint: RequestInfo | URL,
		params: V
	): Promise<SuccessResponse<T> | FailureResponse> => {
		const response = await fetch(`${BASE_URL}${endPoint}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify(params),
		});

		return response.json();
	},

	delete: async <T>(
		endPoint: RequestInfo | URL
	): Promise<SuccessResponse<T> | FailureResponse> => {
		const response = await fetch(`${BASE_URL}${endPoint}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			credentials: 'include',
		});

		return response.json();
	},
};
