import { getDocumentSnapshot, updateDocument } from '@/lib/firebase';
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

		const { answer } = data;

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

		await updateDocument(`${userId?.value}/quiz/data/${quizId}`, body);

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
const DELETE = () => {};
