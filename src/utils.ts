export const secondsToHms = (secs: number) => {
	const hours = Math.floor(secs / (60 * 60));

	const minDivisor = secs % (60 * 60);
	const minutes = Math.floor(minDivisor / 60);

	const secDivisor = minDivisor % 60;
	const seconds = Math.ceil(secDivisor);

	return {
		h: hours,
		m: minutes,
		s: seconds
	};
};

export const toBase64 = (file: Blob) =>
	new Promise<string>((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = (e) => resolve(e.target!.result as string);
		reader.onerror = (error) => reject(error);
	});

export const blobToURL = (file: Blob) => URL.createObjectURL(file);

export const hideValue = (v: string) => v.replace(/[0-9]/g, '*');

export const formatAmount = (x: number) => {
	if (typeof x === 'number') {
		const num = x.toFixed(2);
		const fNum = num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

		return fNum;
	}

	return (0).toFixed(2);
};

export const isValidPhone = (n: string) => {
	let number;
	let firstChar;
	const pattern = /^([0]{1})([7-9]{1})([0|1]{1})([\d]{1})([\d]{7,8})$/g;

	if (!n || n.length < 5) return false;

	if (typeof n === 'number') {
		number = `0${n}`;
	} else if (typeof n === 'string') {
		firstChar = n.substring(0, 1);
		number = firstChar === '0' ? n : `0${n}`;
	} else {
		return false;
	}
	return pattern.test(number.replace(/\s+/g, ''));
};

export const isValidEmail = (v: string) =>
	/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,5})+$/.test(v);

export const isValidPassword = (v: string) =>
	/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(v);

export const copy = (id: string) => {
	const copyText = document.getElementById(id);
	// @ts-ignore
	copyText.select();
	// @ts-ignore
	copyText.setSelectionRange(0, 99999);
	document.execCommand('copy');
};

export function debounce(func: (...args: any) => {}, timeout = 300) {
	let timer: NodeJS.Timeout;
	return (...args: any[]) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			// @ts-ignore
			func.apply(this, args);
		}, timeout);
	};
}

// @ts-ignore
// eslint-disable-next-line no-extend-native
String.prototype.chunk = function (n) {
	const space = [];
	for (let i = 0, len = this.length; i < len; i += n) {
		space.push(this.substr(i, n));
	}
	return space;
};
