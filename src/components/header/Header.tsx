import { URL_PATH } from '@/constants/path';
import { Back, MenuVertical } from '@/assets';
import { Fragment, useMemo } from 'react';
import useToggle from '@/hooks/useToggle';
import Image from 'next/image';
import styles from './header.module.scss';
import { useBackRouter } from './hooks/useBackRouter';

const Header = ({ children }: { children: React.ReactNode }) => {
	return <header className={styles.container}>{children}</header>;
};

const Menu = ({ children }: { children: React.ReactNode }) => {
	const { isOn: menuOn, toggle: menuHandler } = useToggle(false);

	return (
		<Fragment>
			<button
				className={styles.menu}
				type='button'
				onClick={menuHandler}
				aria-label='메뉴'
			>
				<Image src={MenuVertical} width={20} height={20} alt='메뉴 클릭' />
			</button>
			{menuOn && <div className={styles['menu-container']}>{children}</div>}
		</Fragment>
	);
};

const Title = ({ title }: { title: string }) => {
	return <h1 className={styles.title}>{title}</h1>;
};

const BackButton = ({
	backUrl,
	pathId,
}: {
	backUrl: keyof typeof URL_PATH | -1;
	pathId?: string | number;
}) => {
	const backClickHandler = useBackRouter(pathId, backUrl);

	return useMemo(
		() => (
			<button className={styles['back-arrow']} onClick={backClickHandler}>
				<Image src={Back} width={24} height={24} alt='뒤로 가기' />
			</button>
		),
		[backClickHandler]
	);
};

export default Object.assign(Header, {
	Menu,
	Title,
	BackButton,
});
