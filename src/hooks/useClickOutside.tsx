import {
	useRef,
	useEffect,
	RefObject,
	HTMLAttributes,
	DetailedHTMLProps
} from 'react';

export default function useClickOutside<T extends HTMLElement>(
	handler: () => void,
	ref: RefObject<T>
) {
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				handler();
			}
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [ref, handler]);
}

export function ClickOutside(
	props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
		onClickOutside: () => void;
	}
) {
	const { children, onClickOutside } = props;
	const ref = useRef<HTMLDivElement>(null);
	useClickOutside(onClickOutside, ref);
	return (
		<div {...props} ref={ref}>
			{children}
		</div>
	);
}
