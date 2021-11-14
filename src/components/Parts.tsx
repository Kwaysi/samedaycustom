import { ReactComponent as ZoomIn } from 'src/assets/icons/zoom-in.svg';
import { ReactComponent as ZoomOut } from 'src/assets/icons/zoom-out.svg';
import useData from 'src/hooks/useData';
import { AppData } from 'src/types';

type Props = {
	active: number;
	zoomIn: () => void;
	zoomOut: () => void;
	setPart: () => void;
};

export default function Parts({ zoomIn, zoomOut, setPart, active }: Props) {
	const {
		data: {
			product: { parts: data }
		}
	} = useData<AppData>();

	return (
		<div className='fixed right-4 top-20 w-28'>
			<div className='bg-white rounded-lg space-y-4'>
				{data.map((e, i) => (
					<div
						key={e.name}
						className={`rounded-lg text-center flex flex-col items-center py-2 ${
							active === i && 'border-2 border-blue'
						}`}
						onClick={setPart}
					>
						<img src={e.thumbNail} height='auto' />
						<p className='text-sm text-grey-600 uppercase'>{e.name}</p>
					</div>
				))}
			</div>
			<div className='flex my-4 items-center justify-between'>
				<div className='rounded bg-white p-3' onClick={() => zoomIn()}>
					<ZoomIn />
				</div>
				<div className='rounded bg-white p-3' onClick={() => zoomOut()}>
					<ZoomOut />
				</div>
			</div>
		</div>
	);
}
