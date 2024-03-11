import { StarFill, StarEmpty } from '@/assets';
import { ButtonHTMLAttributes } from 'react';
import Image from 'next/image';

interface FavoriteButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	isFavorite: boolean;
}

const FavoriteButton = (props: FavoriteButtonProps) => {
	const { isFavorite, onClick } = props;

	return (
		<button type='button' onClick={onClick}>
			<Image
				src={isFavorite ? StarFill : StarEmpty}
				width={24}
				height={24}
				alt='즐겨찾기 등록/해제'
			/>
		</button>
	);
};

export default FavoriteButton;
