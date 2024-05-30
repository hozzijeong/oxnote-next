'use client';

import { useCategoryInput } from '../hooks';
import { Category } from '../types';
import styles from './categoryInput.module.scss';
import { Button, Input } from '@/components';

type CategoryInputProps = {
	category: Category[];
};

const CategoryInput = ({ category }: CategoryInputProps) => {
	const { categoryInput, inputChangeHandler, addCategoryHandler } =
		useCategoryInput(category);

	return (
		<div className={styles['add-category-container']}>
			<Input
				className={styles['add-input']}
				placeholder='추가할 카테고리를 입력하세요'
				value={categoryInput}
				onChange={inputChangeHandler}
			/>
			<Button
				size='large'
				className={styles['add-button']}
				type='submit'
				onClick={addCategoryHandler}
			>
				추가하기
			</Button>
		</div>
	);
};

export default CategoryInput;
