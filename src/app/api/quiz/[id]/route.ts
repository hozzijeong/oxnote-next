import { getDocumentSnapshot } from '@/lib/firebase';
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

// 데이터 업데이트를 Patch를 해야겠다

const POST = requestWrapper(
	async (req) => {
		const { cookies } = req;

		const cookie = cookies.get('user-id');

		const PATH = `${cookie?.value}/quiz`;

		const params = await req.json();

		// const data = await createCollection({
		// 	path: PATH,
		// 	key: 'data',
		// 	data: params,
		// });

		// const createdReference = data.withConverter(quizConverter);

		// const snapshot = await getDoc(createdReference);

		return nextResponseWithResponseType({
			body: {
				message: RESPONSE_MESSAGE.SUCCESS,
				code: HTTP_STATUS_CODE.CREATED,
				data: null,
				errors: null,
			},
			options: {
				status: HTTP_STATUS_CODE.CREATED,
			},
		});
	},
	{
		methodWhiteList: [HTTP_METHOD.POST],
		certification: true,
	}
);

const PUT = () => {};
const PATCH = () => {};
const DELETE = () => {};