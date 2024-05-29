import {
	deleteDocument,
	getDocumentSnapshot,
	updateDocument,
} from '@/lib/firebase';
import {
	HTTP_METHOD,
	HTTP_STATUS_CODE,
	RESPONSE_MESSAGE,
	nextResponseWithResponseType,
	requestWrapper,
} from '@/lib/request-wrapper';
import { quizFireStoreConverter } from '../converter';
import { QuizResponse } from '../quiz.type';
import { calculateCorrectRate } from '@/lib/utils';

// TODO: Custom Error 생성해서, 문제발생시 error를 throw하고, 한번에 처리하기.

export const GET = requestWrapper(
	async (req) => {
		const { cookies, url } = req;

		const userId = cookies.get('user-id');

		const quizId = url.split('/').pop();

		if (!quizId)
			return nextResponseWithResponseType({
				body: {
					message: RESPONSE_MESSAGE.FAILURE,
					code: null,
					data: null,
					errors: {
						code: HTTP_STATUS_CODE.NOT_FOUND,
						message: '잘못된 경로입니다.',
					},
				},
				options: {
					status: HTTP_STATUS_CODE.NOT_FOUND,
				},
			});

		const quizSnapshot = await getDocumentSnapshot(
			`${userId?.value}/quiz/data/${quizId}`,
			quizFireStoreConverter
		);

		const quizInfo = quizSnapshot.data();

		if (!quizInfo) {
			return nextResponseWithResponseType({
				body: {
					message: RESPONSE_MESSAGE.FAILURE,
					code: null,
					data: null,
					errors: {
						code: HTTP_STATUS_CODE.NOT_FOUND,
						message: '퀴즈가 존재하지 않습니다',
					},
				},
				options: {
					status: HTTP_STATUS_CODE.OK,
				},
			});
		}

		const { record, ...rest } = quizInfo;

		const data: QuizResponse = {
			...rest,
			correctRate: calculateCorrectRate(record.tryCount, record.wrongCount),
		};

		return nextResponseWithResponseType({
			body: {
				message: RESPONSE_MESSAGE.SUCCESS,
				code: HTTP_STATUS_CODE.OK,
				data,
				errors: null,
			},
			options: {
				status: HTTP_STATUS_CODE.OK,
			},
		});
	},
	{
		methodWhiteList: ['GET'],
		certification: true,
	}
);

// NOTE: 문제 정답에 대한 처리르 하는 메서드
export const POST = requestWrapper(
	async (req) => {
		const { cookies, url } = req;

		const userId = cookies.get('user-id');

		const quizId = url.split('/').pop();

		if (!quizId)
			return nextResponseWithResponseType({
				body: {
					message: RESPONSE_MESSAGE.FAILURE,
					code: null,
					data: null,
					errors: {
						code: HTTP_STATUS_CODE.NOT_FOUND,
						message: '잘못된 경로입니다.',
					},
				},
				options: {
					status: HTTP_STATUS_CODE.NOT_FOUND,
				},
			});

		const quizSnapshot = await getDocumentSnapshot(
			`${userId?.value}/quiz/data/${quizId}`,
			quizFireStoreConverter
		);

		const data = await req.json();

		const quizInfo = quizSnapshot.data();

		if (!quizInfo) {
			return nextResponseWithResponseType({
				body: {
					message: RESPONSE_MESSAGE.FAILURE,
					code: null,
					data: null,
					errors: {
						code: HTTP_STATUS_CODE.NOT_FOUND,
						message: '퀴즈가 존재하지 않습니다',
					},
				},
				options: {
					status: HTTP_STATUS_CODE.OK,
				},
			});
		}

		const {
			arg: { answer },
		} = data;

		const result = answer === quizInfo.answer;

		const {
			record: { tryCount, wrongCount },
		} = quizInfo;

		await updateDocument(`${userId?.value}/quiz/data/${quizId}`, {
			record: {
				try_count: tryCount + 1,
				wrong_count: result ? wrongCount : wrongCount + 1,
				recent_correct: result ? true : false,
			},
		});

		return nextResponseWithResponseType({
			body: {
				message: RESPONSE_MESSAGE.SUCCESS,
				code: HTTP_STATUS_CODE.OK,
				data: { result: answer === quizInfo.answer },
				errors: null,
			},
			options: {
				status: HTTP_STATUS_CODE.OK,
			},
		});
	},
	{
		methodWhiteList: [HTTP_METHOD.POST],
		certification: true,
	}
);

const PUT = () => {};

export const PATCH = requestWrapper(
	async (req) => {
		const { cookies, url } = req;

		const userId = cookies.get('user-id');

		const quizId = url.split('/').pop();

		const body = await req.json();

		if (!quizId) {
			console.log('invalidPath');
			return nextResponseWithResponseType({
				body: {
					message: RESPONSE_MESSAGE.FAILURE,
					code: null,
					data: null,
					errors: {
						code: HTTP_STATUS_CODE.NOT_FOUND,
						message: '잘못된 경로입니다.',
					},
				},
				options: {
					status: HTTP_STATUS_CODE.NOT_FOUND,
				},
			});
		}

		const { arg } = body;

		await updateDocument(`${userId?.value}/quiz/data/${quizId}`, { ...arg });

		return nextResponseWithResponseType({
			body: {
				message: RESPONSE_MESSAGE.SUCCESS,
				code: HTTP_STATUS_CODE.OK,
				data: null,
				errors: null,
			},
			options: {
				status: HTTP_STATUS_CODE.OK,
			},
		});
	},
	{
		methodWhiteList: [HTTP_METHOD.PATCH],
	}
);

export const DELETE = requestWrapper(
	async (req) => {
		const { cookies, url } = req;

		const userId = cookies.get('user-id');

		const quizId = url.split('/').pop();

		if (!quizId)
			return nextResponseWithResponseType({
				body: {
					message: RESPONSE_MESSAGE.FAILURE,
					code: null,
					data: null,
					errors: {
						code: HTTP_STATUS_CODE.NOT_FOUND,
						message: '잘못된 경로입니다.',
					},
				},
				options: {
					status: HTTP_STATUS_CODE.NOT_FOUND,
				},
			});

		await deleteDocument(`${userId?.value}/quiz/data/${quizId}`);

		return nextResponseWithResponseType({
			body: {
				message: RESPONSE_MESSAGE.SUCCESS,
				code: HTTP_STATUS_CODE.OK,
				data: { quizId },
				errors: null,
			},
			options: {
				status: HTTP_STATUS_CODE.OK,
			},
		});
	},
	{
		methodWhiteList: [HTTP_METHOD.DELETE],
	}
);
