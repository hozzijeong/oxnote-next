'use client';

import styles from './category.module.scss';
import CategoryInput from './components/CategoryInput';
import Link from 'next/link';
import Image from 'next/image';
import { Folder } from '@/assets';
import { URL_PATH } from '@/constants/path';
import { getRandomColor } from '@/utils/colors';
import { useGetCategoryList } from './hooks';

const CategoryPage = () => {
	const { data: categoryList } = useGetCategoryList();

	return (
		<section className={styles.container}>
			<CategoryInput category={categoryList} />
			<section className={styles['category-container']}>
				{categoryList.length === 0 ? (
					<div className={styles['empty-container']}>
						<p>등록된 카테고리가 없습니다</p>
					</div>
				) : (
					categoryList.map(({ id, name }) => (
						<Link
							key={id}
							style={{ backgroundColor: getRandomColor() }}
							className={styles['category-folder']}
							href={{
								pathname: `${URL_PATH.CATEGORY}/${id}`,
							}}
						>
							<Image src={Folder} width={60} height={60} alt={`${name} 폴더`} />
							{name}
						</Link>
					))
				)}
			</section>
		</section>
	);
};

export default CategoryPage;
