'use client';

import { http } from '@/lib/api';
import { useEffect, useState } from 'react';
import type { Category } from '../types';
import type { ResponseType } from '@/lib/with-filter/with-filter.types';

// NOTE: 카테고리 리스트를 반환하는 리액트 훅
export const useGetCategoryList = () => {
	const [categoryList, setCategoryList] = useState<Category[]>([]);

	useEffect(() => {
		const getFetch = async () => {
			const data = await http.get<ResponseType<Category[]>>('/api/category');

			if (data.message === 'SUCCESS') {
				setCategoryList(data.data);
			}
		};

		getFetch();
	}, []);

	return categoryList;
};
