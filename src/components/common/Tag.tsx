import { MouseEventHandler, ReactNode } from 'react';
import Icon from './Icon';

type Props = {
	color: string;
	inverse?: boolean;
	rounded?: boolean;
	className?: string;
	removable?: boolean;
	children: ReactNode;
	onClick?: MouseEventHandler<HTMLDivElement>;
	onRemove?: MouseEventHandler<HTMLDivElement>;
};

export default function Tag({
	color,
	children,
	className = '',
	inverse = false,
	rounded = false,
	removable = false,
	onClick = () => {},
	onRemove = () => {}
}: Props) {
	return (
		<div
			className={`flex w-min min-w-64 items-center justify-between bg-${color} ${
				inverse && 'bg-opacity-10'
			} py-1 px-2 ${rounded ? 'rounded-full' : 'rounded'} ${className} ${
				!removable && 'text-center'
			}`}
			onClick={onClick}
		>
			<span
				className={`text-${inverse ? color : 'white'} ${
					!removable && 'block w-full text-center'
				} text-opacity-${inverse ? '100' : '80'}`}
			>
				{children}
			</span>
			{removable && (
				<span className='ml-4' onClick={onRemove}>
					<Icon
						solid
						size={1.5}
						icon='close-circle'
						className={`text-${inverse ? color : 'white'} w-4 h-4`}
					/>
				</span>
			)}
		</div>
	);
}
