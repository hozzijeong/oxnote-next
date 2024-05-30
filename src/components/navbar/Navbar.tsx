import { URL_PATH } from '@/constants/path';
import styles from './navbar.module.scss';
import { Folder, Plus, Quiz, Profile } from '@/assets';
import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';

const Navbar = () => {
	return (
		<nav className={styles.wrapper}>
			<div>
				<Link className={styles.link} href={URL_PATH.QUIZ_FILTER}>
					<Image src={Quiz} alt='문제 풀기' width={24} height={24} />
					문제 풀기
				</Link>
			</div>
			<div>
				<Link className={styles.link} href={URL_PATH.QUIZ_FORM}>
					<Image src={Plus} alt='문제 등록하기' width={24} height={24} />
					문제 등록하기
				</Link>
			</div>
			<div>
				<Link className={styles.link} href={URL_PATH.CATEGORY}>
					<Image src={Folder} alt='모아보기' width={24} height={24} />
					모아보기
				</Link>
			</div>
			<div>
				<Link className={styles.link} href={URL_PATH.MY_PAGE}>
					<Image src={Profile} alt='마이페이지' width={24} height={24} />
					마이페이지
				</Link>
			</div>
		</nav>
	);
};

export default memo(Navbar);
