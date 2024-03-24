'use client';

import { URL_PATH } from '@/constants/path';
import { Back, MenuVertical } from '@/assets';
import { useCallback, useMemo } from 'react';
import useToggle from '@/hooks/useToggle';
import Image from 'next/image';
import styles from './header.module.scss';
import { useRouter } from 'next/navigation';

const isKeyofURLPath = (backUrl: any): backUrl is keyof typeof URL_PATH => {
	return backUrl in URL_PATH;
};

interface HeaderProps {
	title: string;
	backUrl?: keyof typeof URL_PATH | -1;
	pathId?: string | number;
	menuComponent?: React.ReactNode;
}

const Header = ({ title, backUrl, pathId, menuComponent }: HeaderProps) => {
	const router = useRouter();

	const backClickHandler = useCallback(() => {
		let historyBackUrl: string | number = -1;

		if (isKeyofURLPath(backUrl)) {
			historyBackUrl = pathId
				? `${URL_PATH[backUrl]}/${pathId}`
				: URL_PATH[backUrl];
		}

		if (typeof historyBackUrl === 'number') {
			router.back();
		} else {
			router.push(historyBackUrl);
		}
	}, [backUrl, pathId, router]);

	const backUrlButton = useMemo(() => {
		return (
			backUrl && (
				<button className={styles['back-arrow']} onClick={backClickHandler}>
					<Image src={Back} width={20} height={20} alt='뒤로 가기' />
				</button>
			)
		);
	}, [backClickHandler, backUrl]);

	const { isOn: menuOn, toggle: menuHandler } = useToggle(false);

	return (
		<header className={styles.container}>
			{backUrlButton}
			{title}
			{menuComponent && (
				<button
					className={styles.menu}
					type='button'
					onClick={menuHandler}
					aria-label='메뉴'
				>
					<Image src={MenuVertical} width={20} height={20} alt='메뉴 클릭' />
				</button>
			)}
			{menuOn && menuComponent}
		</header>
	);
};

export default Header;
