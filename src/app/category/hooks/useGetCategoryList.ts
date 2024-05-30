'use client';

import { http } from '@/lib/api';
import type { Category } from '../types';
import useSWR from 'swr';

// NOTE: 카테고리 리스트를 반환하는 리액트 훅
export const useGetCategoryList = () => {
	return useSWR('/api/category', http.get<Category[]>, { suspense: true });
};
