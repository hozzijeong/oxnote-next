'use client';

import { useState } from 'react';
import { Category } from '../types';
import { useCreateCategory } from '.';
import { useConfirm } from '@/components';

export const useCategoryInput = (categoryList: Category[]) => {
	const [categoryInput, setCategoryInput] = useState('');
	const { createCategory } = useCreateCategory();

	const confirm = useConfirm();

	const inputChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (
		event
	) => {
		setCategoryInput(event.target.value);
	};

	const addCategoryHandler: React.MouseEventHandler<HTMLButtonElement> = async (
		event
	) => {
		event.preventDefault();

		const result = await confirm({
			title: '안내',
			message: `${categoryInput}으로 입력하면 변경이 불가능합니다. 추가하시겠습니까?`,
		});

		if (result) {
			if (categoryList.map((c) => c.name).includes(categoryInput)) {
				alert(`${categoryInput}은 중복되는 카테고리입니다`);

				return;
			}
			createCategory({
				id: `${Date.now()}`,
				name: categoryInput,
			});
			setCategoryInput('');
		}
	};

	return { categoryInput, inputChangeHandler, addCategoryHandler };
};
