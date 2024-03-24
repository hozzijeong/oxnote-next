'use client';

import { ToggleValues } from '@/hooks/useToggle';
import { createContext } from 'react';

const DropDownContext = createContext<ToggleValues>({
	isOn: false,
	open: () => {},
	close: () => {},
	toggle: () => {},
});

export default DropDownContext;
