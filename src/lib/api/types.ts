export type SuccessResponse<T> = {
	message: 'SUCCESS';
	code: number;
	data: T;
	errors: null;
};

export type FailureResponse = {
	message: 'FAILURE';
	code: null;
	data: null;
	errors: {
		code: number;
		message: string;
	};
};
