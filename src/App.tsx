import { BrowserRouter as Router } from 'react-router-dom';

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
			<Router>
				<div className='App'>
					<Header />
					<SideBar />
					<Footer />
					<Canvas />
				</div>
			</Router>
		</DataProvider>
	);
}

export default App;
