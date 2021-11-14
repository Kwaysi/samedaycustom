import { Routes, Route, Link, useMatch } from 'react-router-dom';

import { ReactComponent as Art } from 'src/assets/icons/svg_art.svg';
import { ReactComponent as Color } from 'src/assets/icons/svg_color.svg';
import { ReactComponent as Notes } from 'src/assets/icons/svg_notes.svg';
import { ReactComponent as TextIcon } from 'src/assets/icons/svg_text.svg';
import { ReactComponent as Names } from 'src/assets/icons/svg_teamnames.svg';
import { ReactComponent as UploadIcon } from 'src/assets/icons/svg_upload.svg';

import Text from './Text';
import Home from './Home';
import Upload from './Upload';

export default function SideBar() {
	const text = useMatch('/text');
	const upload = useMatch('/upload');

	return (
		<>
			<div className='fixed w-24 bg-blue h-screen text-white text-center z-20 flex items-center'>
				<div className='flex-grow'>
					<Link to='/text'>
						<div
							className={`flex flex-col items-center px-4 my-3 cursor-pointer ${
								text && 'bg-white text-blue py-2'
							}`}
						>
							<TextIcon className={`icon ${text && 'text-blue'}`} />
							<p className='text-sm'>Add Text</p>
						</div>
					</Link>
					<Link to='/'>
						<div className='flex flex-col items-center px-4 my-3 cursor-pointer'>
							<Art className='icon' />
							<p className='text-sm'>Use Template</p>
						</div>
					</Link>
					<Link to='/upload'>
						<div
							className={`flex flex-col items-center px-4 my-3 cursor-pointer ${
								upload && 'bg-white text-blue py-2'
							}`}
						>
							<UploadIcon className={`icon ${upload && 'text-blue'}`} />
							<p className='text-sm'>Upload design</p>
						</div>
					</Link>
					<Link to='/'>
						<div className='flex flex-col items-center px-4 my-3 cursor-pointer'>
							<Color className='icon' />
							<p className='text-sm'>Product colors</p>
						</div>
					</Link>
					<Link to='/'>
						<div className='flex flex-col items-center my-3 cursor-pointer'>
							<Names className='icon' />
							<p className='text-sm'>Add team names</p>
						</div>
					</Link>
					<Link to='/'>
						<div className='flex flex-col items-center px-4 my-3 cursor-pointer'>
							<Notes className='icon' />
							<p className='text-sm'>Add notes</p>
						</div>
					</Link>
				</div>
			</div>

			<div className='w-90 fixed h-screen left-24 bg-white z-10 pt-16'>
				<div className='relative'>
					<Routes>
						<Route path='/text' element={<Text />} />
						<Route path='/upload' element={<Upload />} />
						<Route path='/' element={<Home />} />
					</Routes>
				</div>
			</div>
		</>
	);
}
