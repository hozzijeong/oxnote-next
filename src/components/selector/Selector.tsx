'use client';

import React, {
	MouseEventHandler,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import styles from './selector.module.scss';
import { Button, Input, Menu } from '../index';
import DropDown from '../dropdown/DropDown';

export type SelectorProps = {
	type: 'single' | 'multi';
	trigger: React.ReactNode;
	options: string[];
	placeholder: string;
	selected: string[];
	changeHandler: MouseEventHandler<HTMLButtonElement>;
};

const Selector = ({
	type,
	options,
	selected,
	changeHandler,
}: SelectorProps) => {
	const [menuOpen, setMenuOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);

	const clickMenuOutside = useCallback((event: MouseEvent) => {
		if (!menuRef.current) return;

		const menu = menuRef.current.getBoundingClientRect();

		const isClickInsideMenu =
			menu.top - 32 <= event.clientY &&
			event.clientY <= menu.top + 32 + menu.height &&
			menu.left <= event.clientX &&
			event.clientX <= menu.left + menu.width;

		if (isClickInsideMenu) setMenuOpen(false);
	}, []);

	useEffect(() => {
		if (menuOpen && menuRef.current) {
			window.addEventListener('click', clickMenuOutside);
		}

		return () => {
			window.removeEventListener('click', clickMenuOutside);
		};
	}, [clickMenuOutside, menuOpen]);

	return (
		<DropDown>
			<DropDown.Trigger
				title='타이틀'
				onClick={() => setMenuOpen((prev) => !prev)}
			/>
			{menuOpen && (
				<DropDown.Menu className={styles['menu-container']} ref={menuRef}>
					<ul>
						{options.length === 0 ? (
							<li className={styles['options']}>
								<DropDown.Item itemType='default'>
									등록된 값이 없습니다.
								</DropDown.Item>
							</li>
						) : (
							options.map((item) => {
								return (
									<li className={styles['options']} key={item}>
										<DropDown.Item
											onClick={changeHandler}
											itemType={type === 'multi' ? 'checkBox' : 'default'}
											checked={type === 'multi' && selected.includes(item)}
										>
											{item}
										</DropDown.Item>
									</li>
								);
							})
						)}
					</ul>
				</DropDown.Menu>
			)}
		</DropDown>
	);
};

export default Selector;
