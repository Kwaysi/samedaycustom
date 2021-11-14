import axios from 'axios';
import WebFont from 'webfontloader';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import { AppData } from 'src/types';
import useData from 'src/hooks/useData';
import useQuery from 'src/hooks/useQuery';
import { ReactComponent as Back } from 'src/assets/icons/back.svg';
import { ReactComponent as Close } from 'src/assets/icons/close.svg';
import { ReactComponent as Clock } from 'src/assets/icons/clock.svg';

import Button from './common/Button';

export default function Text() {
	const {
		dispatch,
		data: {
			// show,
			designer,
			designer: {
				loadedFonts,
				methods: { addText, updateActiveItem }
			}
		}
	} = useData<AppData>();
	const push = useNavigate();
	const fontPanel = !!useQuery().get('font');
	const [fonts, setFonts] = useState<any[]>([]);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const fontList = localStorage.getItem('fonts');
		if (fontList === null) {
			axios
				.get(process.env.REACT_APP_GOOGLEFONTS_URL!)
				.then(({ data }) => {
					setFonts(data.items);
					localStorage.setItem('fonts', JSON.stringify(data.items));
				})
				.catch(() => {});
		} else {
			setFonts(JSON.parse(fontList));
		}
	}, []);

	const addToDesign = () => {
		const { value } = inputRef.current!;
		if (value) {
			addText!(value, { fontSize: 16 });
		}
		inputRef.current!.value = '';
		push('/text?font=true');
	};

	const loadFont = (e: any) => {
		if (!loadedFonts.includes(e.family)) {
			WebFont.load({
				google: {
					families: [...loadedFonts, e.family]
				},
				active: () => {
					dispatch({
						designer: {
							...designer,
							loadedFonts: [...loadedFonts, e.family],
							objectOptions: {
								...designer.objectOptions,
								fontFamily: e.family
							}
						}
					});
					updateActiveItem!({ fontFamily: e.family });
				}
			});
		} else {
			dispatch({
				designer: {
					...designer,
					loadedFonts: [...loadedFonts, e.family],
					objectOptions: {
						...designer.objectOptions,
						fontFamily: e.family
					}
				}
			});
			updateActiveItem!({ fontFamily: e.family });
		}
	};

	return (
		<div className='space-y-4'>
			{!fontPanel && (
				<>
					<div className='flex items-center bg-grey-100 py-2 px-4'>
						<h1 className='flex-grow text-center uppercase text-sm text-grey-600 font-bold'>
							Add text
						</h1>
						<Link to='/'>
							<Close className='cursor-pointer' />
						</Link>
					</div>
					<div className='p-4 flex flex-col items-end'>
						<input
							ref={inputRef}
							type='text'
							placeholder='Enter text here'
							className='w-full rounded p-3 border border-grey-400'
						/>
						<Button
							variant='primary'
							className='font-medium'
							onClick={addToDesign}
						>
							Add to design
						</Button>
					</div>
				</>
			)}
			{fontPanel && (
				<>
					<div className='flex items-center bg-grey-100 py-2 px-4'>
						<Link to='/text'>
							<Back className='cursor-pointer' />
						</Link>
						<h1 className='flex-grow text-center uppercase text-sm text-grey-600 font-bold'>
							Change font
						</h1>
						<Link to='/'>
							<Close className='cursor-pointer' />
						</Link>
					</div>
					<div className='p-4'>
						<input
							type='text'
							placeholder='Enter text here'
							className='w-full rounded p-3 border border-grey-400'
						/>
						<div className='w-full flex items-center justify-between'>
							<span className='text-blue'>View all categories</span>
							<span className='text-blue flex items-center'>
								<Clock /> Recently used fonts
							</span>
						</div>
					</div>

					<div
						className='overflow-y-scroll divide-y divide-grey-400'
						style={{
							maxHeight: '60vh'
						}}
					>
						{fonts.map((e, i) => (
							<div
								key={i}
								onClick={() => loadFont(e)}
								style={{
									fontFamily: `'${e.family}', 'Inter', sans-serif`
								}}
								className='py-2 text-center cursor-pointer hover:bg-blue-100'
							>
								{e.family}
							</div>
						))}
					</div>
				</>
			)}
		</div>
	);
}
