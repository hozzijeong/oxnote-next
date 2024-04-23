import { createCollection } from '@/lib/firebase';
import { quizConverter } from '@/lib/firebase/converter';
import {
	HTTP_METHOD,
	HTTP_STATUS_CODE,
	RESPONSE_MESSAGE,
	withFilter,
} from '@/lib/with-filter';
import { getDoc } from 'firebase/firestore';
import { NextResponse } from 'next/server';

const GET = () => {};

export const POST = withFilter(
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

		return new NextResponse(
			JSON.stringify({
				message: RESPONSE_MESSAGE.SUCCESS,
				code: HTTP_STATUS_CODE.CREATED,
				data: snapshot.data(),
				errors: null,
			})
		);
	},
	{
		methodWhiteList: [HTTP_METHOD.POST],
		certification: true,
	}
);

const PUT = () => {};
const PATCH = () => {};
const DELETE = () => {};
