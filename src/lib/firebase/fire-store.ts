import {
	DocumentData,
	doc,
	getFirestore,
	collection,
	setDoc,
	getDoc,
	query,
	addDoc,
	getDocs,
	deleteDoc,
	and,
	QueryFilterConstraint,
	where,
	DocumentSnapshot,
} from 'firebase/firestore';
import { app } from '.';

type MutateDocumentPathParams = {
	path: string;
	data: DocumentData;
};

type WithMergeOption = MutateDocumentPathParams & {
	merge?: boolean;
};

const db = getFirestore(app);

// NOTE: 새로운 데이터를 '추가'하는 메서드
export const createCollection = async ({
	path,
	data,
}: MutateDocumentPathParams): Promise<void> => {
	try {
		const docRef = await addDoc(collection(db, `${path}`), data);
	} catch (e) {
		throw new Error('새 문서를 생성하는 데 실패했습니다.');
	}
};

// NOTE: document에 데이터가 없다면 추가를, 기존에 데이터가 있다면 'merge'옵션에 따라 대체하거나, 합치는 역할을 하는 메서드
export const updateDocumentData = async ({
	path,
	merge,
	data,
}: WithMergeOption): Promise<void> => {
	try {
		const documentRef = doc(db, path);

		await setDoc(documentRef, data, { merge });
	} catch (e) {
		throw new Error('문서를 업데이트하는데 실패했습니다.');
	}
};

// NOTE: 특정 경로에 있는 문서를 읽는 메서드.
export const getDocumentSnapshot = async (
	path: string
): Promise<DocumentSnapshot<DocumentData, DocumentData>> => {
	const categorySnapShot = await getDoc(doc(db, `${path}`));

	return categorySnapShot;
};

type FilterParams = {
	categoryId?: string;
	favorite?: boolean;
};

// NOTE: queryConstraints(쿼리 제약)에 해당하는 여러 문서들을 반환하는 메서드
export const getFilteredQuerySnapShot = async (
	path: string,
	parameter: FilterParams
) => {
	const docRef = collection(db, `${path}`);

	const filter: QueryFilterConstraint[] = [];

	if (parameter.categoryId) {
		filter.push(where('categoryId', '==', parameter.categoryId));
	}

	const currentQuery = query(docRef, and(...filter));

	const querySnapshot = await getDocs(currentQuery);

	return querySnapshot;
};

// NOTE: Document를 제거하는 메서드
export const deleteDocument = async (path: string) => {
	const document = doc(db, `${path}`);

	await deleteDoc(document);
};
