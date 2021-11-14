import { MouseEventHandler } from 'react';

type IconProps = {
	icon: string;
	size?: number;
	solid?: boolean;
	className?: string;
	onclick?: MouseEventHandler<HTMLSpanElement>;
};

type AnyObject = {
	[key: string]: any;
};

type ObjectOptions = {
	top?: number;
	left?: number;
	fill?: string;
	width?: number;
	height?: number;
	stroke?: string;
	fontSize?: number;
	fontFamily?: string;
	strokeWidth?: number;
};

export type AppData = {
	designer: {
		loadedFonts: string[];
		objectOptions: ObjectOptions;
		methods: {
			updateText?: (t: string) => void;
			updateActiveItem?: (o: ObjectOptions) => void;
			addText?: (t: string, o: ObjectOptions) => void;
			addImage?: (t: string | string[], o: ObjectOptions) => void;
		};
	};
	product: {
		name: string;
		color: string;
		canvas: {
			top: number;
			left: number;
			width: number;
			height: number;
		};
		parts: {
			name: string;
			image: string;
			thumbNail: string;
		}[];
	};
};

interface Response<T = any> {
	data: T;
	message: string;
	status: boolean | string;
}

interface PaginatedResponse<T> {
	rows: T[];
	page: number;
	size: number;
	count: number;
}

type User = {};

export type Action<D = any, T = any> = (
	url: string,
	data?: D,
	tok?: string
) => Promise<Response<T>>;
