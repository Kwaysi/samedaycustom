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
import { ReactComponent as Down } from 'src/assets/icons/chevron-down.svg';

import Button from './common/Button';

export default function Text() {
	const {
		dispatch,
		data: {
			// show,
			designer,
			designer: {
				methods: { addText, updateActiveItem, updateText },
				objectOptions
			}
		}
	} = useData<AppData>();
	const push = useNavigate();
	const text = useQuery().get('text');
	const family = useQuery().get('family');
	const panel = useQuery().get('panel');
	const [fonts, setFonts] = useState<any[]>([]);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		let fontCache: any;
		const fontList = localStorage.getItem('fonts');
		if (fontList === null) {
			axios
				.get(process.env.REACT_APP_GOOGLEFONTS_URL!)
				.then(({ data }) => {
					fontCache = data.items.slice(0, 100);
					setFonts(fontCache);
					localStorage.setItem('fonts', JSON.stringify(fontCache));
					const families = fontCache.map((e: any) => e.family);
					WebFont.load({
						google: {
							families
						}
					});
				})
				.catch(() => {});
		} else {
			fontCache = JSON.parse(fontList);
			setFonts(JSON.parse(fontList));
			const families = fontCache.map((e: any) => e.family);
			WebFont.load({
				google: {
					families
				}
			});
		}
	}, []);

	const addToDesign = () => {
		const { value } = inputRef.current!;
		inputRef.current!.value = '';
		if (value) {
			addText!(value, { fontSize: 16 });
			push(`/text?panel=edit&text=${value}&family=${objectOptions.fontFamily}`);
		}
	};

	const loadFont = (e: any) => {
		dispatch({
			designer: {
				...designer,
				objectOptions: {
					...designer.objectOptions,
					fontFamily: e.family
				}
			}
		});
		updateActiveItem!({ fontFamily: e.family });
	};

	return (
		<div>
			{!panel && (
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
			{panel === 'edit' && (
				<>
					<div className='flex items-center bg-grey-100 py-2 px-4'>
						<Link to='/text'>
							<Back className='cursor-pointer' />
						</Link>
						<h1 className='flex-grow text-center uppercase text-sm text-grey-600 font-bold'>
							Edit text
						</h1>
						<Link to='/'>
							<Close className='cursor-pointer' />
						</Link>
					</div>
					<div className='p-4'>
						<input
							type='text'
							defaultValue={text!}
							placeholder='Enter text here'
							onChange={(e) => {
								updateText!(e.target.value);
							}}
							className='w-full rounded p-3 border border-grey-400'
						/>
					</div>
					<div className='flex items-center justify-between px-4  border-b border-grey-400 '>
						<span className='text-sm text-black py-2'>Font</span>
						<Link to={`/text?panel=font&text=${text}`}>
							<span
								className='text-black text-xl cursor-pointer py-4'
								style={{
									fontFamily: `${family}, 'Inter', sans-serif`
								}}
							>
								{family?.replaceAll(`'`, '')}
								<Down className='ml-2 inline' />
							</span>
						</Link>
					</div>
				</>
			)}
			{panel === 'font' && (
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
						<div className='w-full flex items-center justify-between my-2'>
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
								className='py-2 text-center cursor-pointer hover:bg-blue-100'
							>
								<div
									className='text-xl'
									style={{
										fontFamily: `'${e.family}', 'Inter', sans-serif`
									}}
								>
									{text}
								</div>
								<p className='text-sm text-grey-600'>{e.family}</p>
							</div>
						))}
					</div>
				</>
			)}
		</div>
	);
}
