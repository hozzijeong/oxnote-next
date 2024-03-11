import styles from './category.module.scss';
import { Header } from '@/components';

const Category = () => {
	return (
		<main className={styles.main}>
			<Header title='모아보기' />
			<section className={styles.container}>
				{/* <CategoryInput category={category} /> */}
				<section className={styles['category-container']}></section>
			</section>
		</main>
	);
};

export default Category;
