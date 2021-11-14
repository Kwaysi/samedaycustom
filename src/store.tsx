import { AppData } from './types';

const data: AppData = {
	designer: {
		objectOptions: {
			top: 20,
			left: 20,
			fill: '#102A43',
			fontFamily: `'Inter'`
		},
		methods: {}
	},
	product: {
		name: 'Gildan Unisex T-shirt',
		color: 'white',
		canvas: {
			top: 100,
			left: 190,
			width: 220,
			height: 280
		},
		parts: [
			{
				name: 'front',
				thumbNail: '/images/front.svg',
				image: '/images/canvasImage.png'
			},
			{
				name: 'back',
				thumbNail: '/images/back.svg',
				image: '/images/canvasImage.png'
			},
			{
				name: 'right sleeve',
				image: '/images/canvasImage.png',
				thumbNail: '/images/rightSleeve.svg'
			},
			{
				name: 'left sleeve',
				image: '/images/canvasImage.png',
				thumbNail: '/images/leftSleeve.svg'
			}
		]
	}
};

export default data;
