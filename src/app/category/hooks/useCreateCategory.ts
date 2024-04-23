import { http } from '@/lib/api';
import { Category } from '../types';
import { useCallback } from 'react';

export const useCreateCategory = () => {
	const createCategory = useCallback((params: Category) => {
		return http.post<null, Category>('/api/category', params);
	}, []);

	return createCategory;
};
