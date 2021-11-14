import { AnyObject } from 'src/types';

function importAll(r: any) {
	const images: AnyObject = {};
	r.keys().map((item: string) => {
		const itm = item.replace('./', '');
		images[itm] = r(item);
		return images[itm];
	});
	return images;
}

// @ts-ignore
const icons = importAll(require.context('./', false, /\.(svg|png)$/));

export default icons;
