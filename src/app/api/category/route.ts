// 카테고리 조회 메서드
import {
	getDocumentSnapshot,
	updateDocumentData,
} from '@/lib/firebase/fire-store';
import {
	HTTP_METHOD,
	HTTP_STATUS_CODE,
	RESPONSE_MESSAGE,
	withFilter,
} from '@/lib/with-filter';
import { REQUEST_CONFLICT } from '@/lib/with-filter/with-filter.const';
import { NextResponse } from 'next/server';

type Category = {
	id: string;
	name: string;
};

export const GET = withFilter<Category[]>(
	async (req) => {
		try {
			const { cookies } = req;

			const cookie = cookies.get('user-id');

			const categorySnapshot = await getDocumentSnapshot(
				`${cookie?.value}/category`
			);

			if (!categorySnapshot.exists()) {
				return new NextResponse(
					JSON.stringify({
						message: RESPONSE_MESSAGE.SUCCESS,
						code: HTTP_STATUS_CODE.OK,
						data: [],
						errors: null,
					}),
					{
						status: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
					}
				);
			}

			const category: Category[] = [];

			const data = categorySnapshot.data();

			Object.entries(data).forEach(([id, name]) => {
				category.push({
					id,
					name,
				});
			});

			return new NextResponse(
				JSON.stringify({
					message: RESPONSE_MESSAGE.SUCCESS,
					code: HTTP_STATUS_CODE.OK,
					data: category,
					errors: null,
				}),
				{
					status: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
				}
			);
		} catch (error) {
			return new NextResponse(
				JSON.stringify({
					message: RESPONSE_MESSAGE.FAILURE,
					code: null,
					data: null,
					errors: {
						code: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
						message: `확인되지 않은 에러가 발생했습니다 : ${JSON.stringify(
							error
						)}`,
					},
				}),
				{ status: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR }
			);
		}
	},
	{
		methodWhiteList: [HTTP_METHOD.GET],
		certification: true,
	}
);

export const POST = withFilter(
	async (req) => {
		const { cookies } = req;
		const params = (await req.json()) as Category;

		const cookie = cookies.get('user-id');

		const currentCategoryList = await getDocumentSnapshot(
			`${cookie?.value}/category`
		);

		if (currentCategoryList.exists()) {
			for (const name of Object.values(currentCategoryList.data())) {
				if (name === params.name) {
					return new NextResponse(JSON.stringify(REQUEST_CONFLICT), {
						status: HTTP_STATUS_CODE.CONFLICT,
					});
				}
			}
		}

		await updateDocumentData({
			path: `${cookie?.value}/category`,
			data: {
				[params.id]: params.name,
			},
			merge: true,
		});

		return new NextResponse(
			JSON.stringify({
				message: RESPONSE_MESSAGE.SUCCESS,
				code: HTTP_STATUS_CODE.CREATED,
				data: null,
				errors: null,
			}),
			{
				status: HTTP_STATUS_CODE.CREATED,
			}
		);
	},
	{ methodWhiteList: [HTTP_METHOD.POST], certification: true }
);
