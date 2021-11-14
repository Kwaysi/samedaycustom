import { AppData } from 'src/types';

import data from './store';
import Canvas from './components/Canvas';
import Footer from './components/Footer';
import Header from './components/Header';
import SideBar from './components/SideBar';
import { DataProvider } from './hooks/useData';

function App() {
	return (
		<DataProvider<AppData> init={data}>
			<div className='App'>
				<Header />
				<SideBar />
				<Footer />
				<Canvas />
			</div>
		</DataProvider>
	);
}

export default App;
