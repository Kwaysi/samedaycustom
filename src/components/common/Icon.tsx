import icons from 'src/assets/icons';
import { IconProps } from 'src/types';

export default function Icon({
	icon,
	onclick,
	size = 1,
	solid = false,
	className = ''
}: IconProps) {
	return (
		<span
			onClick={onclick}
			onKeyPress={() => {}}
			className={`flex items-center justify-center icon overflow-hidden ${
				solid && 'solid'
			} ${className}`}
			role='img'
		>
			<div
				style={{
					transform: `scale(${size})`
				}}
			>
				{
					// @ts-ignore
					icons[`${icon}.svg`] && icons[`${icon}.svg`]
				}
			</div>
		</span>
	);
}
