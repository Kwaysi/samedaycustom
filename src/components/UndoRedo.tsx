import { ReactComponent as Undo } from 'src/assets/icons/undo.svg';
import { ReactComponent as Redo } from 'src/assets/icons/redo.svg';

export default function UndoRedo() {
	return (
		<div className='absolute top-0 left-0 bg-white rounded-lg'>
			<div className='flex flex-col items-center p-4'>
				<Undo className='icon text-grey-600' />
				<p className='text-sm text-grey-600'>Undo</p>
			</div>
			<div className='flex flex-col items-center p-4'>
				<Redo className='icon text-grey-400' />
				<p className='text-sm text-grey-400'>Redo</p>
			</div>
		</div>
	);
}
