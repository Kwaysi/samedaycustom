import { ReactComponent as Logo } from 'src/assets/icons/logo.svg';
import { ReactComponent as Chat } from 'src/assets/icons/chat.svg';
import { ReactComponent as User } from 'src/assets/icons/user.svg';
import { ReactComponent as Chevron } from 'src/assets/icons/chevron-down.svg';

export default function Header() {
	return (
		<div className='flex items-center justify-between p-4 h-16 fixed w-screen bg-white z-50'>
			<div className='flex items-center space-x-4'>
				<Logo />
				<ul className='flex items-center space-x-4'>
					<li className='text-black text-sm'>Design lab</li>
					<li className='text-sm text-grey-700'>Products</li>
					<li className='text-sm text-grey-700'>How it works</li>
					<li className='text-sm text-grey-700'>Bulk pricing</li>
				</ul>
			</div>
			<div className='flex items-center space-x-2'>
				<div className='flex items-center space-x-2 rounded-full border border-grey-400 p-2 px-3'>
					<Chat />
					<span className='text-black text-sm'>Get help</span>
					<Chevron />
				</div>
				<div className='flex items-center  space-x-2 bg-grey p-2 px-4 rounded-full'>
					<User />
					<span className='text-black text-sm'>Your account</span>
					<Chevron />
				</div>
			</div>
		</div>
	);
}
