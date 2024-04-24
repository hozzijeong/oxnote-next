import { Category } from '@/app/category/types';
import { Quiz } from '@/types/quiz';
import { User } from 'firebase/auth';
import {
	DocumentData,
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
	toFirestore(quiz: Quiz): DocumentData {
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
	toFirestore(category: Category[]): DocumentData {
		return {
			[category[0].id]: category[0].name,
		};
	},
};

export const userConverter: FirestoreDataConverter<
	Pick<User, 'uid' | 'displayName' | 'email'>
> = {
	fromFirestore(
		snapshot: QueryDocumentSnapshot,
		options: SnapshotOptions
	): Pick<User, 'uid' | 'displayName' | 'email'> {
		const data = snapshot.data(options);
		return {
			uid: data.uid,
			displayName: data.userName,
			email: data.email,
		};
	},
	toFirestore(user: Pick<User, 'uid' | 'displayName' | 'email'>): DocumentData {
		return {
			...user,
		};
	},
};
