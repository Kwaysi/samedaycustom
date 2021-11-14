import { Link } from 'react-router-dom';
import { ChangeEvent, useEffect, useRef } from 'react';

import { AppData } from 'src/types';
import useData from 'src/hooks/useData';
import { ReactComponent as Close } from 'src/assets/icons/close.svg';
import { ReactComponent as Cloud } from 'src/assets/icons/cloud.svg';

import Tag from './common/Tag';

const formats = [
	'.png',
	'.jpeg',
	'.jpg',
	'.gif',
	'.bmp',
	'.pdf',
	'.ai',
	'.psd',
	'.eps'
];

const accept = ['image/jpeg', 'image/png'];

export default function Upload() {
	const {
		data: {
			designer: {
				methods: { addImage }
			}
		}
	} = useData<AppData>();
	const dropZone = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const addImages = (files: File[]) => {
		const urls: string[] = [];
		files.forEach((file) => {
			if (accept.includes(file.type)) {
				const url = URL.createObjectURL(file);
				urls.push(url);
			}
		});

		addImage!(urls, {});
	};

	useEffect(() => {
		if (dropZone.current) {
			dropZone.current.addEventListener('dragover', (event) => {
				event.stopPropagation();
				event.preventDefault();
				if (event.dataTransfer) {
					// eslint-disable-next-line no-param-reassign
					event.dataTransfer.dropEffect = 'copy';
				}
				dropZone.current!.style.background = '#F0F4F8';
			});

			dropZone.current.addEventListener('drop', (e) => {
				e.stopPropagation();
				e.preventDefault();
				dropZone.current!.style.background = 'none';
				const fileList = Array.from(e?.dataTransfer?.files || []);
				addImages(fileList);
			});
		}

		if (inputRef.current) {
			inputRef.current.addEventListener(
				'change',
				// @ts-ignore
				(e: ChangeEvent<HTMLInputElement>) => {
					e.stopPropagation();
					e.preventDefault();
					dropZone.current!.style.background = 'none';
					const fileList = Array.from(e.target.files || []);
					addImages(fileList);
				}
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className='space-y-4'>
			<div className='flex items-center bg-grey-100 py-2 px-4'>
				<h1 className='flex-grow text-center uppercase text-sm text-grey-600 font-bold'>
					Upload your design
				</h1>
				<Link to='/'>
					<Close className='cursor-pointer' />
				</Link>
			</div>
			<div className='px-4 space-y-5'>
				<div>
					<h2 className='text-sm text-black font-medium mb-2'>
						Choose file to upload
					</h2>
					<div
						ref={dropZone}
						className='p-8 text-center bg-blue-100 flex flex-col items-center border border-dashed border-blue rounded'
					>
						<Cloud />
						<p className='to-grey-700 text-sm'>
							Drag file here or{' '}
							<input
								type='file'
								hidden
								id='file'
								ref={inputRef}
								multiple
								accept='.png,.jpg,.jpeg'
							/>
							<label
								htmlFor='file'
								className='text-blue underline cursor-pointer'
							>
								browse
							</label>{' '}
							your computer
						</p>
					</div>
				</div>
				<div className='space-y-3'>
					<h2 className='text-sm text-black font-medium'>
						Accepted file types
					</h2>
					<div className='flex flex-wrap space-x-2 '>
						{formats.map((e) => (
							<Tag
								key={e}
								className='my-1 text-xs uppercase'
								color='grey-800'
								inverse
							>
								{e}
							</Tag>
						))}
					</div>
					<p className='text-sm text-grey-600'>
						Have a different type of file?{' '}
						<a
							className='text-blue underline'
							href='mailto:hello@samedaycustom.com'
						>
							Email it to us
						</a>{' '}
						and weʼll have it ready for you to use within a few hours!
					</p>
				</div>
				<div className='space-y-3'>
					<h2 className='text-sm text-black font-medium'>
						Copyright & Trademark
					</h2>
					<p className='text-sm text-grey-600'>
						By uploading your artwork you agree that you take full
						responsibility and have full rights to utilize the logo or mark on
						customized products.
					</p>
				</div>
			</div>
		</div>
	);
}
