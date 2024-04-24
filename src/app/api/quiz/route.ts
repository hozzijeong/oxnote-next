import { createCollection } from '@/lib/firebase';
import { quizConverter } from '@/lib/firebase/converter';
import {
	HTTP_METHOD,
	HTTP_STATUS_CODE,
	RESPONSE_MESSAGE,
	nextResponseWithResponseType,
	requestWrapper,
} from '@/lib/request-wrapper';
import { getDoc } from 'firebase/firestore';

const GET = () => {};

export const POST = requestWrapper(
	async (req) => {
		const { cookies } = req;

		const cookie = cookies.get('user-id');

		const PATH = `${cookie?.value}/quiz`;

		const params = await req.json();

		const data = await createCollection({
			path: PATH,
			key: 'data',
			data: params,
		});

		const createdReference = data.withConverter(quizConverter);

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
