import small from 'src/assets/images/t-shirt-small.png';
import { ReactComponent as Add } from 'src/assets/icons/add.svg';
import { ReactComponent as Save } from 'src/assets/icons/save.svg';
import { ReactComponent as Share } from 'src/assets/icons/share.svg';
import { ReactComponent as Dollar } from 'src/assets/icons/dollar.svg';

import { AppData } from 'src/types';
import useData from 'src/hooks/useData';

import Button from './common/Button';

export default function Footer() {
	const {
		data: {
			product: { name, color }
		}
	} = useData<AppData>();

	return (
		<div className='fixed w-screen bottom-0 bg-white px-6 py-2 flex justify-between items-center z-30'>
			<div className='flex items-center space-x-4 divide-x-2'>
				<Button variant='secondary'>
					<Add />
					<span className='ml-2'>Add product</span>
				</Button>
				<div className='flex items-center space-x-4'>
					<div className=' ml-4 w-14 h-16 bg-grey-400 rounded border-blue border-b-4'>
						<img src={small} height='auto' />
					</div>
					<div>
						<div className='flex items-center space-x-4 mb-2'>
							<p className='text-sm text-black capitalize'>{name}</p>
							<p className='text-blue text-sm'>Change product</p>
						</div>
						<div className='flex items-center space-x-2'>
							<div className='rounded-full w-5 h-5 border border-grey-400' />
							<p className='text-sm text-black capitalize'>{color}</p>
							<p className='text-blue text-sm'>Change Color</p>
						</div>
					</div>
				</div>
			</div>
			<div className='flex items-center space-x-2'>
				<Button variant='outline'>
					<Share />
				</Button>
				<Button variant='secondary'>
					<Save />
					<span className='ml-2'>Save</span>
				</Button>
				<Button variant='primary'>
					<Dollar />
					<span className='ml-2'>Get pricing</span>
				</Button>
			</div>
		</div>
	);
}
