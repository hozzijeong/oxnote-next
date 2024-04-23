import { Category } from '@/app/category/types';
import { Quiz } from '@/types/quiz';
import {
	FirestoreDataConverter,
	QueryDocumentSnapshot,
	SnapshotOptions,
} from 'firebase/firestore';

export const quizConverter: FirestoreDataConverter<Quiz> = {
	fromFirestore(
		snapshot: QueryDocumentSnapshot,
		options: SnapshotOptions
	): Quiz & { id: string } {
		const data = snapshot.data(options);
		return {
			id: snapshot.id,
			title: data.title,
			explain: data.explain,
			answer: data.answer,
			categoryId: data.categoryId,
			favorite: data.favorite,
		};
	},
	toFirestore(quiz: Quiz): FirebaseFirestore.DocumentData {
		return {
			...quiz,
		};
	},
};

export const categoryConverter: FirestoreDataConverter<Category[]> = {
	fromFirestore(
		snapshot: QueryDocumentSnapshot,
		options: SnapshotOptions
	): Category[] {
		const data = snapshot.data(options);
		const result: Category[] = [];

		for (const [id, name] of Object.entries(data)) {
			result.push({
				id,
				name,
			});
		}
		return result;
	},
	toFirestore(category: Category[]): FirebaseFirestore.DocumentData {
		return {
			[category[0].id]: category[0].name,
		};
	},
};
