import { createCollection, getFilteredQuerySnapShot } from '@/lib/firebase';
import {
	HTTP_METHOD,
	HTTP_STATUS_CODE,
	RESPONSE_MESSAGE,
	nextResponseWithResponseType,
	requestWrapper,
} from '@/lib/request-wrapper';
import { getDoc, where, QueryFilterConstraint } from 'firebase/firestore';
import type { QuizInfo } from '@/types/quiz';
import type { Quiz, QuizListResponse } from './quiz.type';
import { quizFireStoreConverter } from './converter';
import { calculateCorrectRate } from '@/lib/utils';

// NOTE: 여러가지의 퀴즈 정보를 얻는 방법으로 파라미터를 사용할 수 있지만, 이 방법 말고 POST를 통해서 얻어보려했음.
// 하지만, 이미 파일 기반의 route에는 퀴즈 추가 형식으로 POST가 존재하기 때문에 GET으로 사용해볼 생각
// 서버 컴포넌트 사용은 힘들것 같음 ㅠㅠ
export const GET = requestWrapper(
	async (req) => {
		const { cookies, url } = req;

		const requestUrl = new URL(url);

		const urlParams = new URLSearchParams(requestUrl.search);

		const filters: QueryFilterConstraint[] = [];

		for (const [key, value] of urlParams.entries()) {
			if (key === 'category-id') {
				filters.push(where('category_id', '==', value));
			}

			if (key === 'favorite') {
				filters.push(where('favorite', '==', value === 'true' ? true : false));
			}

			// if(key === 'isFirst'){

			// }

			// if(key === 'correctRate'){

			// }
		}

		const userId = cookies.get('user-id');

		const PATH = `${userId?.value}/quiz/data`;

		const filteredQuizInfo = await getFilteredQuerySnapShot<QuizInfo, Quiz>(
			PATH,
			quizFireStoreConverter,
			filters
		);

		const result: QuizListResponse[] = [];

		filteredQuizInfo.forEach((quizInfo) => {
			const {
				id,
				favorite,
				title,
				record: { tryCount, wrongCount },
			} = quizInfo.data();
			const correctRate = calculateCorrectRate(tryCount, wrongCount);
			result.push({
				id,
				favorite,
				title,
				correctRate,
			});
		});

		return nextResponseWithResponseType({
			body: {
				message: RESPONSE_MESSAGE.SUCCESS,
				code: HTTP_STATUS_CODE.OK,
				data: result,
				errors: null,
			},
			options: {
				status: HTTP_STATUS_CODE.OK,
			},
		});
	},
	{
		methodWhiteList: ['GET'],
	}
);

export const POST = requestWrapper(
	async (req) => {
		const { cookies } = req;

		const cookie = cookies.get('user-id');

		const PATH = `${cookie?.value}/quiz`;

		const { arg } = await req.json();

		const quizObject = {
			...arg,
			id: '',
			record: {
				tryCount: 0,
				wrongCount: 0,
			},
		};

		const data = await createCollection<QuizInfo, Quiz>({
			path: PATH,
			key: 'data',
			data: quizObject,
			converter: quizFireStoreConverter,
		});

		const createdReference = data.withConverter(quizFireStoreConverter);
		const snapshot = await getDoc(createdReference);

		return nextResponseWithResponseType({
			body: {
				message: RESPONSE_MESSAGE.SUCCESS,
				code: HTTP_STATUS_CODE.CREATED,
				data: snapshot.data(),
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
