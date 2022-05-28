import { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import HabitsPage from './HabitsPage';
import TodayPage from './TodayPage';
import HistoryPage from './HistoryPage';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import PercentageContext from '../contexts/PercentageContext';

function Footer() {
	const { percentage } = useContext(PercentageContext);

	return (
		<FooterContainer>
			<Link to='/habitos' element={<HabitsPage />}>
				<p>Hábitos</p>
			</Link>
			<Link to='/hoje' element={<TodayPage />}>
				<div style={{ width: 91, height: 91, bottom: '20px' }}>
					<CircularProgressbar
						value={percentage}
						text={'Hoje'}
						background
						backgroundPadding={6}
						styles={buildStyles({
							backgroundColor: '#3e98c7',
							textColor: '#fff',
							pathColor: '#fff',
							trailColor: 'transparent',
						})}
					/>
				</div>
			</Link>
			<Link to='/historico' element={<HistoryPage />}>
				<p>Histórico</p>
			</Link>
		</FooterContainer>
	);
}

const FooterContainer = styled.footer`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	height: 70px;
	background: #ffffff;
	position: fixed;
	left: 0;
	bottom: 0;
	z-index: 1;
	padding: 0 36px;

	p {
		font-size: 17.976px;
		line-height: 22px;
		color: #52b6ff;
	}

	div {
		margin-bottom: 50px;
	}
`;

export default Footer;
