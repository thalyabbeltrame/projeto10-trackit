import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import GlobalStyle from '../shared/globalStyles';

import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import HabitsPage from './HabitsPage';
import TodayPage from './TodayPage';
import HistoryPage from './HistoryPage';

import TokenContext from '../hooks/TokenContext';

function App() {
	const [token, setToken] = useState('');
	return (
		<>
			<GlobalStyle />
			<TokenContext.Provider value={{ token, setToken }}>
				<BrowserRouter>
					<Routes>
						<Route path='/' element={<LoginPage />} />
						<Route path='/cadastro' element={<SignUpPage />} />
						<Route path='/habitos' element={<HabitsPage />} />
						<Route path='/hoje' element={<TodayPage />} />
						<Route path='/historico' element={<HistoryPage />} />
					</Routes>
				</BrowserRouter>
			</TokenContext.Provider>
		</>
	);
}

export default App;
