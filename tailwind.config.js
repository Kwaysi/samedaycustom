module.exports = {
	purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			spacing: {
				90: '360px',
				120: '480px',
				128: '512px',
				150: '600px'
			}
		},
		colors: {
			blue: {
				DEFAULT: '#007BFF',
				light: '#E5F1FF',
				100: '#FAFCFF'
			},
			grey: {
				DEFAULT: '#F0F4F8',
				100: '#FBFCFE',
				400: '#BCCCDC',
				600: '#486581',
				700: '#334E68',
				800: '#243B53'
			},
			black: {
				DEFAULT: '#102A43'
			},
			white: {
				DEFAULT: '#FFFFFF'
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: []
};
