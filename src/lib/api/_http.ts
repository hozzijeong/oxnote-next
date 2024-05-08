import type { FailureResponse, SuccessResponse } from '.';

const BASE_URL = 'http://localhost:3000';

export const http = {
	get: async <T>(
		endPoint: RequestInfo | URL
	): Promise<SuccessResponse<T> | FailureResponse> => {
		const response = await fetch(`${BASE_URL}${endPoint}`, {
			headers: {
				'Content-Type': 'application/json',
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
			},
			credentials: 'include',
			body: JSON.stringify(params),
		});

		return response.json();
	},
};
