import { useEffect, useRef } from 'react';

export default function useDidUpdateEffect(fn: () => void, inputs: any[]) {
	const didMountRef = useRef(false);

	useEffect(() => {
		if (didMountRef.current) return fn();
		didMountRef.current = true;
		return () => {};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [...inputs, fn]);
}
