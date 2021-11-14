import { ReactComponent as Product } from 'src/assets/icons/product.svg';
import { ReactComponent as AddText } from 'src/assets/icons/add-text.svg';
import { ReactComponent as Template } from 'src/assets/icons/template.svg';
import { ReactComponent as Image } from 'src/assets/icons/upload-image.svg';
import useData from 'src/hooks/useData';
import { AppData } from 'src/types';

export default function Home() {
	const { dispatch } = useData<AppData>();
	return (
		<div>
			<div>
				<h1 className='text-center text-xl font-medium text-black my-8'>
					What&apos;s next for you?
				</h1>
				<div className='grid gap-4 grid-cols-2'>
					<div
						className='flex flex-col items-center p-4 cursor-pointer'
						onClick={() => {
							dispatch({ panel: 'text', show: 'text' });
						}}
					>
						<AddText />
						<p className='text-sm font-normal text-black my-2'>Add Text</p>
					</div>
					<div className='flex flex-col items-center p-4'>
						<Template />
						<p className='text-sm font-normal text-black my-2'>Use template</p>
					</div>
					<div
						className='flex flex-col items-center p-4 cursor-pointer'
						onClick={() => {
							dispatch({ panel: 'design' });
						}}
					>
						<Image />
						<p className='text-sm font-normal text-black my-2'>Upload design</p>
					</div>
					<div className='flex flex-col items-center p-4'>
						<Product />
						<p className='text-sm font-normal text-black my-2'>
							Change products
						</p>
					</div>
				</div>
				<p className='text-center my-6'>
					or <span className='text-blue underline'>start over</span>
				</p>
			</div>
		</div>
	);
}
