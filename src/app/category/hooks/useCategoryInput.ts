'use client';

import { useState } from 'react';
import { Category } from '../types';

const useCategoryInput = (categories: Category[]) => {
	const [categoryInput, setCategoryInput] = useState('');

	const inputChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (
		event
	) => {
		setCategoryInput(event.target.value);
	};

	const addCategoryHandler: React.MouseEventHandler<HTMLButtonElement> = async (
		event
	) => {
		event.preventDefault();

		const result = confirm(
			`${categoryInput}으로 입력하면 변경이 불가능합니다. 추가하시겠습니까?`
		);

		if (result) {
			setCategoryInput('');
		}
	};

	return { categoryInput, inputChangeHandler, addCategoryHandler };
};

export default useCategoryInput;
