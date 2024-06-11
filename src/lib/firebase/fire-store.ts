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
	DocumentSnapshot,
	DocumentReference,
	QuerySnapshot,
	FirestoreDataConverter,
	updateDoc,
} from 'firebase/firestore';
import { firestore } from '.';

type MutateDocumentPathParams = {
	path: string;
	data: DocumentData;
};

type WithMergeOption = MutateDocumentPathParams & {
	merge?: boolean;
};

// TODO: firebase-admin sdk로 유저 관리하기 (root collection 삭제 가능하도록)

// NOTE: 중첩된 문서 경로에 컬렉션을 추가하는 메서드. data 값을 추가한다면, 생성과 동시에 새로운 값을 추가할 수 있다.
export const createCollection = async <T, D extends DocumentData>({
	path,
	key,
	data,
	converter,
}: {
	path: string;
	key: string;
	data: T;
	converter: FirestoreDataConverter<T, D>;
}): Promise<DocumentReference<T, D>> => {
	try {
		const docRef = doc(firestore, path);

		const docSnap = await getDoc(docRef);

		if (!docSnap.exists()) {
			throw new Error('존재하지 않는 경로입니다');
		}

		const newCollectionRef = collection(docRef, key).withConverter(converter);

		return addDoc(newCollectionRef, data);
	} catch (e) {
		throw e;
	}
};

// NOTE: 컬렉션에 문서를 추가하는 메서드. 단, 데이터의 id를 임의로 설정할 수 있다.
export const createCollectionDocument = async ({
	path,
	data,
}: MutateDocumentPathParams): Promise<
	DocumentReference<DocumentData, DocumentData>
> => {
	try {
		const docRef = await addDoc(collection(firestore, `${path}`), data);

		return docRef;
	} catch (e) {
		throw new Error('새 문서를 생성하는 데 실패했습니다');
	}
};

// NOTE: document에 데이터가 없다면 추가를, 기존에 데이터가 있다면 'merge'옵션에 따라 대체하거나, 합치는 역할을 하는 메서드
export const updateDocumentData = async ({
	path,
	merge,
	data,
}: WithMergeOption): Promise<void> => {
	try {
		const documentRef = doc(firestore, path);
		await setDoc(documentRef, data, { merge });
	} catch (e) {
		throw new Error('문서를 업데이트하는데 실패했습니다');
	}
};

// NOTE: 특정 경로에 있는 문서를 읽는 메서드.
export const getDocumentSnapshot = async <T, D extends DocumentData>(
	path: string,
	converter: FirestoreDataConverter<T, D>
): Promise<DocumentSnapshot<T, DocumentData>> => {
	try {
		return await getDoc(doc(firestore, `${path}`).withConverter(converter));
	} catch (e) {
		throw new Error('문서를 불러오는데 실패했습니다');
	}
};

// NOTE: queryConstraints(쿼리 제약)에 해당하는 여러 문서들을 반환하는 메서드
export const getFilteredQuerySnapShot = async <T, D extends DocumentData>(
	path: string,
	converter: FirestoreDataConverter<T, D>,
	filter: QueryFilterConstraint[] = []
): Promise<QuerySnapshot<T, D>> => {
	try {
		const docRef = collection(firestore, `${path}`);

		const currentQuery = query(docRef, and(...filter)).withConverter(converter);

		const querySnapshot = await getDocs(currentQuery);

		return querySnapshot;
	} catch (e) {
		throw new Error('문서를 불러오는데 실패했습니다');
	}
};

export const updateDocument = async <T extends { [x: string]: any }>(
	path: string,
	data: T
) => {
	try {
		const documentRef = doc(firestore, path);

		await updateDoc(documentRef, {
			...data,
		});
	} catch (e) {
		throw new Error('문서를 업데이트하는데 실패했습니다');
	}
};

// NOTE: Document를 제거하는 메서드
export const deleteDocument = async (path: string) => {
	try {
		const document = doc(firestore, `${path}`);

		await deleteDoc(document);
	} catch (e) {
		console.log(e);
		throw new Error('문서를 삭제하는데 실패했습니다');
	}
};
