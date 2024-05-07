import { Converter, createConverterWrapper } from '@/lib/firebase/converter';
import { Category, CategoryInDB } from './category.type';

const categoryConverter: Converter<Category[], CategoryInDB> = {
	fromFirestore(snapshot): Category[] {
		const data = snapshot.data();
		const result: Category[] = [];

		for (const [id, name] of Object.entries(data)) {
			result.push({
				id,
				name,
			});
		}
		return result;
	},
	toFirestore(category: Category[]): CategoryInDB {
		return {
			[category[0].id]: category[0].name,
		};
	},
};

export const categoryFireStoreConverter =
	createConverterWrapper(categoryConverter);
