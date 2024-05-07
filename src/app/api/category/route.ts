import {
	getDocumentSnapshot,
	updateDocumentData,
} from '@/lib/firebase/fire-store';
import {
	HTTP_METHOD,
	HTTP_STATUS_CODE,
	RESPONSE_MESSAGE,
	nextResponseWithResponseType,
	requestWrapper,
} from '@/lib/request-wrapper';
import { REQUEST_CONFLICT } from '@/lib/request-wrapper/constants';
import { categoryFireStoreConverter } from './converter';

type Category = {
	id: string;
	name: string;
};

export const GET = requestWrapper(
	async (req) => {
		try {
			const { cookies, url } = req;

			const userId = cookies.get('user-id');

			const categorySnapshot = await getDocumentSnapshot(
				`${userId?.value}/category`,
				categoryFireStoreConverter
			);

			if (!categorySnapshot.exists()) {
				return nextResponseWithResponseType({
					body: {
						message: RESPONSE_MESSAGE.SUCCESS,
						code: HTTP_STATUS_CODE.OK,
						data: [],
						errors: null,
					},
					options: {
						status: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
					},
				});
			}

			const data = categorySnapshot.data();

			return nextResponseWithResponseType({
				body: {
					message: RESPONSE_MESSAGE.SUCCESS,
					code: HTTP_STATUS_CODE.OK,
					data: data,
					errors: null,
				},
				options: {
					status: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
				},
			});
		} catch (error) {
			return nextResponseWithResponseType({
				body: {
					message: RESPONSE_MESSAGE.FAILURE,
					code: null,
					data: null,
					errors: {
						code: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
						message: `확인되지 않은 에러가 발생했습니다 : ${JSON.stringify(
							error
						)}`,
					},
				},
				options: { status: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR },
			});
		}
	},
	{
		methodWhiteList: [HTTP_METHOD.GET],
		certification: true,
	}
);

export const POST = requestWrapper(
	async (req) => {
		const { cookies } = req;
		const params = (await req.json()) as Category;

		const userId = cookies.get('user-id');

		const currentCategoryList = await getDocumentSnapshot(
			`${userId?.value}/category`,
			categoryFireStoreConverter
		);

		if (currentCategoryList.exists()) {
			if (currentCategoryList.data().find((d) => d.name === params.name)) {
				return nextResponseWithResponseType({
					body: REQUEST_CONFLICT,
					options: {
						status: HTTP_STATUS_CODE.CONFLICT,
					},
				});
			}
		}

		await updateDocumentData({
			path: `${userId?.value}/category`,
			data: {
				[params.id]: params.name,
			},
			merge: true,
		});

		return nextResponseWithResponseType({
			body: {
				message: RESPONSE_MESSAGE.SUCCESS,
				code: HTTP_STATUS_CODE.CREATED,
				data: null,
				errors: null,
			},
			options: { status: HTTP_STATUS_CODE.CREATED },
		});
	},
	{ methodWhiteList: [HTTP_METHOD.POST], certification: true }
);
