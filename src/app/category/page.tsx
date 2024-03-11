import styles from './category.module.scss';
import { Header } from '@/components';
import CategoryInput from './components/CategoryInput';
import { Category } from './types';
import Link from 'next/link';
import Image from 'next/image';
import { Folder } from '@/assets';
import { URL_PATH } from '@/constants/path';
import { getRandomColor } from '@/utils/colors';

const CATEGORIES: Category[] = [
	{ id: 1, name: '첫 번째' },
	{ id: 2, name: '두 번째' },
	{ id: 3, name: '세 번째' },
	{ id: 4, name: '네 번째' },
];

const Category = () => {
	return (
		<main className={styles.main}>
			<Header title='카테고리' />
			<section className={styles.container}>
				<CategoryInput category={CATEGORIES} />
				<section className={styles['category-container']}>
					{CATEGORIES.length === 0 ? (
						<div className={styles['empty-container']}>
							<p>등록된 카테고리가 없습니다</p>
						</div>
					) : (
						CATEGORIES.map(({ id, name }) => (
							<Link
								key={id}
								style={{ backgroundColor: getRandomColor() }}
								className={styles['category-folder']}
								href={{
									pathname: `${URL_PATH.CATEGORY}/${id}`,
								}}
							>
								<Image
									src={Folder}
									width={60}
									height={60}
									alt={`${name} 폴더`}
								/>
								{name}
							</Link>
						))
					)}
				</section>
			</section>
		</main>
	);
};

export default Category;
