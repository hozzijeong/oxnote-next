import { BASE_URL } from '@/constants/path';
import type { FailureResponse, SuccessResponse } from '.';

export const http = {
	get: async <T>(
		endPoint: RequestInfo | URL
	): Promise<SuccessResponse<T> | FailureResponse> => {
		const response = await fetch(`${BASE_URL}${endPoint}`, {
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			credentials: 'include',
		});

		return response.json();
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
};
