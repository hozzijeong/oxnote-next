import { Category } from '@/app/category/types';
import { Quiz, QuizInfo } from '@/types/quiz';
import { User } from 'firebase/auth';
import {
	DocumentData,
	FirestoreDataConverter,
	QueryDocumentSnapshot,
	SnapshotOptions,
} from 'firebase/firestore';

export const quizConverter: FirestoreDataConverter<QuizInfo> = {
	fromFirestore(
		snapshot: QueryDocumentSnapshot,
		options: SnapshotOptions
	): QuizInfo {
		const data = snapshot.data(options);

		return {
			id: snapshot.id,
			title: data.title,
			explain: data.explain,
			answer: data.answer,
			categoryId: data.category_id,
			favorite: data.favorite,
			record: {
				tryCount: data.record.try_count,
				wrongCount: data.record.wrong_count,
			},
		};
	},
	toFirestore(quiz: QuizInfo): DocumentData {
		return {
			title: quiz.title,
			explain: quiz.explain,
			answer: quiz.answer,
			favorite: quiz.favorite,
			category_id: quiz.categoryId,
			record: {
				try_count: quiz.record.tryCount,
				wrong_count: quiz.record.wrongCount,
			},
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
