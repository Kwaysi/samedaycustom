import { AppData } from 'src/types';
import useData from 'src/hooks/useData';
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
	const {
		dispatch,
		data: { panel }
	} = useData<AppData>();

	return (
		<>
			<div className='fixed w-24 bg-blue h-screen text-white text-center space-y-4 pt-20 z-20'>
				<div
					className={`flex flex-col items-center px-4 cursor-pointer ${
						panel === 'text' && 'bg-white text-blue py-2'
					}`}
					onClick={() => dispatch({ panel: 'text', show: 'text' })}
				>
					<TextIcon className={`icon ${panel === 'text' && 'text-blue'}`} />
					<p className='text-sm'>Add Text</p>
				</div>
				<div
					className='flex flex-col items-center px-4 cursor-pointer'
					onClick={() => dispatch({ panel: 'home' })}
				>
					<Art className='icon' />
					<p className='text-sm'>Use Template</p>
				</div>
				<div
					className={`flex flex-col items-center px-4 cursor-pointer ${
						panel === 'design' && 'bg-white text-blue py-2'
					}`}
					onClick={() => dispatch({ panel: 'design' })}
				>
					<UploadIcon className={`icon ${panel === 'design' && 'text-blue'}`} />
					<p className='text-sm'>Upload design</p>
				</div>
				<div
					className='flex flex-col items-center px-4 cursor-pointer'
					onClick={() => dispatch({ panel: 'home' })}
				>
					<Color className='icon' />
					<p className='text-sm'>Product colors</p>
				</div>
				<div
					className='flex flex-col items-center cursor-pointer'
					onClick={() => dispatch({ panel: 'home' })}
				>
					<Names className='icon' />
					<p className='text-sm'>Add team names</p>
				</div>
				<div
					className='flex flex-col items-center px-4 cursor-pointer'
					onClick={() => dispatch({ panel: 'home' })}
				>
					<Notes className='icon' />
					<p className='text-sm'>Add notes</p>
				</div>
			</div>
			<div className='w-90 fixed h-screen left-24 bg-white z-10 pt-16'>
				<div className='relative'>
					{panel === 'home' && <Home />}
					{panel === 'text' && <Text />}
					{panel === 'design' && <Upload />}
				</div>
			</div>
		</>
	);
}
