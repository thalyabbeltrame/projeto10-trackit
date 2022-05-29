import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import GlobalStyle from '../shared/globalStyles';

import SignInPage from './SignInPage';
import SignUpPage from './SignUpPage';
import HabitsPage from './HabitsPage';
import TodayPage from './TodayPage';
import HistoryPage from './HistoryPage';

import UserContext from '../contexts/UserContext';
import DailyHabitsContext from '../contexts/DailyHabitsContext';
import PercentageContext from '../contexts/PercentageContext';

function App() {
	const [userInfos, setUserInfos] = useState({ image: '', token: '' });
	const [dailyHabits, setDailyHabits] = useState([]);
	const [percentage, setPercentage] = useState(0);

	return (
		<>
			<GlobalStyle />
			<PercentageContext.Provider value={{ percentage, setPercentage }}>
				<DailyHabitsContext.Provider value={{ dailyHabits, setDailyHabits }}>
					<UserContext.Provider value={{ userInfos, setUserInfos }}>
						<BrowserRouter>
							<Routes>
								<Route path='/' element={<SignInPage />} />
								<Route path='/cadastro' element={<SignUpPage />} />
								<Route path='/habitos' element={<HabitsPage />} />
								<Route path='/hoje' element={<TodayPage />} />
								<Route path='/historico' element={<HistoryPage />} />
							</Routes>
						</BrowserRouter>
					</UserContext.Provider>
				</DailyHabitsContext.Provider>
			</PercentageContext.Provider>
		</>
	);
}

export default App;
