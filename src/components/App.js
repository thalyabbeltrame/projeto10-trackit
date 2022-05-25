import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyle from '../shared/globalStyles';

import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import HabitsPage from './HabitsPage';
import TodayPage from './TodayPage';
import HistoryPage from './HistoryPage';

function App() {
	return (
		<>
			<GlobalStyle />
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<LoginPage />} />
					<Route path='/cadastro' element={<SignUpPage />} />
					<Route path='/habitos' element={<HabitsPage />} />
					<Route path='/hoje' element={<TodayPage />} />
					<Route path='/historico' element={<HistoryPage />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
