import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

import Spinner from './Spinner';

type Props = {
	icon?: string;
	loading?: boolean;
	size?: 'sm' | 'md' | 'lg';
	variant?: 'primary' | 'secondary' | 'outline';
};

const variants = {
	primary: {
		bg: 'blue',
		color: 'white',
		border: 'none'
	},
	secondary: {
		bg: 'blue-light',
		color: 'blue',
		border: 'none'
	},
	outline: {
		bg: 'white',
		color: 'blue',
		border: 'blue'
	}
};

export default function Button(
	props: DetailedHTMLProps<
		ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> &
		Props
) {
	const {
		loading,
		disabled,
		children,
		className,
		type = 'button',
		variant = 'primary'
	} = props;

	const { color, bg, border } = variants[variant];

	return (
		<button
			{...props}
			// @ts-ignore
			loading=''
			type={type}
			disabled={loading || disabled}
			className={`button my-2 p-3 min-w-152 flex items-center justify-center rounded-lg ${className} bg-${bg} text-${color} border border-${border}`}
		>
			{loading ? <Spinner color='gray' /> : <>{children}</>}
		</button>
	);
}
