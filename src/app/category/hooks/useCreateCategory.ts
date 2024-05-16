import { http } from '@/lib/api';
import { Category } from '../types';
import { useCallback } from 'react';
import useSWRMutation from 'swr/mutation';
import { Key } from 'swr';

export const useCreateCategory = () => {
	const { trigger, isMutating, reset } = useSWRMutation<
		null,
		Error,
		Key,
		Category
	>('/api/category', http.post);

	const createCategory = useCallback(
		async (params: Category) => {
			const result = await trigger(params);
			return result;
		},
		[trigger]
	);

	return { createCategory, isMutating, reset };
};
